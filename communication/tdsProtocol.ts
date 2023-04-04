class TDSProtocol {
  sourceIP: string = '';
  destIP: string = '';
  sourcePort: number = 0;
  destPort: number = 0;
  type: string = '';
  header: any = {
    'TDSProtocolVersion': '1.0',
    'TDSProtocolFormat': 'json'
  };
  payload: any = {};
}

export default TDSProtocol;
