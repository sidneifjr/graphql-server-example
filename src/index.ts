import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

import db from './_db.js' // need to be js, so we can get those files after compiled.

import { typeDefs } from './schema.js'

// We have to create resolvers for the root "Query" type, since it's where we define entrypoints for our graph.
const resolvers = {
  // resolver functions must have the same name as the corresponding type defined in the schema.
  Query: {
    games() {
      return db.games // sending back the array of games. "We don't have to worry what fields are returned; GraphQL handles those for us".
    },

    authors() {
      return db.authors
    },

    reviews() {
      return db.reviews
    }
  }
}

/**
 * 1) typeDefs: description of our data types and the relationship that they have with other data types.
 * 
 * Definitions of types of data.
 * 
 * 2) schema: the combination of all these different types, their relationship to other types and the kinds of queries that can be made combined to make something called "schema".
 * 
 * schema describes the shape of the graph and the data available on it.
 * 
 * Normally, your GraphQL schema will be fairly similar to the data you are storing in your application database. (does not have to be 100%)
 * 
 * 3) resolvers: a bunch of resolver functions that allows us to determine how we respond to queries on the graph.
 */
const server = new ApolloServer({
  typeDefs,
  resolvers
})

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 }
})

console.log('Server ready and running at port', 4000)