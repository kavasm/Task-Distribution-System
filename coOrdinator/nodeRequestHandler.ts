import { NodeService } from './nodeService';
export class NodeRequestHandler {

  public handleRequest(nodeRequest: any, socket: any): any {
    switch (nodeRequest.payload.method) {
      case 'register':
        return new NodeService().addNode(nodeRequest, socket);
      default:
        return;
    }

  }
}