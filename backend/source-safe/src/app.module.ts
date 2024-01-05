import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ConfigurationModule } from './config/config.module';
import { FilesModule } from './files/files.module';
import { File } from './files/file.entity';
import { GroupModule } from './group/group.module';
import { Group } from './group/group.entity';
import { HistoryModule } from './history/history.module';
import { History } from './history/history.entity';

@Module({
  imports: [
    ConfigurationModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      username: 'postgres',
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [User, File, Group, History],
      autoLoadEntities: true,
      synchronize: true,
    }),
    ConfigModule.forRoot(),
    AuthModule,
    UsersModule,
    FilesModule,
    GroupModule,
    HistoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
