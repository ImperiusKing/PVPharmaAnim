import { gql } from '@apollo/client';
import client from '../../../apollo-client';
import { BlogCard } from '../../../components/home/Blog/BlogCard';

const News = ({ news }) => {
  return (
    <div className='bg-white'>
      <div className='mx-auto w-full'>
        <div className='relative overflow-hidden bg-[#F5F5F5] w-full'>
          <div className='py-16'>
            <div className='relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8'>
              <div className='w-[60%] mx-auto text-center'>
                <h1 className='text-4xl font-black tracking-tight text-gray-900 sm:text-6xl'>
                  TIN TỨC
                </h1>
                <p className='mt-6 text-xl text-gray-600'>
                  Sản phẩm của Dược Phúc Vinh được đi sâu nghiên cứu, phát triển
                  và sản xuất một cách toàn diện với sứ mệnh: Mang đến cho cộng
                  đồng những dược phẩm chất lượng, an toàn, có tác dụng phòng và
                  trị bệnh cao.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className='flex flex-wrap -mx-4'>
          {news.map((newsItem) => (
            <BlogCard
              path={newsItem.slug}
              key={newsItem.id}
              date={formatDate(new Date(newsItem.publishedAt))}
              CardTitle={newsItem.title}
              CardDescription={truncateContent(newsItem.description)}
              image={newsItem.background.url}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export function truncateContent(content, wordLimit = 50) {
  if (!content || typeof content !== 'string') {
    return ''; // or return some default value
  }

  const words = content.split(/\s+/); // splits by spaces
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(' ') + '...'; // truncates and adds an ellipsis
  }
  return content;
}

export function formatDate(dt) {
  const padL = (nr, len = 2, chr = `0`) => `${nr}`.padStart(2, chr);

  return `${padL(dt.getDate())}-${padL(dt.getMonth() + 1)}-${dt.getFullYear()}`;
}

export async function getStaticProps({ params }) {
  const {
    data: { news, ...rest },
  } = await client.query({
    query: GET_ALL_NEWS,
    fetchPolicy:
      process.env.NODE_ENV === 'development' ? 'no-cache' : 'cache-first',
    variables: {
      type: [params.slug],
    },
  });

  return {
    props: {
      news,
    },
  };
}

const GET_ALL_NEWS = gql`
  query AllNews($type: [NewsTypes!]) {
    news(where: { type: $type }) {
      id
      publishedAt
      title
      type
      description
      slug
      background {
        url
      }
    }
  }
`;

export async function getStaticPaths() {
  const data = await client.query({
    query: gql`
      query AllTypes {
        __type(name: "NewsTypes") {
          enumValues {
            name
          }
        }
      }
    `,
  });

  console.log(JSON.stringify(data));

  const paths = data.data.__type.enumValues.map((type) => ({
    params: {
      slug: type.name,
    },
  }));

  return {
    paths: [...paths],
    fallback: false,
  };
}

export default News;
