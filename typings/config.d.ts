import { default as IAppConfig } from '../config/IConfig';

declare module 'config' {
  interface IConfig {
    get<K extends keyof IAppConfig>(setting: K): IAppConfig[K];
  }
}
