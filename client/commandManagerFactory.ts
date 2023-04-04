import { ICommandManager } from './ICommandManager';
import { RegisterCommandManager } from './registerCommandManager';
import { TaskCommandManager } from './taskCommandManager';
import { StatusCommandManager } from './statusCommandManager';
import { ResultCommandManager } from './resultCommandManager';
import { InvalidCommandManager } from './invalidCommandManager';

export class CommandManagerFactory {

  static getCommandManager(method: string): ICommandManager {
    switch (method) {
      case 'register':
        return new RegisterCommandManager();
      case 'addTask':
        return new TaskCommandManager();
      case 'status':
        return new StatusCommandManager();
      case 'result':
        return new ResultCommandManager();
      default:
        return new InvalidCommandManager();
    }
  }
}