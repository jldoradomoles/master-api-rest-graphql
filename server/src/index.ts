import 'regenerator-runtime/runtime';
import express from 'express';
import path from 'path';
import { ApolloServer, gql } from 'apollo-server-express';
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled,
} from 'apollo-server-core';
import { resolvers, typeDefs } from './graphql';

const PORT = 3000;

(async function () {
  const app = express();
  app.use(express.json());

  const graphqlServer = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
      process.env.NODE_ENV === 'production'
        ? ApolloServerPluginLandingPageDisabled()
        : ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
  });
  await graphqlServer.start();
  graphqlServer.applyMiddleware({ app });

  const publicPath = path.resolve(__dirname, './public');
  app.use(express.static(publicPath));

  app.listen(PORT, () => {
    console.log(`Server running http://localhost:${PORT}`);
    console.log(
      `GraphQL running http://localhost:${PORT}${graphqlServer.graphqlPath}`
    );
  });
})();
