import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateMenuDto {
  @ApiProperty({ description: '메뉴 이름', example: '한식' })
  @IsString()
  name: string;

  @ApiProperty({
    description: '메뉴 설명',
    example: '김치없인 못살아 정말 못살아',
  })
  @IsString()
  description: string;

  @ApiProperty({ description: '메뉴 가격', example: 13000 })
  @IsNumber()
  price: number;

  @ApiProperty({ description: '메뉴 사진', example: 'https://image.com' })
  @IsString()
  image: string;
}
