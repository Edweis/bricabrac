const chai = require('chai');
const chaiHttp = require('chai-http');

// const { expect } = chai;
chai.use(chaiHttp);
const graphReq = async (app, query) => {
  const res = await chai
    .request(app)
    .post('/')
    .send({ query });
  return res;
};

module.exports = { graphReq };
