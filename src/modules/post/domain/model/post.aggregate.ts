import { Aggregate, Result, UID } from 'types-ddd';

type PostProps = {
  id?: UID;
  title: string;
  content: string;
  image: string;
  userId: string;
  categoryId: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Post extends Aggregate<PostProps> {
  constructor(props: PostProps) {
    super(props);
  }

  get title(): string {
    return this.props.title;
  }

  get content(): string {
    return this.props.content;
  }

  get image(): string {
    return this.props.image;
  }

  get userId(): string {
    return this.props.userId;
  }

  get categoryId(): string {
    return this.props.categoryId;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  private static isValid({
    title,
    content,
    image,
    userId,
    categoryId,
  }: PostProps): Result<void> {
    const { string } = this.validator;

    if (string(title).isEmpty())
      return Result.fail('O título não pode ser vazio.');

    if (string(content).isEmpty())
      return Result.fail('O conteúdo não pode ser vazio.');

    if (string(image).isEmpty())
      return Result.fail('O envio de uma imagem é obrigatório.');

    if (string(userId).isEmpty())
      return Result.fail('A postagem precisa estar vinculada a um usuário.');

    if (string(categoryId).isEmpty())
      return Result.fail('A postagem precisa estar vinculada a uma categoria.');

    return Result.Ok();
  }

  public static create(props: PostProps): Result<Post> {
    const isValid = Post.isValid(props);

    if (isValid.isFail()) return Result.fail(isValid.error());

    return Result.Ok(new Post(props));
  }
}
