const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma');
const resolvers = require('./src/resolvers');
const typeDefs = require('./src/schemas');

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: request => {
    return {
      ...request,
      prisma,
    };
  },
});

server.start(() => console.log('Server is running on http://localhost:4000'));
