import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserType } from './user-type.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  /* 회원가입 */
  async signUp(nickname: string, password: string) {
    const existUser = await this.getUserInfo(nickname);

    if (existUser) {
      throw new ConflictException(`해당 nickname을 가진 유저가 존재합니다`);
    }

    const insertResult = await this.userRepository.insert({
      nickname,
      password,
      userType: UserType.CUSTOMER,
    });

    const payload = {
      id: insertResult.identifiers[0].id,
      userType: insertResult['userType'],
    };
    const accessToken = await this.jwtService.signAsync(payload);
    return { message: '회원가입에 성공했습니다.' };
  }

  /* 로그인 */
  async signIn(nickname: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { nickname, deletedAt: null },
    });

    if (!user) {
      throw new NotFoundException(
        `해당 ${nickname}를 가진 유저가 존재하지않습니다.`,
      );
    }

    if (user.password !== password) {
      throw new UnauthorizedException(`비밀번호가 맞지않습니다.`);
    }

    const payload = { id: user.userId, userType: user.userType };
    console.log('payload', payload);
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken: `Bearer ${accessToken}` };
  }

  /* 유저정보 조회 */
  async getUserInfo(nickname: string) {
    return await this.userRepository.findOne({
      where: { nickname, deletedAt: null },
      select: ['nickname'],
    });
  }
}
