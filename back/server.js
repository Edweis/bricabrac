const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const { port } = require('./constants/appConfig');
// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  hello: () => {
    return 'Hello world!';
  },
};

const app = express();
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  }),
);

app.get('/health', (req, res) => {
  res.json({ status: 'success', message: 'up', isConnected: req.user != null });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
  console.log(`GraphQL running at http://localhost:${port}/graphql`);
});

module.exports = app;
