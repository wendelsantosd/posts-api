import { User } from '@modules/user/domain/user.aggregate';
import { IUserRepository } from '@modules/user/domain/user.repository';
import { PrismaService } from '@shared/infra/db/prisma.service';
import { Result } from 'types-ddd';
import { AdapterUserDBOToDomain } from '../adapters/user.adapter';
import { UserDBO } from './user.dbo';

export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<Result<User>> {
    try {
      const adapterUser = new AdapterUserDBOToDomain();

      const userDB = await this.prisma.users.findUnique({
        where: { email },
      });

      if (!userDB)
        return Result.fail('Não existe usuário com o e-mail informado.');

      const preparedUser = adapterUser.prepare(userDB);
      const buildedUser = adapterUser.build(preparedUser);

      if (buildedUser.isFail()) return Result.fail(buildedUser.error());

      return Result.Ok(buildedUser.value());
    } catch (error) {
      return Result.fail(
        `Houve um erro ao procurar usuário por e-mail: ${error.message}`,
      );
    }
  }
  async save(user: User): Promise<Result<User>> {
    try {
      const adapterUser = new AdapterUserDBOToDomain();

      const data: UserDBO = {
        name: user.name,
        email: user.email,
        password: user.password,
      };

      const userDB = await this.prisma.users.create({ data });
      const preparedUser = adapterUser.prepare(userDB);
      const buildedUser = adapterUser.build(preparedUser);

      if (buildedUser.isFail()) return Result.fail(buildedUser.error());

      return Result.Ok(buildedUser.value());
    } catch (error) {
      return Result.fail(`Houve um erro ao salvar o usuário: ${error.message}`);
    }
  }
}
