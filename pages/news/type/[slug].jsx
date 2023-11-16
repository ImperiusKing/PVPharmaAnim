import { gql } from "@apollo/client";
import client from "../../../apollo-client";
import { useRouter } from "next/router";
import { BlogCard } from "../../../components/home/Blog/BlogCard";
import { mergeLocalizationsArray } from "../../../utils/mergeLocalizations";

const translations = {
  news: {
    en: "NEWS",
    vi: "TIN TỨC",
  },
  TinTucPhucVinh: {
    en: "Phuc Vinh News",
    vi: "Tin Phúc Vinh",
  },
  CamNangYHoc: {
    en: "Health Handbook",
    vi: "Cẩm nang y học",
  },
  TinTucTuyenDung: {
    en: "Recruitment News",
    vi: "Tin tức tuyển dụng",
  },
  newsDescription: {
    en: "Dược Phúc Vinh News Page - Your source for the latest updates in the pharmaceutical industry, featuring our standout products and breakthroughs in research and development.",
    vi: "Trang tin tức của Dược Phúc Vinh - Nơi cập nhật những thông tin mới nhất về ngành dược phẩm, các sản phẩm nổi bật, và những đột phá trong nghiên cứu và phát triển.",
  }, // Add other product types as needed
};

function getTranslation(key, locale = "en") {
  const translation = translations[key][locale] || translations[key]["en"];
  return translation;
}

const News = ({ news }) => {
  const router = useRouter();

  return (
    <div className="bg-white">
      <div className="mx-auto w-full">
        <div className="relative overflow-hidden bg-[#F5F5F5] w-full">
          <div className="py-16">
            <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
              <div className="w-[60%] mx-auto text-center">
                <h1 className="text-4xl font-black tracking-tight text-gray-900 sm:text-6xl">
                  {getTranslation("news", router.locale)}
                </h1>
                <p className="mt-6 text-xl text-gray-600">
                  {getTranslation("newsDescription", router.locale)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap -mx-4 mt-5">
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
  if (!content || typeof content !== "string") {
    return ""; // or return some default value
  }

  const words = content.split(/\s+/); // splits by spaces
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "..."; // truncates and adds an ellipsis
  }
  return content;
}

export function formatDate(dt) {
  const padL = (nr, len = 2, chr = `0`) => `${nr}`.padStart(2, chr);

  return `${padL(dt.getDate())}-${padL(dt.getMonth() + 1)}-${dt.getFullYear()}`;
}

export async function getStaticProps({ params, locale }) {
  try {
    const {
      data: { news },
    } = await client.query({
      query: GET_ALL_NEWS,
      fetchPolicy:
        process.env.NODE_ENV === "development" ? "no-cache" : "cache-first",
      variables: {
        type: [params.newsType],
        locale,
      },
    });

    return {
      props: {
        news: mergeLocalizationsArray(news),
      },
    };
  } catch (e) {
    console.log(JSON.stringify(e, null, 4));
    return { props: { news: [] } }; // Return an empty array if there is an error
  }
}

const GET_ALL_NEWS = gql`
  query AllNews($type: [NewsTypes!], $locale: Locale!) {
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
      localizations(locales: [$locale]) {
        title
        description
      }
    }
  }
`;

export async function getStaticPaths() {
  try {
    const { data } = await client.query({
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

    if (!data || !data.__type || !data.__type.enumValues) {
      throw new Error(
        "The query did not return the expected `enumValues` data."
      );
    }

    // Logging to see what enumValues we received
    console.log("Enum Values:", data.__type.enumValues);

    const paths = data.__type.enumValues.flatMap((type) => {
      if (!type.name) {
        console.warn("Undefined 'name' for type:", type);
        return []; // Skip this type if 'name' is undefined
      }
      return ["vi", "en"].map((locale) => ({
        params: { slug: type.name }, // Ensure that 'slug' matches your page file structure
        locale,
      }));
    });

    return { paths, fallback: false };
  } catch (error) {
    console.error("Error in getStaticPaths: ", error);
    return { paths: [], fallback: false };
  }
}

export default News;
