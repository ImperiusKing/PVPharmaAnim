import { gql } from '@apollo/client';
import client from '../../apollo-client';
import { AiTwotoneCalendar } from 'react-icons/ai';
import { AiOutlineContainer } from 'react-icons/ai';

const GET_NEWS_QUERY = gql`
  query NewsPage($slug: String!) {
    news(where: { slug: $slug }) {
      id
      publishedAt
      title
      type
      content
      description
      slug
      title1
      title2
      title3
      title4
      title5
      title6
      title7
      paragraph1
      paragraph2
      paragraph3
      paragraph4
      paragraph5
      paragraph6
      paragraph7
      image1 {
        url
      }
      image2 {
        url
      }
      image3 {
        url
      }
      image4 {
        url
      }
      image5 {
        url
      }
      image6 {
        url
      }
      image7 {
        url
      }
      background {
        url
      }
    }
  }
`;

function formatDate(dt) {
  const padL = (nr, len = 2, chr = `0`) => `${nr}`.padStart(len, chr);

  return `${padL(dt.getDate())}-${padL(dt.getMonth() + 1)}-${dt.getFullYear()}`;
}

function getNewsTypeLabel(newsType) {
  switch (newsType) {
    case 'TinTucPhucVinh':
      return 'TIN PHÚC VINH';
    case 'CamNangYHoc':
      return 'CẨM NANG Y HỌC';
    case 'TinTucTuyenDung':
      return 'TIN TỨC TUYỂN DỤNG';
    default:
      return ''; // Handle any unknown types.
  }
}

export default function Page({ news }) {
  const newsArray = [
    { title: news.title1, image: news.image1?.url, paragraph: news.paragraph1 },
    { title: news.title2, image: news.image2?.url, paragraph: news.paragraph2 },
    { title: news.title3, image: news.image3?.url, paragraph: news.paragraph3 },
    { title: news.title4, image: news.image4?.url, paragraph: news.paragraph4 },
    { title: news.title5, image: news.image5?.url, paragraph: news.paragraph5 },
    { title: news.title6, image: news.image6?.url, paragraph: news.paragraph6 },  
    { title: news.title7, image: news.image7?.url, paragraph: news.paragraph7 },
    { title: news.title8, image: news.image8?.url, paragraph: news.paragraph8 },
    { title: news.title9, image: news.image9?.url, paragraph: news.paragraph9 },
  ];

  return (
    <article className='max-w-[80rem] px-6 py-24 mx-auto space-y-5 dark:bg-gray-800 dark:text-gray-50'>
      <div className='w-full mx-auto space-y-4 text-center'>
        <h1 className='text-4xl font-bold'>{news.title}</h1>
        <p className='text-[1.25rem] font-bold text-[#373737] flex items-center justify-center gap-3'>
          <AiOutlineContainer />
          {" "}{(news.type)}
          <AiTwotoneCalendar />
          <time datetime='2021-02-12'>
            {formatDate(new Date(news.publishedAt))}
          </time>
        </p>
      </div>
      <div className='dark:text-gray-100'>
        {news.background?.url && 
          <img src={news.background.url} alt={news.title} width="400" style={{display: 'block', margin: 'auto'}} />
        }
        <p className='mt-5 text-[1.25rem]'>{news.content}</p>
      </div>
      {newsArray.map((item, index) => (
        <div key={index} className='dark:text-gray-100'>
          <h2 className='font-bold text-2xl my-5'>{item.title}</h2>
          {item.image && 
            <img src={item.image} alt={item.title} width="400" style={{display: 'block', margin: 'auto'}} />
          }
          <p className='mt-5 text-[1.25rem]' dangerouslySetInnerHTML={{ 
              __html: item.paragraph 
                  ? item.paragraph.replace(/"(.*?)"/g, '<i>"$1"</i>').replace(/\n/g, '<br />') 
                  : '' 
          }}></p>
        </div>
      ))}
    </article>
  );
}

export async function getStaticProps({ params }) {
  const {
    data: { news },
  } = await client.query({
    query: GET_NEWS_QUERY,
    variables: { slug: params.slug },
    fetchPolicy:
      process.env.NODE_ENV === 'development' ? 'no-cache' : 'cache-first',
  });
  return {
    props: {
      news: news[0],
    },
  };
}

export async function getStaticPaths() {
  const data = await client.query({
    query: gql`
      query allNews {
        news(first: 10000) {
          id
          slug
        }
      }
    `,
  });

  const paths = data.data.news.map((item) => ({
    params: {
      slug: item.slug,
    },
  }));

  return {
    paths: [...paths],
    fallback: false,
  };
}
