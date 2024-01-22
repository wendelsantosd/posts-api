import { CategoryRepository } from '@modules/category/infra/repository/category.repository';
import { PrismaService } from '@shared/infra/db/prisma.service';
import { CreateCategoryUseCase } from '../useCases/createCategory.useCase';

export class MakeCreateCategory {
  private static instance: CreateCategoryUseCase;

  private constructor() {}

  public static getCreateCategoryUseCase(): CreateCategoryUseCase {
    if (!this.instance)
      this.instance = new CreateCategoryUseCase(
        new CategoryRepository(new PrismaService()),
      );

    return this.instance;
  }
}
