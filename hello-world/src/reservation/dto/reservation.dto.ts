import { IsString, IsDateString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReservationDto {
  @ApiProperty({
    description: 'ID du film à réserver',
    example: 'tt0111161'
  })
  @IsString()
  movieId: string;

  @ApiProperty({
    description: 'Date et heure de début de la réservation',
    example: '2024-03-20T18:00:00Z'
  })
  @IsDateString()
  startTime: Date;

  @ApiProperty({
    description: 'ID de l\'utilisateur qui fait la réservation',
    example: 1
  })
  @IsInt()
  userId: number;
}

export class ReservationResponseDto {
  @ApiProperty({
    description: 'ID de la réservation',
    example: 1
  })
  id: number;

  @ApiProperty({
    description: 'ID du film réservé',
    example: 'tt0111161'
  })
  movieId: string;

  @ApiProperty({
    description: 'Date et heure de début de la réservation',
    example: '2024-03-20T18:00:00Z'
  })
  startTime: Date;

  @ApiProperty({
    description: 'Date et heure de fin de la réservation',
    example: '2024-03-20T20:00:00Z'
  })
  endTime: Date;

  @ApiProperty({
    description: 'ID de l\'utilisateur qui a fait la réservation',
    example: 1
  })
  userId: number;
}

