import { IEncryptationProvider } from './encryptation-provider';

abstract class EncryptationProvider implements IEncryptationProvider {
  abstract generateHash(data: string | Buffer): Promise<string>;
  abstract compareHash(data: string | Buffer, hashed: string): Promise<boolean>;
}

export default EncryptationProvider;
