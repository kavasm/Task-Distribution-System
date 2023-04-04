import net from 'net';
import JSONSerializer from '../communication/serializer/serializer';
import { HandleResponse } from './handleResponse';

import { connectionConfig } from '../config/commConfig';

const nodeClient = new net.Socket();

export class HandleRequest {
  public sendReq(request: any): any {
    // Send a connection request to the server.
    nodeClient.connect(connectionConfig, () => {
      console.log('TCP connection established with the coordinator server.');
      request = new JSONSerializer().serialize(request);
      nodeClient.write(request);
    });

    // The client can also receive data from the server by reading from its socket.
    nodeClient.on('data', (response: any) => {
      response = new JSONSerializer().deSerialize(response);
      new HandleResponse().handleResponse(response);
      nodeClient.end();
    });

    nodeClient.on('end', () => {
      console.log('Requested an end to the TCP connection');
    });
  }
}
