import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDto } from 'src/users/register-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}
  async signIn(signInDto: SignInDto) {
    const user = await this.validateUser(
      signInDto.username,
      signInDto.password,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const payload = { id: user.id, username: user.username };
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });

    return {
      access_token: accessToken,
      user,
    };
  }

  async signUp(registerUserDto: RegisterUserDto) {
    const { username, password, email } = registerUserDto;

    const isUsernameExist = await this.usersRepository.findOne({
      where: { username },
    });

    const isEmailExist = await this.usersRepository.findOne({
      where: { email },
    });

    if (isUsernameExist)
      throw new BadRequestException('Username already exists');
    if (isEmailExist) throw new BadRequestException('Email already exists');

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.usersRepository.create({
      username,
      email,
      password: hashedPassword,
    });

    await this.usersRepository.save(user);

    const payload = { id: user.id, username: user.username };
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      access_token: accessToken,
      user,
    };
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (user) {
      const passwordIsCorrect = await user?.validatePassword(password);
      if (user && passwordIsCorrect) {
        const { password, ...result } = user;
        return result;
      }
    }

    throw new BadRequestException('Invalid username or password');
  }
}
