import { ICommandManager } from './ICommandManager';
import { RegisterCommandManager } from './registerCommandManager';

export class CommandManagerFactory {

  static getCommandManager(method: string): ICommandManager {
    return new RegisterCommandManager();
  }
}