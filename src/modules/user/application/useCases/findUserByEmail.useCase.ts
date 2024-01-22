import { User } from '@modules/user/domain/user.aggregate';
import { IUserRepository } from '@modules/user/domain/user.repository';
import { IUseCase, Result } from 'types-ddd';

type Request = {
  email: string;
};

type Response = User;

export class FindUserByEmailUseCase
  implements IUseCase<Request, Result<Response>>
{
  constructor(private readonly userRepository: IUserRepository) {}

  public async execute(data: Request): Promise<Result<Response>> {
    const user = await this.userRepository.findByEmail(data.email);

    if (user.isFail()) return Result.fail(user.error());

    return Result.Ok(user.value());
  }
}
