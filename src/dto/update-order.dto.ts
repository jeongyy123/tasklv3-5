import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { OrderType } from 'src/order/order-type.enum';

export class UpdateOrderDto {
  @ApiProperty({
    description: '주문 상태',
    examples: ['PENDING', 'ACCEPTED', 'CANCLED'],
  })
  @IsEnum(OrderType)
  @IsString()
  @Transform(({ value }) => value.toUpperCase())
  @IsNotEmpty({ message: 'orderType을 작성해주세요.' })
  orderType: OrderType;
}
