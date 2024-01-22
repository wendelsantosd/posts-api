import { Post } from '@modules/post/domain/model/post.aggregate';
import { posts } from '@prisma/client';
import { IAdapter, ID, IResult, Result } from 'types-ddd';
import { PostDBO } from '../repository/post.dbo';

export class AdapterPostDBOToDomain implements IAdapter<PostDBO, Post> {
  public build(target: PostDBO): IResult<Post> {
    const post = Post.create({
      id: ID.create(target.id),
      title: target.title,
      content: target.content,
      image: target.image,
      categoryId: target.categoryId,
      userId: target.userId,
      createdAt: target.createdAt,
      updatedAt: target.updatedAt,
    });

    if (post.isFail()) return Result.fail(post.error());

    return Result.Ok(post.value());
  }

  public prepare(postDB: posts): PostDBO {
    return {
      id: postDB.id,
      title: postDB.title,
      content: postDB.content,
      image: postDB.image,
      categoryId: postDB.categoryId,
      userId: postDB.userId,
      createdAt: postDB.createdAt,
      updatedAt: postDB.updatedAt,
    };
  }
}
