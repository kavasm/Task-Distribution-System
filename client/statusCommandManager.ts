import TDSRequest from '../communication/tdsRequest';
import { ICommandManager } from "./ICommandManager";

export class StatusCommandManager implements ICommandManager {

  public getRequest(commandRequest: any): any {
    const registerRequest: TDSRequest = new TDSRequest();
    registerRequest.setType('client Request')
    registerRequest.setMethod(commandRequest[0]);
    registerRequest.addParameter('taskId', commandRequest[1]);
    return registerRequest;
  }
}