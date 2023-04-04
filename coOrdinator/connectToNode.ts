import net from 'net';
import JSONSerializer from '../communication/serializer/serializer';
import TaskDao from '../dbLayer/dao/taskDao/taskDao';
import { TaskService } from './taskService';

const nodeServer = new net.Socket();

export class NodeConnection {
  public sendRequest(node: any, request: any): any {

    nodeServer.connect({ port: node.NodePort, host: node.NodeIP }, () => {
      console.log('TCP connection established with the node.');
      const taskDetails = new JSONSerializer().serialize(request);
      nodeServer.write(taskDetails);
    });

    nodeServer.on('data', (response: any) => {
      const res = new JSONSerializer().deSerialize(response);
      new TaskService().saveTaskResult(res);
      nodeServer.end();
    });

    nodeServer.on('end', () => {
      console.log('Requested an end to the TCP connection');
    });
  }
}
