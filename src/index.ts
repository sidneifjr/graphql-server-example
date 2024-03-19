import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

import { typeDefs } from './schema'

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
 * 3) resolvers: a bunch of resolver functions that determine how we respond to queries with different data on the graph.
 */
const server = new ApolloServer({
  typeDefs,

})

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 }
})

console.log('Server ready and running at port', 4000)