import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { jwt } from '@shared/config/env/jwt';
import { ExtractJwt, Strategy } from 'passport-jwt';

type PayloadProps = {
  sub: string;
  email: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwt.secretKey,
    });
  }

  async validate(payload: PayloadProps) {
    return { id: payload.sub, email: payload.email };
  }
}
