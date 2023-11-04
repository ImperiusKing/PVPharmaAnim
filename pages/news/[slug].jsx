import { gql } from "@apollo/client";
import { AiOutlineContainer, AiTwotoneCalendar } from "react-icons/ai";
import client from "../../apollo-client";

const GET_NEWS_QUERY = gql`
  query NewsPage($slug: String!) {
    news(where: { slug: $slug }) {
      id
      publishedAt
      title
      type
      contentRichText {
        html
      }
      slug
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
    case "TinTucPhucVinh":
      return "TIN PHÚC VINH";
    case "CamNangYHoc":
      return "CẨM NANG Y HỌC";
    case "TinTucTuyenDung":
      return "TIN TỨC TUYỂN DỤNG";
    default:
      return ""; // Handle any unknown types.
  }
}

export default function Page({ news }) {
  return (
    <article className="max-w-[80rem] px-6 py-24 mx-auto space-y-5 dark:bg-gray-800 dark:text-gray-50">
      <header className="w-full mx-auto space-y-4 text-center">
        <h1 className="text-4xl font-bold">{news.title}</h1>
        <div className="text-[1.25rem] font-bold text-[#373737] flex items-center justify-center gap-1">
          <AiOutlineContainer /> {getNewsTypeLabel(news.type[0])}
          <AiTwotoneCalendar className="ml-6" />
          <time dateTime={formatDate(new Date(news.publishedAt))}>
            {formatDate(new Date(news.publishedAt))}
          </time>
        </div>
      </header>
      <figure className="dark:text-gray-100">
        {news.background?.url && (
          <img
            src={news.background.url}
            alt={news.title}
            width="400"
            style={{ display: "block", margin: "auto" }}
          />
        )}
        <figcaption>
          <div
            className="mt-5 text-[1.25rem] centered-content"
            dangerouslySetInnerHTML={{
              __html: news.contentRichText?.html || "",
            }}
          />
        </figcaption>
      </figure>
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
      process.env.NODE_ENV === "development" ? "no-cache" : "cache-first",
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
