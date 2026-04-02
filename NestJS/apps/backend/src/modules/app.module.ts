import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { LoggerModule } from 'nestjs-pino';

import { appConfig } from '../config/app.config.js';
import { DatabaseModule } from './database/database.module.js';
import { AuthModule } from './auth/auth.module.js';
import { UsersModule } from './users/users.module.js';
import { MoviesModule } from './movies/movies.module.js';
import { ScreeningsModule } from './screenings/screenings.module.js';
import { ReservationsModule } from './reservations/reservations.module.js';
import { PaymentsModule } from './payments/payments.module.js';
import { NotificationsModule } from './notifications/notifications.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport:
          process.env.NODE_ENV !== 'production'
            ? {
                target: 'pino-pretty',
                options: { singleLine: true, translateTime: 'HH:MM:ss.l' },
              }
            : undefined,
      },
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 100,
      },
    ]),
    DatabaseModule,
    AuthModule,
    UsersModule,
    MoviesModule,
    ScreeningsModule,
    ReservationsModule,
    PaymentsModule,
    NotificationsModule,
  ],
})
export class AppModule {}
