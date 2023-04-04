import 'mocha';
import { expect } from 'chai';
import taskDao from '../../../dbLayer/dao/taskDao/taskDao';
const taskMockData = require('../taskDao/taskDao.json');

describe('Task DB operations', () => {

  it('Insert task', async () => {
    try {
      await taskDao.addTask(taskMockData.taskReq);
    } catch (e) {
      expect(e).to.be.an('object');
      expect(e).to.have.property('errorCode', 'ERROR_NO_RECORD');
      expect(e).to.have.property('errorMessage', 'No matching records.');
    }
  });

  it('Modify task', async () => {
    try {
      await taskDao.modifyTask(1, taskMockData.taskUpdateReq);
    } catch (e) {
      expect(e).to.be.an('object');
      expect(e).to.have.property('errorCode', 'ERROR_NO_RECORD');
      expect(e).to.have.property('errorMessage', 'No matching records.');
    }
  });

  it('Delete task', async () => {
    try {
      await taskDao.deleteTask(1);
    } catch (e) {
      expect(e).to.be.an('object');
      expect(e).to.have.property('errorCode', 'ERROR_NO_RECORD');
      expect(e).to.have.property('errorMessage', 'No matching records.');
    }
  });

  it('Set task status', async () => {
    try {
      await taskDao.setTaskStatus(1, 2);
    } catch (e) {
      expect(e).to.be.an('object');
      expect(e).to.have.property('errorCode', 'ERROR_NO_RECORD');
      expect(e).to.have.property('errorMessage', 'No matching records.');
    }
  });

  it('Assign node', async () => {
    try {
      await taskDao.assignNode(1, 1);
    } catch (e) {
      expect(e).to.be.an('object');
      expect(e).to.have.property('errorCode', 'ERROR_NO_RECORD');
      expect(e).to.have.property('errorMessage', 'No matching records.');
    }
  });

  it('Get task by ID', async () => {
    try {
      await taskDao.getTaskById(1);
    } catch (e) {
      expect(e).to.be.an('object');
      expect(e).to.have.property('errorCode', 'ERROR_NO_RECORD');
      expect(e).to.have.property('errorMessage', 'No matching records.');
    }
  });
  it('Get task by node ID', async () => {
    try {
      await taskDao.getTaskByNodeId(1);
    } catch (e) {
      expect(e).to.be.an('object');
      expect(e).to.have.property('errorCode', 'ERROR_NO_RECORD');
      expect(e).to.have.property('errorMessage', 'No matching records.');
    }
  });
});




