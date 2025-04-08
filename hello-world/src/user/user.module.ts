import { Module } from '@nestjs/common';
import { UserService } from './user.service';
//import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule} from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { UserController } from './user.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),

  ],
  providers: [UserService, PrismaService, JwtStrategy],
  controllers: [UserController],
})
export class UserModule {}
