const fs = require('fs');

export class FileManager {

  public getFileData(filePath: any): Promise<any> {
    const fileData = fs.readFileSync(filePath, { encoding: 'utf8', flag: 'r' });
    return fileData;
  }
}