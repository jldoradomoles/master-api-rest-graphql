import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';
import { ApolloProvider } from '@apollo/client';
import client from 'core/graphql/apolloClient';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<ApolloProvider client={client}><App /></ApolloProvider>);
