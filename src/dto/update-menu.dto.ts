import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { MenuStatus } from 'src/menu/menu-status.enum';

export class UpdateMenuDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsNumber()
  menuOrder: number;

  @IsEnum(MenuStatus)
  @IsString()
  @Transform(({ value }) => value.toUpperCase())
  @IsNotEmpty({ message: 'menyStatus을 작성해주세요.' })
  status: MenuStatus;
}
