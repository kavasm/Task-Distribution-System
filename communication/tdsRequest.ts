import TDSProtocol from './tdsProtocol';

class TDSRequest extends TDSProtocol {

  public setType(value: string): any {
    return this.type = value;
  }
  // corresponds to method in the header
  public getMethod(): string {
    return this.payload.method;
  }
  public setMethod(method: string): string {
    return this.payload.method = method;
  }

  // Get's the value of a given parameter with specified key
  public getParameter(key: string): string {
    return this.payload[key];
  }

  // Adds a parameter for the request
  public addParameter(key: string, value: string): any {
    return this.payload[key] = value;
  }
}

export default TDSRequest;