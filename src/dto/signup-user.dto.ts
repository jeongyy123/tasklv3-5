import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class SignupUserDto {
  @ApiProperty({ description: '닉네임', example: 'abcd' })
  @IsNotEmpty()
  @IsString()
  @Length(3, 15)
  @Matches(/^[a-zA-Z0-9]+$/, {
    message: '닉네임은 알파벳 대소문자와 숫자로만 이루어져야합니다.',
  })
  nickname: string;

  @ApiProperty({ description: '비밀번호', example: 'efgh1234' })
  @IsNotEmpty()
  @IsString()
  @Length(8, 20)
  @Matches(/^(?!.*(?:abc|def).*$)/, {
    message: '비밀번호에 닉네임을 포함할 수 없습니다.',
  })
  password: string;
}
