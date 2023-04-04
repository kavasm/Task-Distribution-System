import TDSProtocol from '../tdsProtocol';

export interface ITDSSerializer {
  // DeSerialize the String data into a TDSProtocol object
  deSerialize(data: string): TDSProtocol;

  // Serialize the TDSProtocol object to a String format
  serialize(protocol: TDSProtocol): string;
}
