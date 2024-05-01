import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { SignupUserDto } from 'src/dto/signup-user.dto';
import { SignInUserDto } from 'src/dto/signin-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signUp')
  async signUp(@Body() data: SignupUserDto) {
    return await this.userService.signUp(data.nickname, data.password);
  }

  @Post('/signIn')
  async signIn(@Body() data: SignInUserDto) {
    return await this.userService.signIn(data.nickname, data.password);
  }
}
