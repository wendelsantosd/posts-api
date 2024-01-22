import { Result } from 'types-ddd';
import { Post } from './post.aggregate';

export type Posts = {
  posts: Post[];
  metadata: {
    count: number;
  };
};

export type ListAllPostsParams = {
  skip?: number;
  take?: number;
  categoryId?: string;
  userId?: string;
};

export interface IPostRepository {
  save(post: Post): Promise<Result<Post>>;
  listAll(params: ListAllPostsParams): Promise<Result<Posts>>;
}
