import { Post } from '@modules/post/domain/model/post.aggregate';
import { IPostRepository } from '@modules/post/domain/model/post.repository';
import { AdapterPostDBOToDomain } from '@modules/post/infra/adapters/post.adapter';
import { CreatePostDTO } from '@modules/post/infra/api/dtos/createPost.dto';
import { IUseCase, Result } from 'types-ddd';

type Request = {
  image: string;
  userId: string;
  data: CreatePostDTO;
};

type Response = Post;

export class CreatePostUseCase implements IUseCase<Request, Result<Response>> {
  constructor(private readonly postRepository: IPostRepository) {}

  public async execute({
    data,
    image,
    userId,
  }: Request): Promise<Result<Response>> {
    const adaptedPost = new AdapterPostDBOToDomain().build({
      ...data,
      image,
      userId,
    });

    if (adaptedPost.isFail()) return Result.fail(adaptedPost.error());

    const result = await this.postRepository.save(adaptedPost.value());

    if (result.isFail()) return Result.fail(result.error());

    return Result.Ok(result.value());
  }
}
