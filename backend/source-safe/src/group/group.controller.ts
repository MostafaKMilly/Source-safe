import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  Query,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from './group.entity';
import { ApiTags } from '@nestjs/swagger';
import { AddUserDto } from './dto/add-user.dto';
import { RemoveUserDto } from './dto/remove-user.dto';
import { AuthRequest } from 'src/auth/jwt-payload.interface';
import { AuthGuard } from '@nestjs/passport';
import { SetGroupUsersDto } from './dto/set-group-users.dto';

@ApiTags('group')
@Controller('group')
@UseGuards(AuthGuard('jwt'))
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post('create')
  async create(
    @Req() req: AuthRequest,
    @Body() createGroupDto: CreateGroupDto,
  ): Promise<Group> {
    const userId = req.user.id;
    return await this.groupService.create(createGroupDto, userId);
  }

  @Get('getAll')
  async findAll(
    @Req() req: AuthRequest,
    @Query() query?: { name?: string; showOwnerGroups?: boolean },
  ): Promise<Array<Group>> {
    const userId = req.user.id;
    return await this.groupService.findAll(userId, query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Group> {
    return await this.groupService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGroupDto: UpdateGroupDto,
    @Req() req,
  ) {
    const userId = req.user.id;
    return this.groupService.update(+id, updateGroupDto, userId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req) {
    const userId = req.user.id;
    return await this.groupService.delete(+id, userId);
  }

  @Post('addUser')
  async addUser(@Body() addData: AddUserDto, @Req() req) {
    const userId = req.user.id;
    return this.groupService.addUser(addData, userId);
  }
  @Post(':id/leave')
  async leaveGroup(@Param('id') id: string, @Req() req) {
    const userId = req.user.id;
    return this.groupService.leaveGroup({ groupId: +id, userId });
  }

  @Post('removeUser')
  async removeUser(@Body() removeData: RemoveUserDto, @Req() req) {
    const userId = req.user.id;
    return this.groupService.removeUser(removeData, userId);
  }

  @Post('setUsers')
  async setUsers(@Body() data: SetGroupUsersDto, @Req() req) {
    const userId = req.user.id;
    return this.groupService.setGroupUsers(data, userId);
  }
}
