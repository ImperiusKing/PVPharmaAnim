import { gql } from "@apollo/client";
import { AiOutlineContainer, AiTwotoneCalendar } from "react-icons/ai";
import client from "../../apollo-client";
import Breadcrumbs from "../../components/Breadcrumbs";
import { useRouter } from "next/router";

const translations = {
  news: {
    en: "News",
    vi: "Tin tức",
  },
};

function getTranslation(key, locale = "en") {
  const translation = translations[key][locale] || translations[key]["en"];
  return translation;
}

const GET_NEWS_QUERY = gql`
  query NewsPage($slug: String!, $locale: Locale!) {
    news(where: { slug: $slug }, locales: [$locale]) {
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
      return "Tin Phúc Vinh";
    case "CamNangYHoc":
      return "Cẩm nang y học";
    case "TinTucTuyenDung":
      return "Tin tức tuyển dụng";
    default:
      return ""; // Handle any unknown types.
  }
}

export default function Page({ news }) {
  const router = useRouter();

  return (
    <article className="max-w-[80rem] px-6 py-10 mx-auto space-y-5 dark:bg-gray-800 dark:text-gray-50">
      <div className="w-full">
        <Breadcrumbs
          product={news}
          category={getTranslation("news", router.locale)}
        />
      </div>
      <header className="w-full pt-5 mx-auto space-y-4 text-center">
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

export async function getStaticProps({ params, locale }) {
  const {
    data: { news },
  } = await client.query({
    query: GET_NEWS_QUERY,
    variables: { slug: params.slug, locale },
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

  const paths = ["vi", "en"].flatMap((locale) =>
    data.data.news.map((item) => ({
      params: {
        slug: item.slug,
      },
      locale,
    }))
  );

  return {
    paths: [...paths],
    fallback: false,
  };
}
