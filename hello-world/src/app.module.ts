import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { MoviesModule } from 'src/movies/movies.module';
@Module({
  imports: [UserModule,
   ConfigModule.forRoot({
    isGlobal: true,
   }),
   HttpModule,
   MoviesModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
