import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../database/prisma.service.js';
import { CreateMovieDto } from './dto/create-movie.dto.js';

@Injectable()
export class MoviesService {
  constructor(private readonly prisma: PrismaService) {}

  async list(params: Prisma.MovieFindManyArgs = {}) {
    return this.prisma.movie.findMany(params);
  }

  async findById(id: string) {
    return this.prisma.movie.findUnique({ where: { id } });
  }

  async create(payload: CreateMovieDto) {
    return this.prisma.movie.create({ data: payload });
  }
}
