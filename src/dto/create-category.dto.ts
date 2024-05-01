// import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty({ message: 'name을 입력해주세요.' })
  name: string;
}
