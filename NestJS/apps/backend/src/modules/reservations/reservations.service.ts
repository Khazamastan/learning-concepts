import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../database/prisma.service.js';
import { CreateReservationDto } from './dto/create-reservation.dto.js';

@Injectable()
export class ReservationsService {
  private static readonly HOLD_DURATION_MINUTES = 10;

  constructor(private readonly prisma: PrismaService) {}

  async list(params: Prisma.ReservationFindManyArgs = {}) {
    return this.prisma.reservation.findMany({
      include: { screening: { include: { movie: true, hall: true } }, seats: true },
      ...params,
    });
  }

  async create(payload: CreateReservationDto) {
    return this.prisma.$transaction(async (tx) => {
      const screening = await tx.screening.findUnique({
        where: { id: payload.screeningId },
        include: { hall: { include: { seats: true } } },
      });

      if (!screening) {
        throw new BadRequestException('Invalid screening');
      }

      const conflictingReservation = await tx.reservationSeat.findFirst({
        where: {
          seatId: { in: payload.seatIds },
          reservation: {
            screeningId: payload.screeningId,
            status: { in: ['PENDING', 'CONFIRMED'] },
          },
        },
      });

      if (conflictingReservation) {
        throw new BadRequestException('One or more seats are no longer available');
      }

      const reservation = await tx.reservation.create({
        data: {
          userId: payload.userId,
          screeningId: payload.screeningId,
          status: 'PENDING',
          totalAmount: payload.totalAmount,
          expiresAt: new Date(Date.now() + ReservationsService.HOLD_DURATION_MINUTES * 60 * 1000),
          seats: {
            createMany: {
              data: payload.seatIds.map((seatId) => ({ seatId })),
            },
          },
        },
        include: { seats: true },
      });

      return reservation;
    });
  }

  async cancel(id: string) {
    return this.prisma.reservation.update({
      where: { id },
      data: { status: 'CANCELLED' },
    });
  }

  async markConfirmed(id: string, paymentIntentId: string) {
    return this.prisma.reservation.update({
      where: { id },
      data: { status: 'CONFIRMED', paymentIntentId },
    });
  }
}
