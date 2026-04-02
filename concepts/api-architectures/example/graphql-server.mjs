import { createServer } from '@graphql-yoga/node';
import { products } from './data.mjs';

const typeDefs = /* GraphQL */ `
  type Product {
    id: ID!
    name: String!
    price: Float!
    stock: Int!
  }

  type Query {
    products: [Product!]!
    product(id: ID!): Product
  }
`; 

const resolvers = {
  Query: {
    products: () => products,
    product: (_, { id }) => products.find((item) => item.id === id)
  }
};

const graphQLServer = createServer({
  schema: {
    typeDefs,
    resolvers
  },
  graphiql: true,
  maskedErrors: false,
  port: 4000
});

graphQLServer.start().then(() => {
  console.log('GraphQL server listening on http://localhost:4000/graphql');
});
