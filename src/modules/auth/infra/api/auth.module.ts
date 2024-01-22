import { UserModule } from '@modules/user/infra/api/user.module';
import { UserService } from '@modules/user/infra/api/user.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import BCryptProvider from '@shared/providers/encryptation/implementations/bcrypt';
import EncryptationProvider from '@shared/providers/encryptation/model/encryptation-provider.abstract';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/strategy.jwt';
import { LocalStrategy } from './strategies/strategy.local';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      privateKey: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    LocalStrategy,
    JwtStrategy,
    { provide: EncryptationProvider, useClass: BCryptProvider },
  ],
})
export class AuthModule {}
