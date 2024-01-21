import { User } from '@modules/user/domain/user.aggregate';

type UserPresenterResponse = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export class UserPresenter {
  public toPresenter(data: User): UserPresenterResponse {
    return {
      id: data.id.value(),
      name: data.name,
      email: data.email,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }
}
