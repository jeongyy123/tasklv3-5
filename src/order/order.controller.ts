import { Body, Controller, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from 'src/dto/create-order.dto';
import { UpdateOrderDto } from 'src/dto/update-order.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiBearerAuth('accessToken')
  @ApiOperation({
    summary: '주문 생성',
  })
  @ApiBody({ type: CreateOrderDto })
  @ApiCreatedResponse({ description: '메뉴 주문에 성공하였습니다.' })
  @ApiNotFoundResponse({ description: '해당 메뉴는 존재하지않습니다.' })
  @ApiUnauthorizedResponse({ description: '사용자만 이용할 수 있습니다.' })
  async createOrder(@Req() req: Request, @Body() data: CreateOrderDto) {
    return await this.orderService.createOrder(req, data.menuId, data.quantity);
  }

  @Get('/customer')
  @ApiBearerAuth('accessToken')
  @ApiOperation({
    summary: '사용자 주문 조회',
  })
  async getOrderByCustomer(@Req() req: Request) {
    return await this.orderService.getOrderByCustomer(req);
  }

  @Get('/owner')
  @ApiBearerAuth('accessToken')
  @ApiOperation({
    summary: '사장님 주문 조회',
  })
  async getOrderByOwner(@Req() req: Request) {
    return await this.orderService.getOrderByOwner(req);
  }

  @Patch('/:orderId/status')
  @ApiBearerAuth('accessToken')
  @ApiOperation({
    summary: '사장님 주문 수정',
  })
  @ApiBody({ type: UpdateOrderDto })
  @ApiOkResponse({ description: '주문 상태가 변경되었습니다.' })
  @ApiUnauthorizedResponse({ description: '사장님만 이용할 수 있습니다.' })
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
