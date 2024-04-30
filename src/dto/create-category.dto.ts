import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  name: string;

  @Type(() => Number)
  @IsNumber()
  order: number;
}
