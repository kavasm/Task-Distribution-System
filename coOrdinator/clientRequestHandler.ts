import { TaskService } from './taskService';
import { ClientService } from './clientService';

export class ClientRequestHandler {

  public handleRequest(clientReq: any, socket: any): any {
    switch (clientReq.payload.method) {
      case 'register':
        return new ClientService().registerClient(clientReq);
      case 'addTask':
        return new TaskService().addTask(clientReq, socket);
      case 'status':
        return new TaskService().getTaskStatus(clientReq, socket);
      case 'result':
        return new TaskService().getTaskResult(clientReq, socket);
      default:
        return;
    }
  }
}