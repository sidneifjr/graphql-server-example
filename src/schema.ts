/**
 * 1) ! (bang) means 'required' and "not-nullable". [String] means an array of strings.
 * 
 * 2) In graphQL, there are five different usable types: int, float, string, boolean, ID.
 * 
 * ID is used as a key for data objects.
 * 
 * 3) a type "Query" is required in every graphQL schema. It defines entrypoints for the graph and specifies the return types from these entrypoints.
 * 
 * it's meant to gatekeep entrypoints and guarantee that we won't fetch undesired data.
 */
export const typeDefs = `#graphql
  type Game {
    id: ID!
    title: String!
    platform: [String!]!
  }

  type Review {
    id: ID!
    rating: Int!
    content: String!
  }

  type Author {
    id: ID!
    name: String!
    verified: Boolean!
  }

  type Query {
    reviews: [Review]
    review(id: ID!): Review 
    
    games: [Game]
    game(id: ID!): Game
    
    authors: [Author]
    author(id: ID!): Author
  }
`

/**
 * Query Variable: when the user makes this query, we expect them to send a variable along with it. That variable would be the id of the review they want to fetch, since it's needed to find it in our data.
 */