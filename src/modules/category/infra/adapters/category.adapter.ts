import { Category } from '@modules/category/domain/model/category.aggregate';
import { categories } from '@prisma/client';
import { IAdapter, ID, IResult, Result } from 'types-ddd';
import { CategoryDBO } from '../repository/category.dbo';

export class AdapterCategoryDBOToDomain
  implements IAdapter<CategoryDBO, Category>
{
  public build(target: CategoryDBO): IResult<Category> {
    const category = Category.create({
      id: ID.create(target.id),
      name: target.name,
      createdAt: target.createdAt,
      updatedAt: target.updatedAt,
    });

    if (category.isFail()) return Result.fail(category.error());

    return Result.Ok(category.value());
  }

  public prepare(categoryDB: categories): CategoryDBO {
    return {
      id: categoryDB.id,
      name: categoryDB.name,
      createdAt: categoryDB.createdAt,
      updatedAt: categoryDB.updatedAt,
    };
  }
}
