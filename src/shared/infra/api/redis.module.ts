import { Global, Module } from '@nestjs/common';
import { RedisService } from '../db/redis.service';

@Global()
@Module({
  imports: [],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
