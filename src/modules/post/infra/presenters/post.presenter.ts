import { Post } from '@modules/post/domain/model/post.aggregate';
import { Posts } from '@modules/post/domain/model/post.repository';

type PostPresenterResponse = {
  id: string;
  title: string;
  content: string;
  categoryId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

type PostsPresenterResponse = {
  posts: PostPresenterResponse[];
  metadata: {
    count: number;
  };
};
export class PostPresenter {
  public toPresenter(post: Post): PostPresenterResponse {
    return {
      id: post.id.value(),
      title: post.title,
      content: post.content,
      categoryId: post.categoryId,
      userId: post.userId,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };
  }
}

export class PostsPresenter {
  public toPresenter(data: Posts): PostsPresenterResponse {
    const posts: PostPresenterResponse[] = data.posts.map((post) => ({
      id: post.id.value(),
      title: post.title,
      content: post.content,
      categoryId: post.categoryId,
      userId: post.userId,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    }));

    return {
      posts: posts,
      metadata: { count: data.metadata.count },
    };
  }
}
