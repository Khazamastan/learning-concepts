import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { json, urlencoded } from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger as PinoLogger } from 'nestjs-pino';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './modules/app.module.js';
import { AllExceptionsFilter } from './common/filters/http-exception.filter.js';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
    rawBody: true, // Stripe webhook verification
  });

  const configService = app.get(ConfigService);
  const logger = new Logger('Bootstrap');

  app.useLogger(app.get(PinoLogger));
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.use(json({ limit: '1mb' }));
  app.use(urlencoded({ extended: true }));
  app.use(helmet());
  app.use(cookieParser());

  const corsOrigins = configService.get<string>('CORS_ORIGINS', '');
  const originList = corsOrigins.split(',').map((origin) => origin.trim()).filter(Boolean);

  app.enableCors({
    origin: originList.length > 0 ? originList : [/localhost:\d+$/],
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Cinema Booking API')
    .setDescription('REST API for cinema booking platform')
    .setVersion('0.1.0')
    .addBearerAuth()
    .build();

  const documentFactory = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, documentFactory);

  const port = configService.get<number>('PORT', 4000);
  await app.listen(port);
  logger.log(`API listening on port ${port}`);
}

void bootstrap();
