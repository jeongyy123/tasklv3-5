import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  async use(req: any, res: any, next: Function) {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer')) {
      throw new UnauthorizedException(
        `JWT 토큰이 올바르게 포함되지 않았습니다.`,
      );
    }

    const token = authorization.split(' ')[1]; //토큰 타입 확인하는 부분

    if (!token) {
      throw new UnauthorizedException(`JWT토큰이 존재하지않습니다.`);
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);
      req.user = payload;
      next();
    } catch (err) {
      throw new UnauthorizedException(`해당 ${token}은 유효하지 않습니다.`);
    }
  }
}
