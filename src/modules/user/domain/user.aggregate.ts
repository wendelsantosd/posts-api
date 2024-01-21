import {
  StrengthPassword,
  strengthPasswordCheck,
} from '@shared/helpers/passwordStrength.helper';
import { MakeEncryptationProvider } from '@shared/providers/encryptation/factories/make-encryptation.factory';
import { IEncryptationProvider } from '@shared/providers/encryptation/model/encryptation-provider';
import { Aggregate, Result, UID } from 'types-ddd';

type UserProps = {
  id?: UID;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class User extends Aggregate<UserProps> {
  private encryptation: IEncryptationProvider;

  constructor(props: UserProps) {
    super(props);
    this.encryptation = MakeEncryptationProvider.getProvider();
  }

  get name(): string {
    return this.props.name;
  }

  get email(): string {
    return this.props.email;
  }

  get password(): string {
    return this.props.password;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  private static isValid({ name, email, password }: UserProps): Result<void> {
    const { string } = this.validator;

    if (string(name).isEmpty())
      return Result.fail(`O nome do usuário não pode ser vazio.`);

    if (string(email).isEmpty())
      return Result.fail(`O email do usuário não pode ser vazio.`);

    if (!string(email).match(new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}')))
      return Result.fail(`O email do usuário deve ter formato válido.`);

    if (password && string(password).hasLengthLessOrEqualTo(5))
      return Result.fail(`A senha deve conter 6 ou mais caracteres.`);

    if (strengthPasswordCheck(password) === StrengthPassword.weak)
      return Result.fail('A senha é muito fraca');

    return Result.Ok();
  }

  public async generateHashPassword(password: string): Promise<Result<void>> {
    try {
      const hashPassword = await this.encryptation.generateHash(password);

      this.change('password', hashPassword);

      return Result.Ok();
    } catch {
      return Result.fail('Ocorreu um erro ao criptografar a senha.');
    }
  }

  public static create(props: UserProps): Result<User> {
    const isValid = User.isValid(props);

    if (isValid.isFail()) return Result.fail(isValid.error());

    return Result.Ok(new User(props));
  }
}
