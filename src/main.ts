import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import * as session from 'express-session';
import * as connectRedis from 'connect-redis';
import Redis from 'ioredis';
import { AppModule } from './app.module';

async function bootstrap() {
  const RedisStore = connectRedis(session);
  const redisClient = new Redis();

  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const PORT = configService.get<string>('PORT');
  const SESSION_COOKIE_NAME = configService.get<string>('SESSION_COOKIE_NAME');
  const SESSION_SECRET = configService.get<string>('SESSION_SECRET');

  app.useGlobalPipes(new ValidationPipe());

  app.use(
    session({
      name: SESSION_COOKIE_NAME,
      store: new RedisStore({
        client: redisClient,
        disableTouch: true,
      }),
      cookie: {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 24,
      },
      secret: SESSION_SECRET ?? 'secret',
      resave: false,
      saveUninitialized: false,
    }),
  );

  await app.listen(PORT ?? 8000);
}
bootstrap();
