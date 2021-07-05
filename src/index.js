const fs = require('fs');
const path = require('path');

const { ApolloServer } = require('apollo-server');

// temporarily kept here in memory, usually kept in a DB
let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}]

let idCount = links.length;

// resolvers object is the actual implementation of the above schema
// note that its structure is identical to type definition above
const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: () => links,
    },
    Mutation: {
        // creates a new link object
        // then adds it to links list
        // then returns the new link
        post: (parent, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,  // args... see schema
                url: args.url,                  // ditto
            }
            links.push(link);
            return link;
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
})

server
    .listen()
    .then(({ url }) =>
        console.log(`Server is running on ${url}`)
    );