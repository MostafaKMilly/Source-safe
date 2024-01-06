import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { AuthRequest } from 'src/auth/jwt-payload.interface';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('me')
  async getMyProfile(@Req() req: AuthRequest): Promise<any> {
    const userId = req.user.id;
    return this.usersService.findOne(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Get('username/:username')
  async findByUsername(@Param('username') username: string): Promise<User> {
    return this.usersService.findByUsername(username);
  }
}
