/* eslint-disable no-unused-expressions */
const chai = require('chai');
const chaiHttp = require('chai-http');
const appPromise = require('../server');

const { testSignUp, testLogin } = require('./login/testers');
const { graphReq } = require('./testers');

const { expect } = chai;
chai.use(chaiHttp);

const dummyUser = { email: 'bob@email.com', password: 'secret%%' };

let app = null;
beforeAll(async () => {
  app = await appPromise;
});

const checkHealth = isConnected =>
  it(`should have health with isConnected:${isConnected}`, async () => {
    const res = await graphReq(app, '{health {status, isConnected} }');
    expect(res).to.have.status(200);
    expect(res.body.data.health.status).equal('up');
    expect(res.body.data.health.isConnected).equal(isConnected);
  });
describe('Health', () => {
  checkHealth(false);
  testSignUp(dummyUser);
  testLogin(dummyUser);
  checkHealth(true);
});

describe('Bricks', () => {
  it('should get bricks', async () => {
    const res = await graphReq(app, '{ bricks { id }}');
    expect(res).to.have.status(200);
    expect(res.body.data.bricks).to.exist;
  });
});
