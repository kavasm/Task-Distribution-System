import * as sqlDbManager from '../../sqlConnectionManager/connectionManager';
import { INodeModel } from '../../dto/nodeModel';

import SqlServerManager = sqlDbManager.SqlClientManager;

class NodeDao {
  public static getInstance(): NodeDao {
    if (!NodeDao.instance) {
      NodeDao.instance = new NodeDao();
    }
    return NodeDao.instance;
  }
  private static instance: NodeDao;

  public async addNode(node: INodeModel): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const db = await new SqlServerManager().instance();
      try {
        const dbResult = await db.request()
          .input('IpAddress', node.ipAddress)
          .input('NodePort', node.nodePort)
          .input('NodeStatus', node.nodeStatus)
          .input('NodeName', node.nodeName)
          .execute('sp_aInsertNode');
        resolve(dbResult.recordset);
      } catch (err) {
        console.log('Exception at NodeDao --> addNode() --> ', err);
        reject(err);
      } finally {
        new SqlServerManager().closeConnection();
      }
    });
  }

  public async getNodeList(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const db = await new SqlServerManager().instance();
      try {
        const dbResult = await db.request()
          .execute('sp_GetNodeList');
        resolve(dbResult.recordset);
      } catch (err) {
        console.log('Exception at NodeDao --> getNodeList() --> ', err);
        reject(err);
      } finally {
        new SqlServerManager().closeConnection();
      }
    });
  }

  public async modifyNode(id: number, node: INodeModel): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const db = await new SqlServerManager().instance();
      try {
        const dbResult = await db.request()
          .input('Id', id)
          .input('IpAddress', node.ipAddress)
          .input('NodePort', node.nodePort)
          .input('NodeStatus', node.nodeStatus)
          .input('NodeName', node.nodeName)
          .execute('sp_UpdateNode');
        resolve(dbResult.recordset);
      } catch (err) {
        console.log('Exception at NodeDao -->  modifyNode() --> ', err);
        reject(err);
      } finally {
        new SqlServerManager().closeConnection();
      }
    });
  }

  public async deleteNode(id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const db = await new SqlServerManager().instance();
      try {
        const dbResult = await db.request()
          .input('id', id)
          .execute('sp_DeleteNode');
        resolve(dbResult);
      } catch (err) {
        console.log('Exception at NodeDao --> deleteNode() --> ', err);
        reject(err);
      } finally {
        new SqlServerManager().closeConnection();
      }
    });
  }

  public async getAvailableNode(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const db = await new SqlServerManager().instance();
      try {
        const dbResult = await db.request()
          .execute('sp_GetAvailableNodes');
        resolve(dbResult.recordset[0]);
      } catch (err) {
        console.log('Exception at NodeDao --> getAvailableNode() --> ', err);
        reject(err);
      } finally {
        new SqlServerManager().closeConnection();
      }
    });
  }
}

export default NodeDao.getInstance();
