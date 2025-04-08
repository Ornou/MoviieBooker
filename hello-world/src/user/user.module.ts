import { Module } from '@nestjs/common';
import { UserService } from './user.service';
//import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [UserService, PrismaService],
  exports: [UserService],
})
export class UserModule {}
