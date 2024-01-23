import { AuthModule } from '@modules/auth/infra/api/auth.module';
import { CategoryModule } from '@modules/category/infra/api/category.module';
import { PostModule } from '@modules/post/infra/api/post.module';
import { UserModule } from '@modules/user/infra/api/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PrismaModule } from './prisma.module';
import { RedisModule } from './redis.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', '..', '..', 'uploads'),
    }),
    PrismaModule,
    UserModule,
    AuthModule,
    CategoryModule,
    PostModule,
    RedisModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
