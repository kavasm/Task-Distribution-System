import { ITDSSerializer } from '../interface/ITdsSerializer';
import TDSProtocol from '../tdsProtocol';

class JSONSerializer implements ITDSSerializer {

  public deSerialize(response: any): TDSProtocol {
    return JSON.parse(response);
  }

  public serialize(protocol: TDSProtocol): string {
    return JSON.stringify(protocol);
  }

}

export default JSONSerializer;