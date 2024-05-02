import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Order } from './order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigService } from 'src/config/jwt.config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserRepository } from 'src/user/user.repository';
import { MenuRepository } from 'src/menu/menu.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: JwtConfigService,
      inject: [ConfigService],
    }),
  ],
  controllers: [OrderController],
  providers: [OrderService, UserRepository, MenuRepository],
})
export class OrderModule {}
