import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ShutdownHandler } from './common/shutdown/shutdown-handler';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HealthModule } from './health/health.module';
import { Logger } from 'nestjs-pino';
import { UserModule } from './user/user.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionsFilter } from './common/filters/http-error.filter';
import { StockModule } from './stock/stock.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const configService = app.get<ConfigService>(ConfigService);

  // Greceful shutdown
  const shutdownHandler = app.get(ShutdownHandler);

  process.on('SIGTERM', async () => {
    console.log('Graceful Shutdown starting...');
    await shutdownHandler.onShutdown('SIGTERM');
    process.exit(0);
  });

  // swagger

  const options = new DocumentBuilder()
    .setTitle(' Stock Exchange API documents')
    .setDescription('The API description on stock exchange')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options, {
    include: [HealthModule, UserModule, StockModule],
  });

  SwaggerModule.setup('docs', app, document);

  app.useLogger(app.get(Logger));

  app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true }));

  app.useGlobalFilters(new HttpExceptionsFilter(app.get(Logger)));

  await app.listen(configService.get<number>('PORT'));
}
bootstrap();
