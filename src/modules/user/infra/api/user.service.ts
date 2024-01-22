import { MakeCreateUser } from '@modules/user/application/factories/makeCreateUser.factory';
import { MakeFindUserByEmail } from '@modules/user/application/factories/makeFindUserByEmail.factory';
import { User } from '@modules/user/domain/user.aggregate';
import { Injectable } from '@nestjs/common';
import { Result } from 'types-ddd';
import { createUserDTO } from './dtos/createUser.dto';

@Injectable()
export class UserService {
  async create(data: createUserDTO): Promise<Result<User>> {
    const makeCreateUser = MakeCreateUser.getCreateUserUseCase();

    const user = await makeCreateUser.execute(data);

    if (user.isFail()) return Result.fail(user.error());

    return user;
  }

  async findByEmail(email: string): Promise<Result<User>> {
    const makeFindUserByEmail = MakeFindUserByEmail.getFindUserByEmailUseCase();

    const user = await makeFindUserByEmail.execute({ email });

    if (user.isFail()) return Result.fail(user.error());

    return user;
  }
}
