import {GraphQLServer, } from 'graphql-yoga'
import { type } from 'os';

// Type definitions (schema)
const typeDefs = `
    type Query {
        hello: String!
        name: String!
    }
`

// Resolvers
const resolvers = {
    Query: {
        hello() {
            return 'Hello world!';
        },
        name() {
            return 'Sachin C';
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
});

server.start(() => {
    console.log('The server is up and running at localhost:4000');
})