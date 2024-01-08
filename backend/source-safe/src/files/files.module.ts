import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { File } from './file.entity';
import { HistoryService } from 'src/history/history.service';
import { History } from 'src/history/history.entity';
import { Group } from 'src/group/group.entity';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TypeOrmModule.forFeature([File, User, History, Group]),
    ScheduleModule.forRoot(),
  ],
  providers: [FilesService, HistoryService],
  controllers: [FilesController],
})
export class FilesModule {}
