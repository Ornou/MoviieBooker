import { Controller, Get, Post, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/reservation.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';

@ApiBearerAuth('Access-Token')
@Controller('reservations')
@UseGuards(AuthGuard('jwt'))
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  @ApiBody({ 
    type: CreateReservationDto,
    examples: {
      example1: {
        value: {
          movieId: 'tt0111161',
          startTime: '2024-03-20T18:00:00Z',
          userId: 1
        }
      }
    }
  })
  async createReservation(@Body() dto: CreateReservationDto) {
    return this.reservationService.createReservation(dto);
  }

  @Get()
  async getUserReservations(@Body('userId') userId: number) {
    return this.reservationService.getUserReservations(userId);
  }

  @Delete(':id')
  async cancelReservation(
    @Param('id') id: string,
    @Body('userId') userId: number,
  ) {
    return this.reservationService.cancelReservation(parseInt(id), userId);
  }
}
