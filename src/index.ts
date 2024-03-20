import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

import db from './_db.js' // need to be js, so we can get those files after compiled.

import { typeDefs } from './schema.js'

/**
 * 1) Resolvers are needed for the root "Query" type, since it's where we define entrypoints for our graph.
 * 
 * That way, all items from "games", "authors" or "reviews" will be fetched. However, Query Variables allows fetching individual values for each category.
 * 
 * 2) Each resolver sends back an array of "games", "authors" or "reviews".
 * 
 * "We don't have to worry about what fields are returned; GraphQL handles those for us".
 */
const resolvers = {
  // 
  Query: {
    games() {
      return db.games 
    },

    game(parent, args: { id: string }) {
      return db.games.find((game) => game.id === args.id)
    },

    authors() {
      return db.authors
    },

    author(parent, args: { id: string }) {
      return db.authors.find((author) => author.id === args.id)
    },

    reviews() {
      return db.reviews
    },

    // "args" is the parameter in which we can access any query variable sent.
    review(parent, args: { id: string }) {
      return db.reviews.find((review) => review.id === args.id)
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