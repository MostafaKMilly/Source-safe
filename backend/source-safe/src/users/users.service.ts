import { Injectable, BadRequestException } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './register-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(registerUserDto: RegisterUserDto): Promise<User> {
    const { username, password, email } = registerUserDto;

    const isUsernameExist = await this.userRepository.findOne({
      where: [
        {
          username,
        },
      ],
    });

    const isEmailExist = await this.userRepository.findOne({
      where: [
        {
          email,
        },
      ],
    });

    if (isUsernameExist)
      throw new BadRequestException('Username already exists');
    if (isEmailExist) throw new BadRequestException('Email already exists');

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User();
    user.username = username;
    user.email = email;
    user.password = hashedPassword;

    return this.userRepository.save(user);
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({ where: { username } });
  }
}
