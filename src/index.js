import {GraphQLServer, } from 'graphql-yoga'
import { type } from 'os';

// Scalar types - String, Boolean, Int, Float, ID

// Type definitions (schema)
const typeDefs = `
    type Query {
        me: User!
        post: Post!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }
    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
    }
`

// Resolvers
const resolvers = {
    Query: {
        me() {
            return {
                id: 'abcd',
                name: 'Sachin C',
                email: 'sachinw@gmail.com'
            }
        }, 
        post() {
            return {
                id: 'abcde',
                title: 'first post',
                body: 'hello there',
                published: true
            }
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
});

server.start(() => {
    console.log('The server is up and running at localhost:4000');
});