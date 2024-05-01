import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { UserType } from 'src/user/user-type.enum';

export class SignupUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 15)
  @Matches(/^[a-zA-Z0-9]+$/, {
    message: '닉네임은 알파벳 대소문자와 숫자로만 이루어져야합니다.',
  })
  nickname: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 20)
  @Matches(/^(?!.*(?:abc|def).*$)/, {
    message: '비밀번호에 닉네임을 포함할 수 없습니다.',
  })
  password: string;

  @IsOptional()
  @IsEnum(UserType)
  userType: UserType = UserType.CUSTOMER;
}
