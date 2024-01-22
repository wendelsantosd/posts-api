import { User } from '@modules/user/domain/user.aggregate';
import { IUserRepository } from '@modules/user/domain/user.repository';
import { AdapterUserDBOToDomain } from '@modules/user/infra/adapters/user.adapter';
import { CreateUserDTO } from '@modules/user/infra/api/dtos/createUser.dto';
import { IUseCase, Result } from 'types-ddd';

type Request = CreateUserDTO;

type Response = User;

export class CreateUserUseCase implements IUseCase<Request, Result<Response>> {
  constructor(private readonly userRepository: IUserRepository) {}

  public async execute(data: Request): Promise<Result<Response>> {
    const emailAlreadyInUse = await this.userRepository.findByEmail(data.email);

    if (emailAlreadyInUse.isOk()) return Result.fail('E-mail já está em uso.');

    const adaptedUser = new AdapterUserDBOToDomain().build({ ...data });

    if (adaptedUser.isFail()) return Result.fail(adaptedUser.error());

    const hashPassword = await adaptedUser
      .value()
      .generateHashPassword(adaptedUser.value().password);

    if (hashPassword.isFail()) return Result.fail(hashPassword.error());

    const result = await this.userRepository.save(adaptedUser.value());

    if (result.isFail()) return Result.fail(result.error());

    return Result.Ok(result.value());
  }
}
