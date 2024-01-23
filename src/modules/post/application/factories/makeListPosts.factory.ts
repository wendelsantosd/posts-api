import { PostRepository } from '@modules/post/infra/repository/post.repository';
import { PrismaService } from '@shared/infra/db/prisma.service';
import { RedisService } from '@shared/infra/db/redis.service';
import { ListPostsUseCase } from '../useCases/listPosts.useCase';

export class MakeListPosts {
  private static instance: ListPostsUseCase;

  private constructor() {}

  public static getListPostsUseCase(): ListPostsUseCase {
    if (!this.instance)
      this.instance = new ListPostsUseCase(
        new PostRepository(new PrismaService(), new RedisService()),
      );

    return this.instance;
  }
}
