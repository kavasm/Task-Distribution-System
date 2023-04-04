import TaskDao from '../dbLayer/dao/taskDao/taskDao';
import TDSResponse from '../communication/tdsResponse';
import Queue from './taskQueue';

import { taskSuccessMsg, taskErrMsg } from '../config/taskMsgConfig';
import { SetResponse } from './setResponseModel';
import { SetError } from './setErrorModel'

const fs = require('fs');
const path = require('path');

export class TaskService {

  public async addTask(task: any, socket: any): Promise<any> {
    try {
      await this.saveFile(task.payload);
      const taskResponse = await TaskDao.addTask(task.payload);
      Queue.enqueue(taskResponse.TaskId);
      await this.updateTaskStatus(taskResponse.TaskId, 'Queued')
      const response: TDSResponse = new TDSResponse();
      response.setValue('taskId', taskResponse.TaskId);
      const res = await new SetResponse().setResponseModel(response, taskSuccessMsg.addTask);
      socket.write(res)
    }
    catch (err) {
      console.log('ERROR:::TaskService:::addTask():::', err);
      const response: TDSResponse = new TDSResponse();
      const error = await new SetError().setErrorModel(response, taskErrMsg.addTask);
      socket.write(error)
    }
  }

  public async getTaskStatus(task: any, socket: any): Promise<any> {
    try {
      const status = await TaskDao.getTaskById(task.payload.taskId);
      const response: TDSResponse = new TDSResponse();
      response.setValue('taskStatus', status.TaskStatus);
      const res = await new SetResponse().setResponseModel(response, taskSuccessMsg.status)
      socket.write(res);
    }
    catch (err) {
      console.log('ERROR:::TaskService:::getTaskStatus():::', err);
      const response: TDSResponse = new TDSResponse();
      const error = await new SetError().setErrorModel(response, taskErrMsg.status);
      socket.write(error)
    }
  }

  public async getTaskResult(task: any, socket: any): Promise<any> {
    try {
      const result = await TaskDao.getTaskById(task.payload.taskId);
      const response: TDSResponse = new TDSResponse();
      response.setValue('taskResult', result.TaskResult);
      const res = await new SetResponse().setResponseModel(response, taskSuccessMsg.result)
      socket.write(res);
    }
    catch (err) {
      const response: TDSResponse = new TDSResponse();
      const error = await new SetError().setErrorModel(response, taskErrMsg.result);
      socket.write(error)
    }
  }

  public async saveFile(task: any): Promise<any> {
    try {
      const root = path.join(__dirname, '/task');
      const filePath = root + '/' + task.taskName;
      if (!fs.existsSync(root)) {
        fs.mkdirSync(root);
      }
      fs.writeFileSync(filePath, task.fileData);
    } catch
    {
      throw Error('Unable to save file in folder')
    }
  }

  public async saveTaskResult(resultReq: any) {
    try {
      await TaskDao.updateTaskResult(resultReq.payload);
      await this.updateTaskStatus(resultReq.payload.taskId, 'Completed')
    } catch {
      throw Error('Failed to save task result to DB');
    }
  }

  public async assignNode(taskID: number, nodeID: number) {
    try {
      await TaskDao.assignNode(taskID, nodeID);
    } catch {
      throw Error('Failed to save task result to DB');
    }
  }

  public async updateTaskStatus(taskID: number, status: string) {
    try {
      console.log('updateTaskStatus', taskID, status)
      await TaskDao.setTaskStatus(taskID, status);
    } catch {
      throw Error('Failed to set task status');
    }
  }
}


