import { Module } from '@nestjs/common';

import { PaymentsController } from './payments.controller.js';
import { PaymentsService } from './payments.service.js';
import { ReservationsModule } from '../reservations/reservations.module.js';

@Module({
  imports: [ReservationsModule],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
