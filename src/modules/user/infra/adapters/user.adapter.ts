import { User } from '@modules/user/domain/user.aggregate';
import { users } from '@prisma/client';
import { IAdapter, ID, IResult, Result } from 'types-ddd';
import { UserDBO } from '../repository/user.dbo';

export class AdapterUserDBOToDomain implements IAdapter<UserDBO, User> {
  public build(target: UserDBO): IResult<User> {
    const user = User.create({
      id: ID.create(target.id),
      name: target.name,
      email: target.email,
      password: target.password,
      createdAt: target.createdAt,
      updatedAt: target.updatedAt,
    });

    if (user.isFail()) return Result.fail(user.error());

    return Result.Ok(user.value());
  }

  public prepare(userDB: users): UserDBO {
    return {
      id: userDB.id,
      name: userDB.name,
      email: userDB.email,
      password: userDB.password,
      createdAt: userDB.createdAt,
      updatedAt: userDB.updatedAt,
    };
  }
}
