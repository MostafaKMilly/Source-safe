import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, In, LessThan, Like, Repository } from 'typeorm';
import { File } from './file.entity';
import { User } from 'src/users/user.entity';
import * as fs from 'fs';
import * as path from 'path';
import { HistoryService } from 'src/history/history.service';
import { Group } from 'src/group/group.entity';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly historyService: HistoryService,
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
  ) {}

  @Cron('*/1 * * * *') // Runs every 10 minutes
  async releaseCheckedOutFiles() {
    const tenMinutesAgo = new Date(Date.now() - 10 * 60000);
    const checkedOutFiles = await this.fileRepository.find({
      where: {
        status: 'checked-out',
        updatedAt: LessThan(tenMinutesAgo),
      },
    });

    if (checkedOutFiles.length > 0) {
      for (const file of checkedOutFiles) {
        file.status = 'free';
        file.lockedBy = null;
      }
      await this.fileRepository.save(checkedOutFiles);
    }
  }

  async uploadFile(
    file: Express.Multer.File,
    userId: number,
    groupId: number,
  ): Promise<{ message: string }> {
    const filePath = this.saveFileOnServer(file);
    const user = await this.userRepository.findOne({
      where: [
        {
          id: userId,
        },
      ],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const group = await this.groupRepository.findOne({
      where: { id: groupId },
    });
    if (!group) {
      throw new NotFoundException(`Group with ID ${groupId} not found`);
    }

    const newFile = this.fileRepository.create({
      name: file.originalname,
      path: filePath,
      uploadedBy: user,
      status: 'free',
      group: group,
    });

    newFile.updatedAt = new Date();
    await this.fileRepository.save(newFile);

    if (newFile) {
      this.historyService.create({
        file: newFile,
      });
    }
    return { message: 'File saved successfully' };
  }
  async updateFile(
    updatedFile: Express.Multer.File,
    userId: number,
    fileId: number,
  ): Promise<{ message: string }> {
    const filePath = this.saveFileOnServer(updatedFile);

    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const file = await this.fileRepository.findOne({
      where: { id: fileId },
      relations: ['lockedBy'],
    });

    if (!file) {
      throw new NotFoundException('File not found');
    }

    if (file.status !== 'checked-out' || file.lockedBy.id !== userId) {
      throw new UnauthorizedException(
        'File is not checked-out or not locked by the current user',
      );
    }

    file.name = updatedFile.originalname;
    file.path = filePath;

    file.updatedAt = new Date();
    const updated = await this.fileRepository.save(file);

    await this.historyService.create({
      file: updated,
    });

    return { message: 'File updated successfully' };
  }

  private saveFileOnServer(file: Express.Multer.File): string {
    const uploadDirectory = 'uploads';
    if (!fs.existsSync(uploadDirectory)) {
      fs.mkdirSync(uploadDirectory, { recursive: true });
    }

    const filename = this.generateUniqueFilename(file.originalname);

    const filePath = path.join(uploadDirectory, filename);

    fs.writeFileSync(filePath, file.buffer);

    return filePath;
  }

  private generateUniqueFilename(originalName: string): string {
    const ext = path.extname(originalName);
    const name = path.basename(originalName, ext) + '-' + Date.now() + ext;

    return name;
  }

  async checkIn(userId: number, fileIds: number[]): Promise<File[]> {
    const user = await this.userRepository.findOne({
      where: [
        {
          id: userId,
        },
      ],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const files = await this.fileRepository.find({
      where: {
        id: In(fileIds),
      },
      relations: ['group', 'group.users'],
    });
    files.forEach(async (file) => {
      if (file.status !== 'free') {
        throw new Error(`File ${file.id} is not available for check-in`);
      }
      if (!file?.group?.users?.find((user: User) => user.id === userId)) {
        throw new UnauthorizedException(
          `You can not check-in this file because it is not exist in your groups`,
        );
      }
      file.lockedBy = user;
      file.status = 'checked-out';
      file.updatedAt = new Date();
      await this.historyService.create({
        file: file,
      });
    });

    return await this.fileRepository.save(files);
  }

  async checkOut(userId: number, fileId: number): Promise<File> {
    const file = await this.fileRepository.findOne({
      where: {
        id: fileId,
      },
      relations: ['lockedBy'],
    });
    if (!file) {
      throw new NotFoundException('File not found');
    }
    if (file.lockedBy.id !== userId) {
      throw new Error('User does not have permission to check out this file');
    }
    file.status = 'free';
    file.lockedBy = null;
    if (file) {
      await this.historyService.create({
        file: file,
      });
    }

    file.updatedAt = new Date();
    return await this.fileRepository.save(file);
  }

  async getFileStatus(fileId: number): Promise<string> {
    const file = await this.fileRepository.findOne({
      where: {
        id: fileId,
      },
    });
    if (!file) {
      throw new NotFoundException('File not found');
    }
    return file.status;
  }

  async getFile(id: number): Promise<File> {
    const file = await this.fileRepository.findOne({
      where: {
        id,
      },
      relations: ['lockedBy', 'uploadedBy', 'group'],
    });
    if (!file) {
      throw new NotFoundException(`File with ID ${id} not found`);
    }
    return file;
  }

  async getAllFiles(groupId?: string, name?: string): Promise<File[]> {
    let whereConditions: FindOptionsWhere<File> = {};

    if (groupId) {
      whereConditions.group = { id: +groupId };
    }
    if (name) {
      whereConditions['name'] = Like(`%${name}%`);
    }

    const query = {
      relations: ['lockedBy', 'uploadedBy', 'group'],
      select: {
        lockedBy: {
          username: true,
          id: true,
          email: true,
        },
        uploadedBy: {
          username: true,
          id: true,
          email: true,
        },
      },
      where: whereConditions,
    };

    return this.fileRepository.find(query);
  }
}
