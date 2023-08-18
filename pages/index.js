import React from 'react';
import ReactDOM from 'react-dom';
import { useQuery } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { gql } from '@apollo/client';
import client from '../pages/apollo-client'; // Relative path to apolloClient.js
import App from '../pages/_app'; // Your main application component

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

const Home = ({ page }) => {
  const { loading, error, data } = useQuery(GET_PAGE_DATA);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Use the data retrieved from the query here

  return <div>Home</div>;
};

export async function getStaticProps() {
  // Use useQuery hook from @apollo/client to fetch the data in the component
  const { loading, error, data } = useQuery(GET_PAGE_DATA);

  if (loading) return { props: { page: [] } };
  if (error) return { props: { page: [] } };

  return {
    props: {
      page: data.page.slice(0, 11),
    },
  };
}

const GET_PAGE_DATA = gql`
  query PageHome {
    page(where: { slug: "home" }) {
      heroLink
      heroText
      heroTitle
      id
      name
      slug
      heroBackground {
        width
        url
        height
      }
    }
  }
`;

