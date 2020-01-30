/* eslint-disable no-unused-expressions */
const chai = require('chai');
const chaiHttp = require('chai-http');
const appPromise = require('../../server');

const { expect } = chai;
chai.use(chaiHttp);

let token = null;
let userId = null;
let app = null;
beforeAll(async () => {
  app = await appPromise;
});
const testSignUp = async ({ email, password }) => {
  it(`should signUp with ${email}:${password}`, async () => {
    const res = await chai
      .request(app)
      .post('/')
      .send({
        query: `
        mutation {
          signup(
            email: "${email}",
            password: "${password}"
          ){
            token
            user { id }
          }
        }`,
      });
    expect(res).to.have.status(200);
    const data = res.body.data.signup;
    expect(data.token).to.exist;
    expect(data.user.id).to.exist;
    token = data.token;
    userId = data.user.id;
  });
};

const testLogin = async ({ email, password }) => {
  it(`should login with ${email}:${password}`, async () => {
    const res = await chai
      .request(app)
      .post('/')
      .send({
        query: `
        mutation {
          login(
            email: "${email}",
            password: "${password}"
          ){
            token
            user { id }
          }
        }`,
      });
    expect(res).to.have.status(200);
    const data = res.body.data.login;
    expect(data.token).to.exist;
    expect(data.user.id).to.exist;
    token = data.token;
    userId = data.user.id;
  });
};

module.exports = { testSignUp, testLogin };
