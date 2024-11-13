import 'regenerator-runtime/runtime';
import express from 'express';
import path from 'path';
import { hotelApi, cityApi } from './api';
import { ApolloServer, gql } from 'apollo-server-express';

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

const PORT = 3000;

(async function () {
  const app = express();
  app.use(express.json());

  const graphqlServer = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await graphqlServer.start();
  graphqlServer.applyMiddleware({ app });

  const publicPath = path.resolve(__dirname, './public');
  app.use(express.static(publicPath));
  app.use('/api/hotels', hotelApi);
  app.use('/api/cities', cityApi);

  app.listen(PORT, () => {
    console.log(`Server running http://localhost:${PORT}`);
    console.log(
      `GraphQL running http://localhost:${PORT}${graphqlServer.graphqlPath}`
    );
  });
})();
