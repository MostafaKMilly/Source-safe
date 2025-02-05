import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Req,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Query,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { CheckInDto } from './dto/check-file.dto';
import { CheckOutDto } from './dto/checkout-file.dto';
import { AuthRequest } from 'src/auth/jwt-payload.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';

@Controller('files')
@UseGuards(AuthGuard('jwt'))
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadfile(
    @Req() req: AuthRequest,
    @UploadedFile() file: Express.Multer.File,
    @Query('groupId') groupId,
  ) {
    const userId = req.user.id;
    return this.filesService.uploadFile(file, userId, Number(groupId));
  }

  @Post('check-in')
  async checkIn(@Req() req: AuthRequest, @Body() checkInData: CheckInDto) {
    const userId = req.user.id;

    return await this.filesService.checkIn(userId, checkInData.fileIds);
  }

  @Post('check-out')
  async checkOut(@Req() req: AuthRequest, @Body() checkOutData: CheckOutDto) {
    const userId = req.user.id;

    return await this.filesService.checkOut(userId, checkOutData.fileId);
  }

  @Get('status/:fileId')
  async getFileStatus(@Param('fileId') fileId: number): Promise<string> {
    const status = await this.filesService.getFileStatus(fileId);
    return status;
  }

  @Get(':id')
  async getFile(@Param('id') id: number) {
    return this.filesService.getFile(id);
  }

  @Get()
  async getFilesByGroup(
    @Query('groupId') groupId?: string,
    @Query('search') name?: string,
  ) {
    return this.filesService.getAllFiles(groupId, name);
  }

  @Post('update/:fileId')
  @UseInterceptors(FileInterceptor('file'))
  async updateFile(
    @Req() req: AuthRequest,
    @Param('fileId') fileId: number,
    @UploadedFile() updatedFile: Express.Multer.File,
  ): Promise<{ message: string }> {
    const userId = req.user.id;
    return this.filesService.updateFile(updatedFile, userId, fileId);
  }
}
