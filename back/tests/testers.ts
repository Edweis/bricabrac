const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

const { expect } = chai;
chai.use(chaiHttp);

export const checkHealth = async (isConnected: boolean, header?: object) => {
  const res = await chai
    .request(app)
    .get('/health')
    .set(header || {});
  expect(res).to.have.status(200);
  expect(res.body.status).to.equals('success');
  expect(res.body.message).to.equals('up');
  expect(res.body.isConnected).to.equals(isConnected);
};

module.exports = { checkHealth };
