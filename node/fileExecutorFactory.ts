import { IFileExecutor } from './IFileExecutor';
import { JsAndTsExecutor } from './jsAndTsExecutor'
import { PythonExecutor } from './pythonExecutor'


export class FileExecutorFactory {

  static getExecutor(method: string): IFileExecutor {
    switch (method) {
      case 'js':
        return new JsAndTsExecutor();
      case 'ts':
        return new JsAndTsExecutor();
      case 'py':
        return new PythonExecutor();
    }
    return new JsAndTsExecutor();
  }
}