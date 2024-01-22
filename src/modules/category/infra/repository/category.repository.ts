import { Category } from '@modules/category/domain/model/category.aggregate';
import { ICategoryRepository } from '@modules/category/domain/model/category.repository';
import { PrismaService } from '@shared/infra/db/prisma.service';
import { Result } from 'types-ddd';
import { AdapterCategoryDBOToDomain } from '../adapters/category.adapter';
import { CategoryDBO } from './category.dbo';

export class CategoryRepository implements ICategoryRepository {
  constructor(private readonly prisma: PrismaService) {}
  async save(category: Category): Promise<Result<Category>> {
    try {
      const adapterCategory = new AdapterCategoryDBOToDomain();

      const data: CategoryDBO = {
        name: category.name,
      };

      const categoryDB = await this.prisma.categories.create({ data });
      const preparedCategory = adapterCategory.prepare(categoryDB);
      const buildedCategory = adapterCategory.build(preparedCategory);

      if (buildedCategory.isFail()) return Result.fail(buildedCategory.error());

      return Result.Ok(buildedCategory.value());
    } catch (error) {
      return Result.fail(
        `Houve um erro ao salvar a categoria: ${error.message}`,
      );
    }
  }

  async findByName(name: string): Promise<Result<Category>> {
    try {
      const adapterCategory = new AdapterCategoryDBOToDomain();

      const categoryDB = await this.prisma.categories.findUnique({
        where: { name },
      });

      if (!categoryDB) return Result.fail('Essa categoria não existe.');

      const preparedCategory = adapterCategory.prepare(categoryDB);
      const buildedCategory = adapterCategory.build(preparedCategory);

      if (buildedCategory.isFail()) return Result.fail(buildedCategory.error());

      return Result.Ok(buildedCategory.value());
    } catch (error) {
      return Result.fail(
        `Houve um erro ao procurar a categoria: ${error.message}`,
      );
    }
  }
}
