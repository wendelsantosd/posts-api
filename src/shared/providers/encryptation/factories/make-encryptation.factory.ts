import BCryptProvider from '../implementations/bcrypt';
import { IEncryptationProvider } from '../model/encryptation-provider';

export class MakeEncryptationProvider {
  private static provider: IEncryptationProvider;

  public static getProvider(): IEncryptationProvider {
    if (!this.provider) {
      this.provider = new BCryptProvider();
    }

    return this.provider;
  }
}
