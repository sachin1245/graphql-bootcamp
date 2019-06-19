import {GraphQLServer, } from 'graphql-yoga'
import { type } from 'os';

// Scalar types - String, Boolean, Int, Float, ID

//Demo user data 

const users = [{
    id:'1',
    name: 'sachin',
    email: 'sachin@gmail.com',
    age: 25
}, 
{
    id: '2',
    name: 'chethan',
    email: 'chethan@gmail.com',
    age: 26
}]

const posts = [{
    id: '1',
    title: 'first post',
    body: 'content for post 1',
    published: true
},
{
    id: '2',
    title: 'second post',
    body: 'content for post 2',
    published: true
},
{
    id: '3',
    title: 'third post',
    body: 'content for post 3',
    published: true
},
{
    id: '4',
    title: 'fourth post',
    body: 'content for post 4',
    published: true
}]



// Type definitions (schema)
const typeDefs = `
    type Query {
        me: User!
        post: Post!
        users(query: String): [User]!
        posts(query: String): [Post]!
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
        },
        users(parent, args, ctx, info) {
            if(!args.query) {
                return users;
            }
            return users.filter((user) => {
                return user.name.toLowerCase().includes(args.query.toLowerCase());
            });
        },
        posts(parent, {query}, ctx, info) {
            if(!query) {
                return posts;
            }

            return posts.filter((post) => {
                const isTitleMatch = post.title.toLowerCase().includes(query.toLowerCase())
                const isBodyeMatch = post.body.toLowerCase().includes(query.toLowerCase())
                return isTitleMatch || isBodyeMatch
            })
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