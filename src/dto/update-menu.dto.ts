import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { MenuStatus } from 'src/menu/menu-status.enum';
import { CreateMenuDto } from './create-menu.dto';

export class UpdateMenuDto extends PartialType(CreateMenuDto) {
  @ApiProperty({ description: '메뉴 순서', example: '3' })
  @IsNumber()
  menuOrder: number;

  @ApiProperty({
    description: '메뉴 상태',
    examples: ['FOR_SALE', 'SOLD_OUT'],
  })
  @IsEnum(MenuStatus)
  @IsString()
  @Transform(({ value }) => value.toUpperCase())
  @IsNotEmpty({ message: 'menyStatus을 작성해주세요.' })
  status: MenuStatus;
}
