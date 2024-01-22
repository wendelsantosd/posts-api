import { MakeCreateCategory } from '@modules/category/application/factories/makeCreateCategory.factory';
import { Category } from '@modules/category/domain/model/category.aggregate';
import { Injectable } from '@nestjs/common';
import { Result } from 'types-ddd';
import { CreateCategoryDTO } from './dtos/createCategory.dto';

@Injectable()
export class CategoryService {
  async create(data: CreateCategoryDTO): Promise<Result<Category>> {
    const makeCreateCategory = MakeCreateCategory.getCreateCategoryUseCase();

    const user = await makeCreateCategory.execute(data);

    if (user.isFail()) return Result.fail(user.error());

    return user;
  }
}
