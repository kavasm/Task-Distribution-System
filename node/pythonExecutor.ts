
const util = require('util');
const execFile = util.promisify(require('child_process').execFile);

import { IFileExecutor } from "./IFileExecutor";

export class PythonExecutor implements IFileExecutor {

  public async execute(filePath: any) {
    try {
      const { stdout } = await execFile('py', [filePath]);
      return stdout;
    } catch (error: any) {
      return error.stderr.toString()
    }
  }

}