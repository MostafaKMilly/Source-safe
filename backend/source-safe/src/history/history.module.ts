import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { User } from 'src/users/user.entity';
import { File } from 'src/files/file.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { History } from './history.entity';

@Module({
  controllers: [HistoryController],
  providers: [HistoryService],
  imports: [TypeOrmModule.forFeature([File, User, History])],
})
export class HistoryModule {}
