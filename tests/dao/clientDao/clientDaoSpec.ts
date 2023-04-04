import 'mocha';
import { expect } from 'chai';
import clientDao from '../../../dbLayer/dao/clientDao/clientDao';
const clientMockData = require('../clientDao/clientDao.json');

describe('Client DB operations', () => {

  it('Insert client', async () => {
    try {
      await clientDao.insertClient(clientMockData.clientRequest);
    } catch (e) {
      expect(e).to.be.an('object');
      expect(e).to.have.property('errorCode', 'ERROR_NO_RECORD');
      expect(e).to.have.property('errorMessage', 'No matching records.');
    }
  });

  it('Modify client', async () => {
    try {
      await clientDao.modifyClient(1, clientMockData.clientUpdateReq);
    } catch (e) {
      expect(e).to.be.an('object');
      expect(e).to.have.property('errorCode', 'ERROR_NO_RECORD');
      expect(e).to.have.property('errorMessage', 'No matching records.');
    }
  });

  it('Get all clients', async () => {
    try {
      await clientDao.getClientList();
    } catch (e) {
      expect(e).to.be.an('object');
      expect(e).to.have.property('errorCode', 'ERROR_NO_RECORD');
      expect(e).to.have.property('errorMessage', 'No matching records.');
    }
  });

  it('Delete client', async () => {
    try {
      await clientDao.deleteClient(1);
    } catch (e) {
      expect(e).to.be.an('object');
      expect(e).to.have.property('errorCode', 'ERROR_NO_RECORD');
      expect(e).to.have.property('errorMessage', 'No matching records.');
    }
  });
});




