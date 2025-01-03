import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql', // URL de tu servidor GraphQL
  cache: new InMemoryCache(),
});

export default client;
