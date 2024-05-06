import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ description: '카테고리 이름', example: '한식' })
  @IsString()
  @IsNotEmpty({ message: 'name을 입력해주세요.' })
  name: string;
}
