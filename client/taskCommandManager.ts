import TDSRequest from '../communication/tdsRequest';
import { ICommandManager } from "./ICommandManager";
import { FileManager } from './fileManager';

export class TaskCommandManager implements ICommandManager {

  public async getRequest(commandRequest: any): Promise<any> {
    const registerRequest: TDSRequest = new TDSRequest();
    const fileData = await new FileManager().getFileData(commandRequest[3]);
    registerRequest.setType('client Request')
    registerRequest.setMethod(commandRequest[0]);
    registerRequest.addParameter('clientId', commandRequest[1]);
    registerRequest.addParameter('taskName', commandRequest[2]);
    registerRequest.addParameter('fileData', fileData);
    registerRequest.addParameter('taskParameters', commandRequest[4]);
    return registerRequest;
  }
}