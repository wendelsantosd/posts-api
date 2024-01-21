import { Result } from 'types-ddd';
import { User } from './user.aggregate';

export interface IUserRepository {
  save(user: User): Promise<Result<User>>;
  findByEmail(email: string): Promise<Result<User>>;
}
