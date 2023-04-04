import NodeDao from '../dbLayer/dao/nodeDao/nodeDao';
import TDSResponse from '../communication/tdsResponse';

import { SetResponse } from './setResponseModel';
import { SetError } from './setErrorModel'
import { nodeSuccessMsg, nodeErrMsg } from '../config/nodeMsgConfig'

export class NodeService {

  public async addNode(nodeReq: any, socket: any): Promise<any> {
    try {
      let nodeRes = await NodeDao.addNode(nodeReq.payload);
      const response: TDSResponse = new TDSResponse();
      response.setValue('nodeId', nodeRes[0].NodeId);
      nodeRes = await new SetResponse().setResponseModel(response, nodeSuccessMsg.register)
      socket.write(nodeRes)
    }
    catch (err) {
      const response: TDSResponse = new TDSResponse();
      const error = await new SetError().setErrorModel(response, nodeErrMsg.register)
      socket.write(error)
    }
  }

  public addCapability() {
  }

}