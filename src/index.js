const { GraphQLServer } = require('graphql-yoga');
const { PrismaClient } = require('@prisma/client');

const resolvers = {
  Query: {
    info: () => `This is a test`,
    feed: async (parent, args, context) => {
        return context.prisma.poem.findMany()
      },
  },
  Mutation: {
    post: (parent, args, context, info) => {
        const newPoem = context.prisma.poem.create({
            data: {
                title: args.title,
                content: args.content,
                author: {
                    connect: { id: args.authorId }
                }
            }
        })
       return newPoem
    }
  }
}

// wire up Prisma with graphQL
const prisma = new PrismaClient();

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {
      prisma
  }
})
server.start(() => console.log(`Server is running on http://localhost:4000`))