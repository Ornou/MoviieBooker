import { ReservationService } from './reservation.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('ReservationService', () => {
  let service: ReservationService;
  let prisma: PrismaService;

  const mockPrisma = {
    reservation: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(() => {
    prisma = mockPrisma as unknown as PrismaService;
    service = new ReservationService(prisma);
    jest.clearAllMocks();
  });

  describe('createReservation', () => {
    const dto = {
      userId: 1,
      movieId: '12345',
      startTime: new Date(),
    };

    it('should create a reservation if no conflict exists', async () => {
      mockPrisma.reservation.findMany.mockResolvedValueOnce([]); // no overlap
      mockPrisma.reservation.findMany.mockResolvedValueOnce([]); // 2h delay check
      mockPrisma.reservation.create.mockResolvedValue({
        id: 1,
        ...dto,
        endTime: new Date(new Date(dto.startTime).getTime() + 2 * 60 * 60 * 1000),
      });

      const result = await service.createReservation(dto);

      expect(result).toHaveProperty('id');
      expect(mockPrisma.reservation.create).toHaveBeenCalled();
    });

    it('should throw ConflictException if reservation overlaps', async () => {
      mockPrisma.reservation.findMany.mockResolvedValueOnce([
        { id: 99, startTime: new Date(), endTime: new Date() },
      ]);

      await expect(service.createReservation(dto)).rejects.toThrow(ConflictException);
    });

    it('should throw ConflictException if reservation violates 2-hour rule', async () => {
      mockPrisma.reservation.findMany
        .mockResolvedValueOnce([]) // no overlap
        .mockResolvedValueOnce([{ id: 101 }]); // within 2h window

      await expect(service.createReservation(dto)).rejects.toThrow(ConflictException);
    });
  });

  describe('getUserReservations', () => {
    it('should return reservations for a user', async () => {
      const userId = 1;
      const fakeReservations = [
        { id: 1, movieId: 'abc', startTime: new Date(), endTime: new Date(), userId },
      ];
      mockPrisma.reservation.findMany.mockResolvedValue(fakeReservations);

      const result = await service.getUserReservations(userId);

      expect(result).toEqual(fakeReservations);
      expect(mockPrisma.reservation.findMany).toHaveBeenCalledWith({
        where: { userId },
        orderBy: { startTime: 'asc' },
      });
    });
  });

  describe('cancelReservation', () => {
    it('should cancel a reservation if it exists and belongs to the user', async () => {
      const id = 1;
      const userId = 42;
      const mockReservation = { id, userId, movieId: '1', startTime: new Date(), endTime: new Date() };

      mockPrisma.reservation.findUnique.mockResolvedValue(mockReservation);
      mockPrisma.reservation.delete.mockResolvedValue(mockReservation);

      const result = await service.cancelReservation(id, userId);

      expect(result).toEqual(mockReservation);
      expect(mockPrisma.reservation.delete).toHaveBeenCalledWith({ where: { id } });
    });

    it('should throw NotFoundException if reservation not found', async () => {
      mockPrisma.reservation.findUnique.mockResolvedValue(null);

      await expect(service.cancelReservation(1, 2)).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException if reservation belongs to another user', async () => {
      mockPrisma.reservation.findUnique.mockResolvedValue({ id: 1, userId: 999 });

      await expect(service.cancelReservation(1, 123)).rejects.toThrow(NotFoundException);
    });
  });
});
