import { UserRepository } from '@modules/user/infra/repository/user.repository';
import { PrismaService } from '@shared/infra/db/prisma.service';
import { FindUserByEmailUseCase } from '../useCases/findUserByEmail.useCase';

export class MakeFindUserByEmail {
  private static instance: FindUserByEmailUseCase;

  private constructor() {}

  public static getFindUserByEmailUseCase(): FindUserByEmailUseCase {
    if (!this.instance)
      this.instance = new FindUserByEmailUseCase(
        new UserRepository(new PrismaService()),
      );

    return this.instance;
  }
}
