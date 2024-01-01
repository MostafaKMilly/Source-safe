import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { RegisterUserDto } from '../users/register-user.dto';
import { SignInDto } from './dto/sign-in.dto';
import { Public } from './decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger/dist/decorators';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { LoggingInterceptor } from 'src/aspects/logging.interceptor';

@Controller('auth')
@ApiTags('Auth')
@UseInterceptors(LoggingInterceptor)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    // private readonly jwtService: JwtService,
  ) {}

  @Post('sign-up')
  async signUp(@Body() registerUserDto: RegisterUserDto) {
    const userDto = plainToClass(RegisterUserDto, registerUserDto);
    const errors = await validate(userDto);

    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }
    return this.usersService.create(registerUserDto);
  }

  @Public()
  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto) {
    const userDto = plainToClass(SignInDto, signInDto);
    const errors = await validate(userDto);

    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }
    return this.authService.signIn(signInDto);
  }
}
