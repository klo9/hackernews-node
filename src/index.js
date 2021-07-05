const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client')

const { ApolloServer } = require('apollo-server');

const prisma = new PrismaClient();

// resolvers object is the actual implementation of the above schema
// note that its structure is identical to type definition above
const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: async (parent, args, context) => {
            return context.prisma.link.findMany()
        }
    },
    Mutation: {
        // creates a new link object
        // then adds it to links list
        // then returns the new link
        post: (parent, args, context, info) => {
            const newLink = context.prisma.link.create({
                data: {
                    url: args.url,
                    description: args.description,
                },
            })
            return newLink
        }
    }
    // following not actually needed, just for learning purposes
    // Link: {
    //     id: (parent) => parent.id,
    //     description: (parent) => parent.description,
    //     url: (parent) => parent.url,
    // }
}


// schema and resolver bundled and passed to ApolloServer
// tells server what API operations are accepted + how to resolve
const server = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, 'schema.graphql'),
        'utf8'
    ),
    resolvers,
    context: {
        prisma,
    }
})

server
    .listen()
    .then(({ url }) =>
        console.log(`Server is running on ${url}`)
    );