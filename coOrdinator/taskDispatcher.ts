import Queue from './taskQueue';
import TaskDao from '../dbLayer/dao/taskDao/taskDao';
import NodeDao from '../dbLayer/dao/nodeDao/nodeDao';
import TDSRequest from '../communication/tdsRequest';

import { NodeConnection } from './connectToNode';
import { TaskService } from './taskService';
import { readFileSync } from "fs";

const path = require('path');

export class TaskDispatcher {
  async start() {
    console.log("Dispatcher started.....");
    while (1) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      let taskId = Queue.dequeue();
      if (taskId) {
        this.dispatchTask(taskId);
      }
    }
  }

  async dispatchTask(taskId: number) {
    let node = await NodeDao.getAvailableNode();
    let task: any = await TaskDao.getTaskById(taskId);
    await new TaskService().updateTaskStatus(task.TaskId, 'Executing')
    await new TaskService().assignNode(task.TaskId, node.NodeId)
    let fileData: string = await this.readFile(task)
    const nodeRequest: TDSRequest = new TDSRequest();
    nodeRequest.setType('Request')
    nodeRequest.setMethod('executeTask');
    nodeRequest.addParameter('taskName', task.TaskName);
    nodeRequest.addParameter('fileData', fileData);
    nodeRequest.addParameter('taskID', task.TaskId);
    new NodeConnection().sendRequest(node, nodeRequest);
  }

  async readFile(task: any): Promise<string> {
    try {
      const filePath = path.join(__dirname, '/task/')
      let fileData = readFileSync(filePath + task.TaskName, 'utf-8');
      return fileData;
    } catch (error) {
      console.log('Failed to read file!!!!');
      throw (error)
    }
  }
}
