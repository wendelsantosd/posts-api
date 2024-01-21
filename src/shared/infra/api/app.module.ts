import { UserModule } from '@modules/user/infra/api/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
