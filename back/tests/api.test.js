// const app = require('../server');
const firebase = require('@firebase/testing');

const chai = require('chai');
const chaiHttp = require('chai-http');
const { getFirestoreRules } = require('./helpers');
const { checkHealth } = require('./testers');
const { testLogin, testLogout } = require('./login/testers');

const { expect } = chai;
chai.use(chaiHttp);

beforeAll(() => {
  const projectId = 'test';
  const rules = getFirestoreRules();
  firebase.initializeAdminApp({ projectId });
  firebase.loadFirestoreRules({ projectId, rules });
});
afterAll(async () => Promise.all(firebase.apps().map(app => app.delete())));

describe('Health', () => {
  // testLogin();
  it('should validate health check', async () => {
    expect(1).to.equals(1);
    await checkHealth({ isConnected: false });
  });

  // it('should show if user is connected', async () => {
  //   await checkHealth({ isConnected: true }, header);
  // });
  // testLogout();
  // it('should shouw not connected when token is revoked', async () => {
  //   await checkHealth({ isConnected: true }, header);
  // });
});
