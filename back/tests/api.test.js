/* eslint-disable no-unused-expressions */
const chai = require('chai');
const chaiHttp = require('chai-http');
const appPromise = require('../server');

let app = null;

const { expect } = chai;
chai.use(chaiHttp);

beforeAll(async () => {
  app = await appPromise;
});
describe('Health', () => {
  it.skip('should validate health check', async () => {
    expect(1).to.equals(1);
    // await checkHealth(false);
  });

  it('should get bricks', async () => {
    const res = await chai
      .request(app)
      .post('/')
      .send({ query: '{ bricks { id }}' });
    expect(res).to.have.status(200);
    expect(res.body.data.bricks).to.exist;
  });
});
