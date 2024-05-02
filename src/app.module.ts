import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { MenuModule } from './menu/menu.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/typeorm.config.service';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigService } from './config/jwt.config.service';
import { AuthMiddleware } from './auth/auth.middleware';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: JwtConfigService,
      inject: [ConfigService],
    }),
    CategoryModule,
    MenuModule,
    UserModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthMiddleware],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'category', method: RequestMethod.POST },
        { path: 'category/:categoryId', method: RequestMethod.PATCH },
        { path: 'category/:categoryId', method: RequestMethod.DELETE },
        { path: 'menu/:categoryId', method: RequestMethod.POST },
        { path: 'menu/:categoryId/:menuId', method: RequestMethod.PATCH },
        { path: 'menu/:categoryId/:menuId', method: RequestMethod.DELETE },
        { path: 'order', method: RequestMethod.POST },
        { path: 'order/customer', method: RequestMethod.GET },
        { path: 'order/owner', method: RequestMethod.GET },
        { path: 'order/:orderId/status', method: RequestMethod.PATCH },
      );
  }
}
