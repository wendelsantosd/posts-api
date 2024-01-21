import { UserRepository } from '@modules/user/infra/repository/user.repository';
import { PrismaService } from '@shared/infra/db/prisma.service';
import { CreateUserUseCase } from '../useCases/createUser.useCase';

export class MakeCreateUser {
  private static instance: CreateUserUseCase;

  private constructor() {}

  public static getCreateUserUseCase(): CreateUserUseCase {
    if (!this.instance)
      this.instance = new CreateUserUseCase(
        new UserRepository(new PrismaService()),
      );

    return this.instance;
  }
}
