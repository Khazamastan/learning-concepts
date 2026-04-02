import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  async sendBookingConfirmation(email: string, payload: Record<string, unknown>): Promise<void> {
    // TODO: integrate with Resend / Twilio SendGrid
    this.logger.log(`Sending confirmation to ${email} with payload ${JSON.stringify(payload)}`);
  }
}
