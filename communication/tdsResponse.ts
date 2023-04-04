import TDSProtocol from './tdsProtocol';

class TDSResponse extends TDSProtocol {

  public setType(value: string): any {
    return this.type = value;
  }

  // Should return true/false, corresponds to status tag in the response
  public getStatus(): boolean {
    return (this.payload.status === 'SUCCESS' ? true : false);
  }
  public getErrorCode(): number {
    return this.payload.errorCode;
  }
  public getErrorMessage(): string {
    return this.payload.errorMessage;
  }

  // Should return the value for a specific key from the response data, for example to retrieve the node-id
  public getValue(key: string): string {
    return this.payload[key];
  }
  public setValue(key: string, value: string): any {
    return this.payload[key] = value;
  }

}

export default TDSResponse;