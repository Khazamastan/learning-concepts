import { Injectable, Logger } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';

import { ReservationsService } from '../reservations/reservations.service.js';

@Injectable()
export class PaymentsService {
  private readonly stripe: Stripe;
  private readonly logger = new Logger(PaymentsService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly reservationsService: ReservationsService,
  ) {
    this.stripe = new Stripe(this.configService.getOrThrow<string>('STRIPE_SECRET_KEY'), {
      apiVersion: '2023-10-16',
    });
  }

  async createCheckoutSession(reservationId: string, successUrl: string, cancelUrl: string) {
    const reservation = await this.reservationsService.list({
      where: { id: reservationId },
      include: { seats: true, screening: { include: { movie: true } } },
    });

    const data = reservation[0];
    if (!data) {
      throw new Error('Reservation not found');
    }

    const session = await this.stripe.checkout.sessions.create({
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: { reservationId },
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: data.totalAmount,
            product_data: {
              name: data.screening.movie.title,
              description: `${data.seats.length} seats`,
            },
          },
          quantity: 1,
        },
      ],
    });

    return session;
  }

  async processWebhook(signature: string, payload: Buffer) {
    const webhookSecret = this.configService.getOrThrow<string>('STRIPE_WEBHOOK_SECRET');
    const event = this.stripe.webhooks.constructEvent(payload, signature, webhookSecret);

    if (event.type === 'checkout.session.completed') {
      const reservationId = event.data.object.metadata?.reservationId;
      const paymentIntentId = event.data.object.payment_intent as string;
      if (reservationId) {
        await this.reservationsService.markConfirmed(reservationId, paymentIntentId);
        this.logger.log(`Reservation ${reservationId} marked as confirmed`);
      }
    }

    return { received: true };
  }
}
