import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReservationDto } from './dto/reservation.dto';

@Injectable()
export class ReservationService {
  constructor(private prisma: PrismaService) {}

  private readonly MOVIE_DURATION_HOURS = 2;

  async createReservation(dto: CreateReservationDto) {
    const startTime = new Date(dto.startTime);
    const endTime = new Date(startTime.getTime() + this.MOVIE_DURATION_HOURS * 60 * 60 * 1000);

    const existingReservations = await this.prisma.reservation.findMany({
      where: {
        userId: dto.userId,
        OR: [
          {
            startTime: {
              lte: endTime,
              gte: startTime,
            },
          },
          {
            endTime: {
              lte: endTime,
              gte: startTime,
            },
          },
        ],
      },
    });

    if (existingReservations.length > 0) {
      throw new ConflictException('You already have a reservation that overlaps with this time slot');
    }

    const twoHoursLater = new Date(startTime.getTime() + 2 * 60 * 60 * 1000);
    const futureReservations = await this.prisma.reservation.findMany({
      where: {
        userId: dto.userId,
        startTime: {
          gte: startTime,
          lt: twoHoursLater,
        },
      },
    });

    if (futureReservations.length > 0) {
      throw new ConflictException('You must respect a 2-hour delay between reservations');
    }

    return this.prisma.reservation.create({
      data: {
        movieId: dto.movieId,
        startTime: startTime,
        endTime: endTime,
        userId: dto.userId,
      },
    });
  }

  async getUserReservations(userId: number) {
    return this.prisma.reservation.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        startTime: 'asc',
      },
    });
  }

  async cancelReservation(id: number, userId: number) {
    const reservation = await this.prisma.reservation.findUnique({
      where: { id },
    });

    if (!reservation) {
      throw new NotFoundException('Reservation not found');
    }

    if (reservation.userId !== userId) {
      throw new NotFoundException('You cannot cancel this reservation');
    }

    return this.prisma.reservation.delete({
      where: { id },
    });
  }
}
