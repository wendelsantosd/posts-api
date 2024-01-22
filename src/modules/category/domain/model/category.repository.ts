import { Result } from 'types-ddd';
import { Category } from './category.aggregate';

export interface ICategoryRepository {
  save(category: Category): Promise<Result<Category>>;
  findByName(name: string): Promise<Result<Category>>;
}
