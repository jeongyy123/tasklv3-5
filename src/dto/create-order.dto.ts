import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ description: '메뉴ID', example: 3 })
  @IsNumber()
  @IsNotEmpty({ message: 'menuId를 입력해주세요.' })
  menuId: number;

  @ApiProperty({ description: '수량', example: 2 })
  @IsNumber()
  @IsNotEmpty({ message: 'quantity를 입력해주세요.' })
  quantity: number;

  // @IsOptional()
  // @IsEnum(OrderType)
  // orderType: OrderType = OrderType.PENDING;
}
