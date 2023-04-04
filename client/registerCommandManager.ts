import TDSRequest from '../communication/tdsRequest';
import { ICommandManager } from "./ICommandManager";

export class RegisterCommandManager implements ICommandManager {

  public getRequest(commandRequest: any): any {
    const registerRequest: TDSRequest = new TDSRequest();
    registerRequest.setType('client Request')
    registerRequest.setMethod(commandRequest[0]);
    registerRequest.addParameter('hostName', commandRequest[1]);
    registerRequest.addParameter('userName', commandRequest[2]);
    registerRequest.addParameter('ipAddress', commandRequest[3]);
    return registerRequest;
  }
}