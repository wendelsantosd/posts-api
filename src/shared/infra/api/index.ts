import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { server } from '@shared/config/env/server';
import { json } from 'express';
import { AppModule } from './app.module';

export const bootstrapAPI = async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.use(json({ limit: '20mb' }));
  app.enableShutdownHooks();
  await app.listen(server.port ?? '3000');
};
