import { PostRepository } from '@modules/post/infra/repository/post.repository';
import { PrismaService } from '@shared/infra/db/prisma.service';
import { ListAllPostsUseCase } from '../useCases/listAllPosts.useCase';

export class MakeListAllPosts {
  private static instance: ListAllPostsUseCase;

  private constructor() {}

  public static getListAllPostsUseCase(): ListAllPostsUseCase {
    if (!this.instance)
      this.instance = new ListAllPostsUseCase(
        new PostRepository(new PrismaService()),
      );

    return this.instance;
  }
}
