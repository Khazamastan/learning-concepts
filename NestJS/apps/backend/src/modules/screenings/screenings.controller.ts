import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

import { ScreeningsService } from './screenings.service.js';
import { CreateScreeningDto } from './dto/create-screening.dto.js';

@ApiTags('screenings')
@Controller('screenings')
export class ScreeningsController {
  constructor(private readonly screeningsService: ScreeningsService) {}

  @Get()
  @ApiQuery({ name: 'movieId', required: false, type: String })
  async list(@Query('movieId') movieId?: string) {
    return this.screeningsService.list({
      where: movieId ? { movieId } : undefined,
    });
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.screeningsService.findById(id);
  }

  @Post()
  async create(@Body() payload: CreateScreeningDto) {
    return this.screeningsService.create(payload);
  }
}
