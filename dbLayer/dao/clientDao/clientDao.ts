import * as sqlDbManager from '../../sqlConnectionManager/connectionManager';
import { IClientModel } from '../../dto/clientModel';

import SqlServerManager = sqlDbManager.SqlClientManager;

class ClientDao {
  public static getInstance(): ClientDao {
    if (!ClientDao.instance) {
      ClientDao.instance = new ClientDao();
    }
    return ClientDao.instance;
  }
  private static instance: ClientDao;

  public async insertClient(client: IClientModel): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const db = await new SqlServerManager().instance();
      try {
        const dbResult = await db.request()
          .input('IpAddress', client.ipAddress)
          .input('HostName', client.hostName)
          .input('UserName', client.userName)
          .execute('sp_aInsertClient');
        resolve(dbResult.recordset);
      } catch (err) {
        console.log('Exception at ClientDao --> insertClient() --> ', err);
        reject(err);
      }
    });
  }

  public async getClientList(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const db = await new SqlServerManager().instance();
      try {
        const dbResult = await db.request()
          .execute('sp_GetClientList');
        resolve(dbResult.recordset);
      } catch (err) {
        console.log('Exception at ClientDao --> getClientList() --> ', err);
        reject(err);
      } finally {
        new SqlServerManager().closeConnection();
      }
    });
  }

  public async modifyClient(id: number, client: IClientModel): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const db = await new SqlServerManager().instance();
      try {
        const dbResult = await db.request()
          .input('Id', id)
          .input('IpAddress', client.ipAddress)
          .input('HostName', client.hostName)
          .input('UserName', client.userName)
          .execute('sp_UpdateClient');
        resolve(dbResult.recordset);
      } catch (err) {
        console.log('Exception at ClientDao --> modifyClient() --> ', err);
        reject(err);
      } finally {
        new SqlServerManager().closeConnection();
      }
    });
  }

  public async deleteClient(id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const db = await new SqlServerManager().instance();
      try {
        const dbResult = await db.request()
          .input('id', id)
          .execute('sp_DeleteClient');
        resolve(dbResult);
      } catch (err) {
        console.log('Exception at ClientDao --> deleteClient() --> ', err);
        reject(err);
      } finally {
        new SqlServerManager().closeConnection();
      }
    });
  }
}

export default ClientDao.getInstance();
