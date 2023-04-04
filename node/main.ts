import { NodeServer } from "./nodeServer";
import TDSRequest from "../communication/tdsRequest";
import { CommandManagerFactory } from './commandManagerFactory';


export class Node {
  public async init(): Promise<void> {
    try {
      const command = process.argv.slice(2)
      let commandFactory = CommandManagerFactory.getCommandManager(command[0]);
      const request = await commandFactory.getRequest(command);
      new NodeServer().sendRequest(request);
    }
    catch (err) {
      console.log('ERROR:::Client:::init()', err);
    }
  }
}

new Node().init();


