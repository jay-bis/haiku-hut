const { GraphQLServer } = require('graphql-yoga');
const { PrismaClient } = require('@prisma/client');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const Poem = require('./resolvers/Poem');

const resolvers = {
  Query,
  Mutation,
  Poem
}

// wire up Prisma with graphQL
const prisma = new PrismaClient();

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => {
    return {
      ...request,
      prisma,
    }
  }
})

server.start(() => console.log(`Server is running on http://192.168.0.146:4000`))