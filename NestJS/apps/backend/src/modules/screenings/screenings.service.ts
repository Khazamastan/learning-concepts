import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../database/prisma.service.js';
import { CreateScreeningDto } from './dto/create-screening.dto.js';

@Injectable()
export class ScreeningsService {
  constructor(private readonly prisma: PrismaService) {}

  async list(params: Prisma.ScreeningFindManyArgs = {}) {
    return this.prisma.screening.findMany({
      include: { movie: true, hall: true },
      ...params,
    });
  }

  async findById(id: string) {
    return this.prisma.screening.findUnique({
      where: { id },
      include: { movie: true, hall: true },
    });
  }

  async create(payload: CreateScreeningDto) {
    return this.prisma.screening.create({ data: payload });
  }
}
