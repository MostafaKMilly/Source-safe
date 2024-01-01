import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { File } from './file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([File, User])],
  providers: [FilesService],
  controllers: [FilesController],
})
export class FilesModule {}
