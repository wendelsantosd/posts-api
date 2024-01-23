import { IPostRepository } from '@modules/post/domain/model/post.repository';
import { IUseCase, Result } from 'types-ddd';

type Request = void;

type Response = string;

export class FlushCachePostUseCase
  implements IUseCase<Request, Result<Response>>
{
  constructor(private readonly postRepository: IPostRepository) {}

  public async execute(): Promise<Result<Response>> {
    const result = await this.postRepository.flushCache();

    if (result.isFail()) return Result.fail(result.error());

    return Result.Ok(result.value());
  }
}
