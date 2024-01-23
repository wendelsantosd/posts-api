import { PostRepository } from '@modules/post/infra/repository/post.repository';
import { PrismaService } from '@shared/infra/db/prisma.service';
import { RedisService } from '@shared/infra/db/redis.service';
import { FlushCachePostUseCase } from '../useCases/flushCachePost.useCase';

export class MakeFlushCachePost {
  private static instance: FlushCachePostUseCase;

  private constructor() {}

  public static getFlushCachePostUseCase(): FlushCachePostUseCase {
    if (!this.instance)
      this.instance = new FlushCachePostUseCase(
        new PostRepository(new PrismaService(), new RedisService()),
      );

    return this.instance;
  }
}
