import { MakeCreatePost } from '@modules/post/application/factories/makeCreatePost.factory';
import { MakeListPosts } from '@modules/post/application/factories/makeListPosts.factory';
import { Post } from '@modules/post/domain/model/post.aggregate';
import { Posts } from '@modules/post/domain/model/post.repository';
import { Injectable } from '@nestjs/common';
import { Result } from 'types-ddd';
import { CreatePostDTO } from './dtos/createPost.dto';
import { ListParams } from './dtos/listPosts.dto';

@Injectable()
export class PostService {
  async create(
    data: CreatePostDTO,
    image: string,
    userId: string,
  ): Promise<Result<Post>> {
    const makeCreatePost = MakeCreatePost.getCreatePostUseCase();

    const user = await makeCreatePost.execute({ data, image, userId });

    if (user.isFail()) return Result.fail(user.error());

    return user;
  }

  async list(params: ListParams): Promise<Result<Posts>> {
    const makeListAllPosts = MakeListPosts.getListPostsUseCase();

    const posts = await makeListAllPosts.execute({ params });

    if (posts.isFail()) return Result.fail(posts.error());

    return posts;
  }
}
