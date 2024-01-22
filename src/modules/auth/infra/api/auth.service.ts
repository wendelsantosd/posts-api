import { User } from '@modules/user/domain/user.aggregate';
import { UserService } from '@modules/user/infra/api/user.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import EncryptationProvider from '@shared/providers/encryptation/model/encryptation-provider.abstract';
import { Result } from 'types-ddd';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly encryptation: EncryptationProvider,
    private readonly jwtService: JwtService,
  ) {}

  login(user: User): Result<string> {
    const payload = { sub: user.id.value(), email: user.email };

    const token = this.jwtService.sign(payload);

    if (!token) Result.fail('Ocorreu um erro ao fazer login.');

    return Result.Ok(token);
  }

  async validateUser(email: string, password: string): Promise<Result<User>> {
    const user = await this.userService.findByEmail(email);

    if (user.isFail()) return Result.fail('E-mail e/ou senha são inválidos.');

    const isPasswordValid = await this.encryptation.compareHash(
      password,
      user.value().password,
    );

    if (!isPasswordValid)
      return Result.fail('E-mail e/ou senha são inválidos.');

    return user;
  }
}
