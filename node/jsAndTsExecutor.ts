
const util = require('util');
const execFile = util.promisify(require('child_process').execFile);

import { IFileExecutor } from "./IFileExecutor";

export class JsAndTsExecutor implements IFileExecutor {

  public async execute(filePath: any) {
    try {
      const { stdout } = await execFile('node', [filePath]);
      return stdout;
    } catch (error: any) {
      return error.stderr.toString()
    }
  }

}