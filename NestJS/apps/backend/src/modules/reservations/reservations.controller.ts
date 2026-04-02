import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ReservationsService } from './reservations.service.js';
import { CreateReservationDto } from './dto/create-reservation.dto.js';

@ApiTags('reservations')
@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Get()
  async list() {
    return this.reservationsService.list();
  }

  @Post()
  async create(@Body() payload: CreateReservationDto) {
    return this.reservationsService.create(payload);
  }

  @Post(':id/cancel')
  async cancel(@Param('id') id: string) {
    return this.reservationsService.cancel(id);
  }
}
