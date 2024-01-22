import { Category } from '@modules/category/domain/model/category.aggregate';

type CategoryPresenterResponse = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export class CategoryPresenter {
  public toPresenter(data: Category): CategoryPresenterResponse {
    return {
      id: data.id.value(),
      name: data.name,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }
}
