/* eslint-env browser */
import { ApolloLink } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import { createUploadLink } from 'apollo-upload-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

const link = ApolloLink.from([
  createUploadLink({
    uri: '/graphql',
    credentials: 'same-origin'
  })
]);

const client = new ApolloClient({
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__), // eslint-disable-line no-underscore-dangle
  link,
  ssrForceFetchDelay: 100
});

export default client;
