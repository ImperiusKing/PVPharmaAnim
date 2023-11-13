import { gql } from '@apollo/client';
import algoliasearch from 'algoliasearch/lite';
import client from '../../apollo-client'; // Relative path to apolloClient.js

const GET_PAGE_DATA = gql`
  query PageHome {
    news(first: 10000) {
      id
      title
      description
      slug
    }
    products(first: 1000) {
      id
      title
      slug
      description
      type
    }
  }
`;

const handler = async (req, res) => {
  // initializing the Algolia client with the secret keys
  if (req.method === 'POST') {
    // Process a POST request
    const algoliaClient = algoliasearch(
      process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID,
      process.env.ALGOLIA_ADMIN_KEY
    );
    // setting the Algolia index related to your blog
    const index = algoliaClient.initIndex('dev_pvpharma');
    // retrieving all posts from the headless CMS
    const {
      data: { news, products },
    } = await client.query({
      query: GET_PAGE_DATA,
    });

    const algoliaNews = news.map((item) => ({
      objectID: item.id,
      title: item.title,
      slug: item.slug,
      description: item.description,
      url: `/news/${item.slug}`,
    }));
    const algoliaProducts = products.map((item) => ({
      objectID: item.id,
      title: item.title,
      slug: item.slug,
      description: item.description,
      url: `/product/type/${item.type[0]}/${item.slug}`,
    }));

    await Promise.all([
      index.saveObjects(algoliaProducts),
      index.saveObjects(algoliaNews),
    ]);

    res.json(`Content successfully synchronized with Algolia search`);
    res.end();
  } else {
    res.json(`Not supported`);
    res.end();
  }
};

export default handler;
