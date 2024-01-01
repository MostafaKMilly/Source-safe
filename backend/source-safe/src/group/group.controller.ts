import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from './group.entity';
import { ApiTags } from '@nestjs/swagger';
import { AddUserDto } from './dto/add-user.dto';
import { RemoveUserDto } from './dto/remove-user.dto';

@ApiTags('group')
@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post('create')
  async create(@Body() createGroupDto: CreateGroupDto): Promise<Group> {
    return await this.groupService.create(createGroupDto);
  }

  @Get('getAll')
  async findAll(): Promise<Array<Group>> {
    return await this.groupService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Group> {
    return await this.groupService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.update(+id, updateGroupDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.groupService.delete(+id);
  }

  @Post('addUser')
  async addUser(@Body() addDate: AddUserDto) {
    return this.groupService.addUser(addDate);
  }

  @Post('removeUser')
  async removeUser(@Body() removeDate: RemoveUserDto) {
    return this.groupService.removeUser(removeDate);
  }
}
