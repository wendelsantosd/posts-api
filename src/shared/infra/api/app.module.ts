import { AuthModule } from '@modules/auth/infra/api/auth.module';
import { UserModule } from '@modules/user/infra/api/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule, UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
