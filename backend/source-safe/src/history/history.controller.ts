import { Controller, Get, Param } from '@nestjs/common';
import { HistoryService } from './history.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('history')
@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get()
  async findAll() {
    return await this.historyService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.historyService.findOne(+id);
  }

  @Get('/file/:fileId')
  async findOneByFileId(@Param('fileId') fileId: string) {
    return await this.historyService.findOneByFileId(+fileId);
  }

  @Get('/locked-by-user/:userId')
  async findAllLockedByUser(@Param('userId') userId: string) {
    return await this.historyService.findAllLockedByUser(+userId);
  }
}
