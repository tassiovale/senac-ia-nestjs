import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true, // Automatically transform payload into DTO instance
    whitelist: true, // Strip properties that are not in the DTO
    forbidNonWhitelisted: true, // Throw an error if a non-whitelisted property is present
  }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
