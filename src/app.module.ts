import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { configuration, validationSchema, validationOptions } from 'config';
import { HealthModule } from './health/health.module';
import { ShutdownHandler } from './common/shutdown/shutdown-handler';
import { LoggerModule } from 'nestjs-pino';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: validationSchema,
      validationOptions: validationOptions,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('postgreSql.dbHost'),
        username: configService.get<string>('postgreSql.dbUsername'),
        password: configService.get<string>('postgreSql.dbPassword'),
        database: configService.get<string>('postgreSql.dbName'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    LoggerModule.forRoot(),
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService, ShutdownHandler],
})
export class AppModule {}
