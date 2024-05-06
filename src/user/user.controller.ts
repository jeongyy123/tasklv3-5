import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { SignupUserDto } from 'src/dto/signup-user.dto';
import { SigninUserDto } from 'src/dto/signin-user.dto';
import {
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signUp')
  @ApiOperation({ summary: '회원가입' })
  @ApiBody({ type: SignupUserDto })
  @ApiCreatedResponse({ description: '회원가입에 성공했습니다.' })
  @ApiConflictResponse({
    description: '해당 nickname을 가진 유저가 존재합니다.',
  })
  async signUp(@Body() data: SignupUserDto) {
    return await this.userService.signUp(data.nickname, data.password);
  }

  @Post('/signIn')
  @ApiOperation({ summary: '로그인' })
  @ApiBody({ type: SigninUserDto })
  @ApiNotFoundResponse({
    description: '해당 nickname을 가진 유저가 존재하지않습니다.',
  })
  @ApiUnauthorizedResponse({ description: '비밀번호가 맞지않습니다.' })
  async signIn(@Body() data: SigninUserDto) {
    return await this.userService.signIn(data.nickname, data.password);
  }
}
