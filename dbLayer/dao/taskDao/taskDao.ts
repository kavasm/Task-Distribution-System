import * as sqlDbManager from '../../sqlConnectionManager/connectionManager';
import { ITaskModel } from '../../dto/taskModel';

import SqlServerManager = sqlDbManager.SqlClientManager;

class TaskDao {
  public static getInstance(): TaskDao {
    if (!TaskDao.instance) {
      TaskDao.instance = new TaskDao();
    }
    return TaskDao.instance;
  }
  private static instance: TaskDao;

  public async addTask(task: ITaskModel): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const db = await new SqlServerManager().instance();
      try {
        const dbResult = await db.request()
          .input('taskName', task.taskName)
          .input('clientId', task.clientId)
          .input('taskParameters', task.taskParameters)
          .execute('sp_aInsertTask');
        resolve(dbResult.recordset[0]);
      } catch (err) {
        console.log('Exception at NodeDao --> addNode() --> ', err);
        reject(err);
      } finally {
        new SqlServerManager().closeConnection();
      }
    });
  }
  public async modifyTask(id: number, task: ITaskModel): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const db = await new SqlServerManager().instance();
      try {
        const dbResult = await db.request()
          .input('Id', id)
          .input('taskName', task.taskName)
          .input('clientId', task.clientId)
          .input('taskParameters', task.taskParameters)
          .input('taskExecPath', task.taskExecPath)
          .execute('sp_UpdateTask');
        resolve(dbResult.recordset);
      } catch (err) {
        console.log('Exception at TaskDao -->   modifyTask() --> ', err);
        reject(err);
      } finally {
        new SqlServerManager().closeConnection();
      }
    });
  }

  public async updateTaskResult(taskDetails: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const db = await new SqlServerManager().instance();
      try {
        const dbResult = await db.request()
          .input('Id', taskDetails.taskId)
          .input('taskResult', taskDetails.output)
          .input('resultStatus', taskDetails.status)
          .execute('sp_UpdateTaskResult');
        resolve(dbResult.recordset);
      } catch (err) {
        console.log('Exception at TaskDao -->   updateTaskResult() --> ', err);
        reject(err);
      } finally {
        new SqlServerManager().closeConnection();
      }
    });
  }

  public async deleteTask(id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const db = await new SqlServerManager().instance();
      try {
        const dbResult = await db.request()
          .input('id', id)
          .execute('sp_DeleteTask');
        resolve(dbResult);
      } catch (err) {
        console.log('Exception at TaskDao -->  deleteTask() --> ', err);
        reject(err);
      } finally {
        new SqlServerManager().closeConnection();
      }
    });
  }

  public async setTaskStatus(id: number, taskStatus: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const db = await new SqlServerManager().instance();
      try {
        const dbResult = await db.request()
          .input('Id', id)
          .input('TaskStatus', taskStatus)
          .execute('sp_SetTaskStatus');
        resolve(dbResult);
      } catch (err) {
        console.log('Exception at TaskDao -->   setTaskStatus() --> ', err);
        reject(err);
      } finally {
        new SqlServerManager().closeConnection();
      }
    });
  }

  public async getTaskByClientId(clientId: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const db = await new SqlServerManager().instance();
      try {
        const dbResult = await db.request()
          .input('ClientId', clientId)
          .execute('sp_GetTaskByClientId');
        resolve(dbResult.recordset[0]);
      } catch (err) {
        console.log('Exception at TaskDao -->  getTaskByClientId() --> ', err);
        reject(err);
      } finally {
        new SqlServerManager().closeConnection();
      }
    });
  }

  public async getTaskById(taskId: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const db = await new SqlServerManager().instance();
      try {
        const dbResult = await db.request()
          .input('TaskId', taskId)
          .execute('sp_GetTaskById');
        resolve(dbResult.recordset[0]);
      } catch (err) {
        console.log('Exception at TaskDao -->  getTaskById() --> ', err);
        reject(err);
      } finally {
        new SqlServerManager().closeConnection();
      }
    });
  }

  public async getTaskByStatus(taskStatus: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const db = await new SqlServerManager().instance();
      try {
        const dbResult = await db.request()
          .input('TaskStatus', taskStatus)
          .execute('sp_GetTaskByStatus');
        resolve(dbResult);
      } catch (err) {
        console.log('Exception at TaskDao -->  getTaskByStatus() --> ', err);
        reject(err);
      } finally {
        new SqlServerManager().closeConnection();
      }
    });
  }

  public async getTaskByNodeId(nodeId: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const db = await new SqlServerManager().instance();
      try {
        const dbResult = await db.request()
          .input('NodeId', nodeId)
          .execute('sp_GetTaskByNodeId');
        resolve(dbResult);
      } catch (err) {
        console.log('Exception at TaskDao -->  getTaskByNodeId() --> ', err);
        reject(err);
      } finally {
        new SqlServerManager().closeConnection();
      }
    });
  }

  public async assignNode(taskId: number, nodeId: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const db = await new SqlServerManager().instance();
      try {
        const dbResult = await db.request()
          .input('Id', taskId)
          .input('NodeId', nodeId)
          .execute('sp_AssignNode');
        resolve(dbResult);
      } catch (err) {
        console.log('Exception at TaskDao -->  assignNode() --> ', err);
        reject(err);
      } finally {
        new SqlServerManager().closeConnection();
      }
    });
  }

}

export default TaskDao.getInstance();
