import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionsFilter } from './common/filters/http-error.filter';
import { version, name, description } from '../package.json';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const configService = app.get<ConfigService>(ConfigService);

  // swagger

  const documentBuilderConfig: Omit<OpenAPIObject, 'paths'> =
    new DocumentBuilder()
      .setTitle(name)
      .setDescription(description)
      .setVersion(version)
      .build();

  const SwaggerDocument: OpenAPIObject = SwaggerModule.createDocument(
    app,
    documentBuilderConfig,
  );

  SwaggerModule.setup('docs', app, SwaggerDocument, {});

  app.useLogger(app.get(Logger));

  app.enableShutdownHooks();

  app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true }));

  app.useGlobalFilters(new HttpExceptionsFilter(app.get(Logger)));

  await app.listen(configService.get<number>('PORT'));
}

bootstrap();
