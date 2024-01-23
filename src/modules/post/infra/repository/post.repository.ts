import { Post } from '@modules/post/domain/model/post.aggregate';
import {
  IPostRepository,
  ListPostsParams,
  Posts,
} from '@modules/post/domain/model/post.repository';
import { posts } from '@prisma/client';
import { redis } from '@shared/config/env/redis';
import { PrismaService } from '@shared/infra/db/prisma.service';
import { RedisService } from '@shared/infra/db/redis.service';
import { Result } from 'types-ddd';
import { AdapterPostDBOToDomain } from '../adapters/post.adapter';
import { PostDBO } from './post.dbo';

export class PostRepository implements IPostRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
  ) {}

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

  async list(params: ListPostsParams): Promise<Result<Posts>> {
    try {
      let postsDB: posts[];
      let cachedPostsDB: string;

      const take = params.take ? +params.take : 10;
      const skip = params.skip ? +params.skip : 0;

      const adapterPost = new AdapterPostDBOToDomain();

      if (!params.categoryId && !params.userId) {
        const key = `posts_take${take}_skip${skip}`;

        cachedPostsDB = await this.redis.get(key);

        if (!cachedPostsDB) {
          postsDB = await this.prisma.posts.findMany({
            where: {
              categoryId: params.categoryId,
              userId: params.userId,
            },
            skip,
            take,
          });

          await this.redis.set(
            key,
            JSON.stringify(postsDB),
            'EX',
            redis.cacheTTL,
          );
        } else {
          postsDB = JSON.parse(cachedPostsDB);
        }
      } else if (params.categoryId && params.userId) {
        const key = `posts_categoryId_userId_take${take}_skip${skip}`;

        cachedPostsDB = await this.redis.get(key);

        if (!cachedPostsDB) {
          postsDB = await this.prisma.posts.findMany({
            where: {
              categoryId: params.categoryId,
              userId: params.userId,
            },
            skip,
            take,
          });

          await this.redis.set(
            key,
            JSON.stringify(postsDB),
            'EX',
            redis.cacheTTL,
          );
        } else {
          postsDB = JSON.parse(cachedPostsDB);
        }
      } else if (params.categoryId) {
        const key = `posts_categoryId_take${take}_skip${skip}`;

        cachedPostsDB = await this.redis.get(key);

        if (!cachedPostsDB) {
          postsDB = await this.prisma.posts.findMany({
            where: {
              categoryId: params.categoryId,
            },
            skip,
            take,
          });

          await this.redis.set(
            key,
            JSON.stringify(postsDB),
            'EX',
            redis.cacheTTL,
          );
        } else {
          postsDB = JSON.parse(cachedPostsDB);
        }
      } else if (params.userId) {
        const key = `posts_userId_take${take}_skip${skip}`;

        cachedPostsDB = await this.redis.get(key);

        if (!cachedPostsDB) {
          postsDB = await this.prisma.posts.findMany({
            where: {
              userId: params.userId,
            },
            skip,
            take,
          });

          await this.redis.set(
            key,
            JSON.stringify(postsDB),
            'EX',
            redis.cacheTTL,
          );
        } else {
          postsDB = JSON.parse(cachedPostsDB);
        }
      }

      const preparedPosts = postsDB.map((post) => adapterPost.prepare(post));

      const buildedPosts = preparedPosts.map((post) => {
        const buildedPost = adapterPost.build(post);

        if (buildedPost.isFail()) return Result.fail(buildedPost.error());

        return buildedPost.value();
      });

      return Result.Ok({
        posts: buildedPosts as Post[],
        metadata: {
          count: postsDB.length,
        },
      });
    } catch (error) {
      return Result.fail(
        `Houve um erro ao listar as postagens: ${error.message}`,
      );
    }
  }

  async flushCache(): Promise<Result<string>> {
    try {
      await this.redis.flushdb();

      return Result.Ok('O cache foi liberado.');
    } catch (error) {
      return Result.fail(`Houve um erro ao liberar o cache: ${error.message}`);
    }
  }
}
