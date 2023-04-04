import ClientDao from '../dbLayer/dao/clientDao/clientDao'

export class ClientService {

  public async registerClient(clientDetails: any): Promise<any> {
    try {
      const request = await ClientDao.insertClient(clientDetails.payload);
      return request;
    }
    catch (err) {
      console.log('ERROR:::TaskService:::addTask():::', err);
    }
  }
}



