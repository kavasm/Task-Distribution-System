import { ClientServer } from './clientServer';
import { CommandManagerFactory } from './commandManagerFactory';
import { HandleResponse } from './handleResponse';

export class Client {
  public async init(): Promise<void> {
    try {
      const command = process.argv.slice(2)
      let commandFactory = CommandManagerFactory.getCommandManager(command[0]);
      const request = await commandFactory.getRequest(command);
      if(request){
        await new ClientServer().sendRequest(request);
      } else {
        new HandleResponse().handleResponse(request)
      }
    }
    catch (err) {
      console.log('ERROR:::Client:::init()', err);
    }
  }
}

new Client().init();


