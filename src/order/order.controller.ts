import { Body, Controller, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from 'src/dto/create-order.dto';
import { UpdateOrderDto } from 'src/dto/update-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Req() req: Request, @Body() data: CreateOrderDto) {
    return await this.orderService.createOrder(req, data.menuId, data.quantity);
  }

  // @Get('/customer')
  // async getOrderByCustomer(@Req() req: Request) {
  //   return await this.orderService.getOrderByCustomer(req);
  // }

  // @Get('/owner')
  // async getOrderByOwner(@Req() req: Request) {
  //   await this.orderService.getOrderByOwner(req, req.userId);
  // }

  @Patch('/:orderId/status')
  async updateOrderType(
    @Req() req: Request,
    @Param('orderId') orderId: number,
    @Body() data: UpdateOrderDto,
  ) {
    return await this.orderService.updateOrderType(
      req,
      orderId,
      data.orderType,
    );
  }
}
