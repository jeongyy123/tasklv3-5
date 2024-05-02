import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { OrderType } from 'src/order/order-type.enum';

export class CreateOrderDto {
  @IsNumber()
  @IsNotEmpty({ message: 'menuId를 입력해주세요.' })
  menuId: number;

  @IsNumber()
  @IsNotEmpty({ message: 'quantity를 입력해주세요.' })
  quantity: number;

  // @IsOptional()
  // @IsEnum(OrderType)
  // orderType: OrderType = OrderType.PENDING;
}
