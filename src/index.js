const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ 
  path: path.resolve(__dirname, `../env/${process.env.NODE_ENV}.env`),
});

const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')
const resolvers = require('./resolvers')

const server = new GraphQLServer({
  typeDefs: 'src/schema.graphql',
  resolvers,
  context: request => {
    return {
      ...request,
      prisma,
    }
  },
})

server.start(() => console.log('Server is running on http://localhost:4000'))
