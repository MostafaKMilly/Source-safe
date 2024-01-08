import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { File } from './file.entity'; // Adjust this import based on your project structure
import { User } from 'src/users/user.entity';
import * as fs from 'fs';
import * as path from 'path';
import { HistoryService } from 'src/history/history.service';
import { Group } from 'src/group/group.entity';

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

  async uploadFile(
    file: Express.Multer.File,
    userId: number,
    groupId: number,
  ): Promise<File> {
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

    await this.fileRepository.save(newFile);

    if (newFile) {
      this.historyService.create({
        file: newFile,
      });
    }
    return newFile;
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

  async checkIn(userId: number, fileIds: number[]): Promise<void> {
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
    const files = await this.fileRepository.findBy({
      id: In(fileIds),
    });
    files.forEach(async (file) => {
      if (file.status !== 'free') {
        throw new Error(`File ${file.id} is not available for check-in`);
      }
      file.lockedBy = user;
      file.status = 'checked-out';
      await this.historyService.create({
        file: file,
      });
    });

    await this.fileRepository.save(files);
  }

  async checkOut(userId: number, fileId: number): Promise<void> {
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

    await this.fileRepository.save(file);
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

  async getAllFiles(): Promise<File[]> {
    return this.fileRepository.find({
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
    });
  }
}
