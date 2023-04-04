// tslint:disable-next-line:no-namespace
export namespace tds.dbLayer.contracts {
  export interface IConnectionManager {
    getConnection(connectionUrl: string): Promise<any>;
    closeConnection(): void;
  }
}