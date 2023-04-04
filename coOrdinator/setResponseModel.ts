import JSONSerializer from '../communication/serializer/serializer';

export class SetResponse {

  public async setResponseModel(response: any, message: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        response.setType('response');
        response.setValue('status', 'SUCCESS');
        response.setValue('statusCode', '200');
        response.setValue('successMessage', message);
        const res = new JSONSerializer().serialize(response);
        resolve(res);
      }
      catch (err) {
        reject(err)
      }
    })
  }
}