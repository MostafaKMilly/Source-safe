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

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateHistoryDto: UpdateHistoryDto) {
  //   return this.historyService.update(+id, updateHistoryDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.historyService.remove(+id);
  // }
}
