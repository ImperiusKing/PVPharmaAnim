import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api-ap-northeast-1.hygraph.com/v2/cllg0n6m75k4b01ujedw2cuua/master',
  cache: new InMemoryCache(),
});

export default client;
