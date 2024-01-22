import { Aggregate, Result, UID } from 'types-ddd';

type CategoryProps = {
  id?: UID;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Category extends Aggregate<CategoryProps> {
  constructor(props: CategoryProps) {
    super(props);
  }

  get name(): string {
    return this.props.name;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  private static isValid({ name }: CategoryProps): Result<void> {
    const { string } = this.validator;

    if (string(name).isEmpty())
      return Result.fail(`O nome do usuário não pode ser vazio.`);

    return Result.Ok();
  }

  public static create(props: CategoryProps): Result<Category> {
    const isValid = Category.isValid(props);

    if (isValid.isFail()) return Result.fail(isValid.error());

    return Result.Ok(new Category(props));
  }
}
