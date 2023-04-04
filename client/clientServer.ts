import net from 'net';
import JSONSerializer from '../communication/serializer/serializer';
import { HandleResponse } from './handleResponse';

import { connectionConfig } from '../config/commConfig';

const client = new net.Socket();

export class ClientServer {
  public sendRequest(request: any): any {

    // Send a connection request to the server.
    client.connect(connectionConfig, () => {
      console.log('TCP connection established with the server.');
      request = new JSONSerializer().serialize(request);
      client.write(request);
    });

    // The client can also receive data from the server by reading from its socket.
    client.on('data', (response: any) => {
      response = new JSONSerializer().deSerialize(response);
      new HandleResponse().handleResponse(response);
      client.end();
    });

    client.on('end', () => {
      console.log('Requested an end to the TCP connection');
    });
  }
}
