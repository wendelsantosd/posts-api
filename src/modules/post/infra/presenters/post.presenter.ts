import { Post } from '@modules/post/domain/model/post.aggregate';

type PostPresenterResponse = {
  id: string;
  title: string;
  content: string;
  categoryId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

export class PostPresenter {
  public toPresenter(data: Post): PostPresenterResponse {
    return {
      id: data.id.value(),
      title: data.title,
      content: data.content,
      categoryId: data.categoryId,
      userId: data.userId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }
}
