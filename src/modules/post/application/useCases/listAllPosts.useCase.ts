import {
  IPostRepository,
  Posts,
} from '@modules/post/domain/model/post.repository';
import { IUseCase, Result } from 'types-ddd';

type Request = void;

type Response = Posts;

export class ListAllPostsUseCase
  implements IUseCase<Request, Result<Response>>
{
  constructor(private readonly postRepository: IPostRepository) {}

  public async execute(): Promise<Result<Response>> {
    const result = await this.postRepository.listAll({});

    if (result.isFail()) return Result.fail(result.error());

    return Result.Ok(result.value());
  }
}
