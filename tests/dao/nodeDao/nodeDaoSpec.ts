import 'mocha';
import { expect } from 'chai';
import nodeDao from '../../../dbLayer/dao/nodeDao/nodeDao';
const nodeMockData = require('../nodeDao/nodeDao.json');

describe('Node DB operations', () => {

  it('Insert node', async () => {
    try {
      await nodeDao.addNode(nodeMockData.nodeReq);
    } catch (e) {
      expect(e).to.be.an('object');
      expect(e).to.have.property('errorCode', 'ERROR_NO_RECORD');
      expect(e).to.have.property('errorMessage', 'No matching records.');
    }
  });

  it('Get all node list', async () => {
    try {
      await nodeDao.getNodeList();
    } catch (e) {
      expect(e).to.be.an('object');
      expect(e).to.have.property('errorCode', 'ERROR_NO_RECORD');
      expect(e).to.have.property('errorMessage', 'No matching records.');
    }
  });

  it('Modify node', async () => {
    try {
      await nodeDao.modifyNode(1, nodeMockData.nodeUpdateReq);
    } catch (e) {
      expect(e).to.be.an('object');
      expect(e).to.have.property('errorCode', 'ERROR_NO_RECORD');
      expect(e).to.have.property('errorMessage', 'No matching records.');
    }
  });

  it('Delete node', async () => {
    try {
      await nodeDao.deleteNode(1);
    } catch (e) {
      expect(e).to.be.an('object');
      expect(e).to.have.property('errorCode', 'ERROR_NO_RECORD');
      expect(e).to.have.property('errorMessage', 'No matching records.');
    }
  });
});




