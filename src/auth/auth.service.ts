import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateJwt(userId: number) {
    const payload = { userId };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
