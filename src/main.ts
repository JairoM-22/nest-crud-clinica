import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Necesario para que el frontend (servido desde otro origen/puerto,
  // p. ej. Live Server en :5500 o abierto como file://) pueda llamar
  // a este backend en :3000. No cambia ninguna ruta ni lógica.
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
