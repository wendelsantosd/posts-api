import {
  IPostRepository,
  Posts,
} from '@modules/post/domain/model/post.repository';
import { ListParams } from '@modules/post/infra/api/dtos/listPosts.dto';
import { IUseCase, Result } from 'types-ddd';

type Request = {
  params: ListParams;
};

type Response = Posts;

export class ListPostsUseCase implements IUseCase<Request, Result<Response>> {
  constructor(private readonly postRepository: IPostRepository) {}

  public async execute({ params }: Request): Promise<Result<Response>> {
    const result = await this.postRepository.list(params);

    if (result.isFail()) return Result.fail(result.error());

    return Result.Ok(result.value());
  }
}
