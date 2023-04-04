import JSONSerializer from '../communication/serializer/serializer';
import TDSResponse from '../communication/tdsResponse';
import { FileExecutorFactory } from './fileExecutorFactory'

const fs = require('fs');
const path = require('path');

export class HandleTaskRequest {

  public async handleTaskRequest(taskReq: any, socket: any) {
    try {
      const filePath = await this.saveFile(taskReq)
      const typeOfFile = taskReq.payload.taskName.split('.').pop();
      let executorFactory = FileExecutorFactory.getExecutor(typeOfFile)
      const output: any = await executorFactory.execute(filePath);
      const response: TDSResponse = new TDSResponse();
      response.setType('response');
      response.setValue('status', 'SUCCESS');
      response.setValue('taskId', taskReq.payload.taskID);
      response.setValue('output', output);
      response.setValue('statusCode', '200');
      response.setValue('successMessage', 'Executed task Successfully.');
      const res = new JSONSerializer().serialize(response);
      socket.write(res)

    } catch (err) {
      const response: TDSResponse = new TDSResponse();
      response.setType('response');
      response.setValue('status', 'ERROR');
      response.setValue('taskId', taskReq.payload.taskID);
      response.setValue('statusCode', '500');
      response.setValue('successMessage', 'Failed to execute task');
      const res = new JSONSerializer().serialize(response);
      socket.write(res)
    }
  }

  public async saveFile(taskReq: any): Promise<any> {
    try {
      const root = path.join(__dirname, '/task');
      const filePath = root + '/' + taskReq.payload.taskName;
      if (!fs.existsSync(root)) {
        fs.mkdirSync(root);
      }
      fs.writeFileSync(filePath, taskReq.payload.fileData);
      return filePath;
    } catch (err) {
      throw err
    }
  }
}



