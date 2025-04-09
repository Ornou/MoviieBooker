import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReservationDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ default: 'Inception' })
  movieName: string;

}