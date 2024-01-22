import { Category } from '@modules/category/domain/model/category.aggregate';
import { ICategoryRepository } from '@modules/category/domain/model/category.repository';
import { AdapterCategoryDBOToDomain } from '@modules/category/infra/adapters/category.adapter';
import { IUseCase, Result } from 'types-ddd';

type Request = {
  name: string;
};

type Response = Category;

export class CreateCategoryUseCase
  implements IUseCase<Request, Result<Response>>
{
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  public async execute(data: Request): Promise<Result<Response>> {
    const nameAlreadyInUse = await this.categoryRepository.findByName(
      data.name,
    );

    if (nameAlreadyInUse.isOk()) return Result.fail('Categoria já existe.');

    const adaptedCategory = new AdapterCategoryDBOToDomain().build({ ...data });

    if (adaptedCategory.isFail()) return Result.fail(adaptedCategory.error());

    const result = await this.categoryRepository.save(adaptedCategory.value());

    if (result.isFail()) return Result.fail(result.error());

    return Result.Ok(result.value());
  }
}
