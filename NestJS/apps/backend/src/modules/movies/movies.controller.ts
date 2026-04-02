import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

import { MoviesService } from './movies.service.js';
import { CreateMovieDto } from './dto/create-movie.dto.js';

@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async list(@Query('limit') limit?: number) {
    return this.moviesService.list({ take: limit });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.moviesService.findById(id);
  }

  @Post()
  async create(@Body() payload: CreateMovieDto) {
    return this.moviesService.create(payload);
  }
}
