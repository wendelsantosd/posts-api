import { PostRepository } from '@modules/post/infra/repository/porst.repository';
import { PrismaService } from '@shared/infra/db/prisma.service';
import { CreatePostUseCase } from '../useCases/createPost.useCase';

export class MakeCreatePost {
  private static instance: CreatePostUseCase;

  private constructor() {}

  public static getCreatePostUseCase(): CreatePostUseCase {
    if (!this.instance)
      this.instance = new CreatePostUseCase(
        new PostRepository(new PrismaService()),
      );

    return this.instance;
  }
}
