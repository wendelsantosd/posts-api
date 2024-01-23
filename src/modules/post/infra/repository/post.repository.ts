import { Post } from '@modules/post/domain/model/post.aggregate';
import {
  IPostRepository,
  ListAllPostsParams,
  Posts,
} from '@modules/post/domain/model/post.repository';
import { PrismaService } from '@shared/infra/db/prisma.service';
import { Result } from 'types-ddd';
import { AdapterPostDBOToDomain } from '../adapters/post.adapter';
import { PostDBO } from './post.dbo';

export class PostRepository implements IPostRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(post: Post): Promise<Result<Post>> {
    try {
      const adapterPost = new AdapterPostDBOToDomain();

      const data: PostDBO = {
        title: post.title,
        content: post.content,
        image: post.image,
        categoryId: post.categoryId,
        userId: post.userId,
      };

      const postDB = await this.prisma.posts.create({ data });
      const preparedPost = adapterPost.prepare(postDB);
      const buildedPost = adapterPost.build(preparedPost);

      if (buildedPost.isFail()) return Result.fail(buildedPost.error());

      return Result.Ok(buildedPost.value());
    } catch (error) {
      return Result.fail(`Houve um erro ao salvar o post: ${error.message}`);
    }
  }

  async listAll(params: ListAllPostsParams): Promise<Result<Posts>> {
    try {
      const adapterPost = new AdapterPostDBOToDomain();

      const postsDB = await this.prisma.posts.findMany();

      const count = await this.prisma.posts.count();

      const preparedPosts = postsDB.map((post) => adapterPost.prepare(post));

      const buildedPosts = preparedPosts.map((post) => {
        const buildedPost = adapterPost.build(post);

        if (buildedPost.isFail()) return Result.fail(buildedPost.error());

        return buildedPost.value();
      });

      return Result.Ok({
        posts: buildedPosts as Post[],
        metadata: {
          count,
        },
      });
    } catch (error) {
      return Result.fail(
        `Houve um erro ao listar as postagens: ${error.message}`,
      );
    }
  }
}
