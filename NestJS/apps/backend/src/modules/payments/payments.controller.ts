import { Body, Controller, Headers, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { PaymentsService } from './payments.service.js';
import { CheckoutDto } from './dto/checkout.dto.js';

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('checkout')
  async checkout(@Body() payload: CheckoutDto) {
    return this.paymentsService.createCheckoutSession(
      payload.reservationId,
      payload.successUrl,
      payload.cancelUrl,
    );
  }

  @Post('webhook')
  async webhook(@Req() req: Request, @Headers('stripe-signature') signature: string) {
    return this.paymentsService.processWebhook(signature, req.body);
  }
}
