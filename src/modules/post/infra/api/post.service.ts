import { MakeCreatePost } from '@modules/post/application/factories/makeCreatePost.factory';
import { Post } from '@modules/post/domain/model/post.aggregate';
import { Injectable } from '@nestjs/common';
import { Result } from 'types-ddd';
import { CreatePostDTO } from './dtos/createPost.dto';

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
}
