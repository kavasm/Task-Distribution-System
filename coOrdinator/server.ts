import net from 'net';
import JSONSerializer from '../communication/serializer/serializer';

import { SqlClientManager } from '../dbLayer/sqlConnectionManager/connectionManager';
import { ClientRequestHandler } from './clientRequestHandler';
import { NodeRequestHandler } from './nodeRequestHandler';
import { connectionConfig } from '../config/commConfig';
import { TaskDispatcher } from './taskDispatcher';

let server = net.createServer();

const init = async () => {

  server.listen(connectionConfig, async () => {
    console.log(`Server listening for connection requests on socket ${connectionConfig.host}:${connectionConfig.port}`);
    await new SqlClientManager().getConnection('');
  });
  new TaskDispatcher().start();
  server.on('connection', (socket: any) => {
    console.log('A new connection has been established.');

    // The server can also receive data from the client by reading from its socket.
    socket.on('data', async (chunk: any) => {
      const request = new JSONSerializer().deSerialize(chunk);
      if (request.type.startsWith('client')) {
        new ClientRequestHandler().handleRequest(request, socket);
      } else {
        console.log(request);
        new NodeRequestHandler().handleRequest(request, socket);
      }
    });

    socket.on('end', () => {
      console.log('Closing connection with the client');
    });

    socket.on('error', (err: any) => {
      console.log(`Error: ${err}`);
    });
  })
};

init();