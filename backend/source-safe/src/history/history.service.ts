import { Injectable } from '@nestjs/common';
import { CreateHistoryDto } from './dto/create-history.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { History } from './history.entity';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History)
    private historyRepository: Repository<History>,
  ) {}

  async create(createHistory: CreateHistoryDto) {
    const { file } = createHistory;
    const history = this.historyRepository.create({
      file: file,
    });
    await this.historyRepository.save(history);
  }

  async findAll() {
    const histories = await this.historyRepository.find({
      relations: ['file', 'file.uploadedBy', 'file.lockedBy'],
    });
    const fixedHistories = histories.map((item) => {
      return {
        ...item,
        file: {
          ...item.file,
          uploadedBy: item.file.uploadedBy && {
            id: item.file.uploadedBy.id,
            username: item.file.uploadedBy.username,
            email: item.file.uploadedBy.email,
          },
          lockedBy: item.file?.lockedBy && {
            id: item.file?.lockedBy?.id,
            username: item.file?.lockedBy?.username,
            email: item.file?.lockedBy?.email,
          },
        },
      };
    });

    return fixedHistories;
  }

  async findOne(id: number) {
    return await this.historyRepository.findOne({
      where: {
        id: id,
      },
      relations: ['file', 'file.uploadedBy', 'file.lockedBy'],
    });
  }

  async findOneByFileId(fileId: number) {
    return await this.historyRepository.find({
      where: {
        file: {
          id: fileId,
        },
      },
      relations: ['file', 'file.uploadedBy', 'file.lockedBy'],
    });
  }

  async findAllLockedByUser(userId: number) {
    return await this.historyRepository.find({
      where: [
        {
          file: {
            lockedBy: {
              id: userId,
            },
          },
        },
        {
          file: {
            uploadedBy: {
              id: userId,
            },
          },
        },
      ],
      relations: ['file', 'file.uploadedBy', 'file.lockedBy'],
    });
  }
}
