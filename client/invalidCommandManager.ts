import { ICommandManager } from "./ICommandManager";


export class InvalidCommandManager implements ICommandManager {

  public getRequest(commandRequest: any): any {
    return false;
  }
}