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
import { StockModule } from './stock/stock.module';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { Order } from './order/entities/order.entity';
import { Stock } from './stock/entities/stock.entitiy';

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
    HealthModule,
    StockModule,
    OrderModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, ShutdownHandler],
})
export class AppModule {}
