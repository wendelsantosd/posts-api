import { hash, compare } from 'bcrypt';
import { IEncryptationProvider } from '../model/encryptation-provider';

class BCryptProvider implements IEncryptationProvider {
  public async generateHash(data: string | Buffer): Promise<string> {
    return hash(data, 8);
  }

  public async compareHash(
    data: string | Buffer,
    hashed: string,
  ): Promise<boolean> {
    return compare(data, hashed);
  }
}

export default BCryptProvider;
