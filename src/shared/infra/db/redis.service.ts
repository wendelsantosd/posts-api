import { Injectable } from '@nestjs/common';
import { redis } from '@shared/config/env/redis';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService extends Redis {
  constructor() {
    super({
      host: redis.host,
    });

    super.on('error', (err) => {
      console.log('Error on Redis');
      console.log(err);
      process.exit(1);
    });
  }
}
