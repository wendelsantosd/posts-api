import { Result } from 'types-ddd';
import { Post } from './post.aggregate';

export type Posts = {
  posts: Post[];
  metadata: {
    count: number;
  };
};

export type ListPostsParams = {
  skip?: number;
  take?: number;
  categoryId?: string;
  userId?: string;
};

export interface IPostRepository {
  save(post: Post): Promise<Result<Post>>;
  list(params: ListPostsParams): Promise<Result<Posts>>;
  flushCache(): Promise<Result<string>>;
}
