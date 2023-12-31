import { Module, ValidationError, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { configuration, validationSchema, validationOptions } from 'config';
import { HealthModule } from './bootstrap-modules/health/health.module';
import { LoggerModule } from 'nestjs-pino';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { StockModule } from './stock/stock.module';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { Order } from './order/entities/order.entity';
import { Stock } from './stock/entities/stock.entitiy';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ValidationException } from './common/exception';
import { QueryFailedToQueryFailedExceptionInterceptor } from './common/interceptors';
import { KafkaModule } from './bootstrap-modules/kafka/kafka.module';

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
        entities: [User, Order, Stock],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    LoggerModule.forRoot(),
    EventEmitterModule.forRoot(),
    HealthModule,
    StockModule,
    OrderModule,
    UserModule,
    KafkaModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useFactory: () =>
        new ValidationPipe({
          transform: true,
          exceptionFactory: (errors: ValidationError[]) => {
            errors.map((e) => {
              throw new ValidationException(e);
            });
          },
        }),
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: QueryFailedToQueryFailedExceptionInterceptor,
    },
  ],
})
export class AppModule {}
