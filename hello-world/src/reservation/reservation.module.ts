import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
@Module({
  providers: [ReservationService],
  controllers: [ReservationController],
  imports: [PrismaModule],
})
export class ReservationModule {}
