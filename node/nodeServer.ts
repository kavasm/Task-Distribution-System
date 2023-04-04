import net from 'net';
import JSONSerializer from '../communication/serializer/serializer';

import { HandleRequest } from './handleRequest';
import { nodeConnection } from '../config/commConfig';
import { HandleTaskRequest } from './handleTaskRequest';

const node = new net.Server();
export class NodeServer {
  public sendRequest(request: any = false): any {

    node.listen(nodeConnection, async () => {
      console.log(`Node server listening for connection requests on socket ${nodeConnection.host}:${nodeConnection.port}`);
    });

    node.on('connection', (socket: any) => {
      console.log('A new connection has been established.');

      // The server can also receive data from the client by reading from its socket.
      socket.on('data', async (chunk: any) => {
        const request = new JSONSerializer().deSerialize(chunk);
        new HandleTaskRequest().handleTaskRequest(request, socket);

      });

      socket.on('end', () => {
        console.log('Closing connection with the coordinator');
      });

      socket.on('error', (err: any) => {
        console.log(`Error: ${err}`);
      });
    })

    new HandleRequest().sendReq(request);
  }
}
