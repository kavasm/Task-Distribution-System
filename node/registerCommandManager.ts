import TDSRequest from '../communication/tdsRequest';
import { ICommandManager } from "./ICommandManager";

export class RegisterCommandManager implements ICommandManager {

  public getRequest(commandRequest: any): any {
    const registerRequest: TDSRequest = new TDSRequest();
    registerRequest.setType('Node Request')
    registerRequest.setMethod(commandRequest[0]);
    registerRequest.addParameter('ipAddress', '127.0. 0.1');
    registerRequest.addParameter('nodePort', '3000');
    registerRequest.addParameter('nodeStatus', 'Available');
    registerRequest.addParameter('nodeName', 'Node1')
    return registerRequest;
  }
}