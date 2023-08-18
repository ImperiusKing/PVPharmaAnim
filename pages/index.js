import React from 'react';
import ReactDOM from 'react-dom';
import { useQuery } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { gql } from '@apollo/client';
import client from './apollo-client'; // Relative path to apolloClient.js
import App from '../pages/_app'; // Your main application component

const Home = ({ page }) => {
  // const { loading, error, data } = useQuery(GET_PAGE_DATA);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  // Use the data retrieved from the query here
  console.log(page);
  return (
    <div>
      <img
        src={page.heroBackground.url}
        width={page.heroBackground.width}
        height={page.heroBackground.height}
        alt='Hero background'
      />
    </div>
  );
};

export async function getStaticProps() {
  // Use useQuery hook from @apollo/client to fetch the data in the component
  const {
    data: { page },
    loading,
    error,
  } = await client.query({
    query: GET_PAGE_DATA,
  });
  console.log(page);
  // if (loading) return { props: { page: [] } };
  // if (error) return { props: { page: [] } };

  return {
    props: {
      page,
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

export default Home;
