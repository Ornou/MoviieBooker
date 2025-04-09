import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { ConfigModule } from '@nestjs/config';
@Module({
  providers: [MoviesService],
  imports: [ConfigModule],
  controllers: [MoviesController]
})
export class MoviesModule {}
