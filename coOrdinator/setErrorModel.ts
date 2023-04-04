import JSONSerializer from '../communication/serializer/serializer';

export class SetError {

  public async setErrorModel(response: any, message: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        response.setType('response');
        response.setValue('status', 'ERROR');
        response.setValue('statusCode', '500');
        response.setValue('errorMessage', message);
        const res = new JSONSerializer().serialize(response);
        resolve(res);
      }
      catch (err) {
        reject(err)
      }
    })
  }
}