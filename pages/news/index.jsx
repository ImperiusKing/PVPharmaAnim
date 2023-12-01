import { gql } from "@apollo/client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import client from "../../apollo-client";
import { BlogCard } from "../../components/home/Blog/BlogCard";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../components/Select";
import { mergeLocalizationsArray } from "../../utils/mergeLocalizations";

const translations = {
  news: {
    en: "NEWS",
    vi: "TIN TỨC",
  },
  TinTucPhucVinh: {
    en: "PHUC VINH NEWS",
    vi: "TIN PHUC VINH",
  },
  CamNangYHoc: {
    en: "HEALTH HANDBOOK",
    vi: "CẨM NANG Y HỌC",
  },
  TinTucTuyenDung: {
    en: "RECRUITMENT NEWS",
    vi: "TIN TỨC TUYỂN DỤNG",
  },
  all: {
    en: "ALL",
    vi: "TẤT CẢ",
  },
  sortOld: {
    en: "Sort oldest",
    vi: "Xếp từ cũ nhất",
  },
  sortNew: {
    en: "Sort newest",
    vi: "Xếp từ mới nhất",
  },
  newsDescription: {
    en: "Dược Phúc Vinh News Page - Your source for the latest updates in the pharmaceutical industry, featuring our standout products and breakthroughs in research and development.",
    vi: "Trang tin tức của Dược Phúc Vinh - Nơi cập nhật những thông tin mới nhất về ngành dược phẩm, các sản phẩm nổi bật, và những đột phá trong nghiên cứu và phát triển.",
  }, // Add other product types as needed
};

function getTranslation(key, locale = "en") {
  return translations[key]
    ? translations[key][locale] || translations[key]["en"]
    : "Translation not found";
}

const News = ({ news, newsTypes }) => {
  const [sortedNews, setSortedNews] = useState(news);
  const [selectedTypes, setSelectedTypes] = useState([...newsTypes]);
  const [selectedSortOption, setSelectedSortOption] = useState("newest"); // default sort option
  const router = useRouter();

  useEffect(() => {
    let sortedArray = [...news];

    if (selectedSortOption === "newest") {
      // Sort by newest first
      sortedArray.sort(
        (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
      );
    } else if (selectedSortOption === "oldest") {
      // Sort by oldest first
      sortedArray.sort(
        (a, b) => new Date(a.publishedAt) - new Date(b.publishedAt)
      );
    }

    setSortedNews(sortedArray);
  }, [selectedSortOption, news]);

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
                <p className="mt-4 text-lg leading-8.5 text-gray-500">
                  {getTranslation("newsDescription", router.locale)}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-4 pt-10">
              {newsTypes.map((type) => {
                const isActive =
                  selectedTypes.findIndex((i) => i === type) >= 0;
                return (
                  <button
                    key={type}
                    onClick={() => {
                      const index = selectedTypes.findIndex((i) => i === type);
                      if (index >= 0) {
                        if (type === "all") {
                          setSelectedTypes([]);
                          return;
                        }
                        const newSelectedTypes = [...selectedTypes].splice(
                          index,
                          1
                        );
                        setSelectedTypes(newSelectedTypes);
                      } else {
                        if (type === "all") {
                          setSelectedTypes([...newsTypes]);
                          return;
                        }
                        let newSelectedTypes = [...selectedTypes, type];
                        const allTypesSelected = newsTypes
                          .filter((i) => i !== "all")
                          .every(
                            (i) =>
                              newSelectedTypes.findIndex(
                                (item) => i === item
                              ) >= 0
                          );
                        if (allTypesSelected) {
                          newSelectedTypes = ["all", ...newSelectedTypes];
                        }
                        setSelectedTypes(newSelectedTypes);
                      }
                    }}
                    className={`${
                      isActive
                        ? "bg-primary text-white te hover:bg-white hover:text-black"
                        : "hover:bg-primary hover:text-white bg-white text-black"
                    } transition-all border-[1px] border-black px-6 py-2 rounded-full`}
                  >
                    {getNewsTypeLabel(type, router.locale)}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-5 mx-10">
          <Select
            value={selectedSortOption}
            onValueChange={setSelectedSortOption}
          >
            <SelectTrigger className="w-[150px] font-medium text-md">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectGroup>
                <SelectItem value="newest">
                  {getTranslation("sortNew", router.locale)}
                </SelectItem>
                <SelectItem value="oldest">
                  {getTranslation("sortOld", router.locale)}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-wrap -mx-4 mt-5">
          {sortedNews
            .filter((newsItem) =>
              isInSelectedTypes(newsItem.type, selectedTypes)
            )
            .map((newsItem) => (
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
    return words.slice(0, wordLimit).join(" ") + " ..."; // truncates and adds an ellipsis
  }
  return content;
}

export function formatDate(dt) {
  const padL = (nr, len = 2, chr = `0`) => `${nr}`.padStart(2, chr);

  return `${padL(dt.getDate())}-${padL(dt.getMonth() + 1)}-${dt.getFullYear()}`;
}

function getNewsTypeLabel(newsTypes, locale = "en") {
  return getTranslation(newsTypes, locale);
}

function isInSelectedTypes(newsTypes, selectedTypes) {
  return newsTypes.some(
    (type) => selectedTypes.findIndex((i) => i === type) >= 0
  );
}

export async function getStaticProps({ locale }) {
  const {
    data: { news, ...rest },
  } = await client.query({
    query: GET_ALL_NEWS,
    fetchPolicy:
      process.env.NODE_ENV === "development" ? "no-cache" : "cache-first",
    variables: {
      locale,
    },
  });

  return {
    props: {
      news: mergeLocalizationsArray(news),
      newsTypes: ["all", ...rest.__type.enumValues.map((i) => i.name)],
    },
  };
}

const GET_ALL_NEWS = gql`
  query AllNews($locale: Locale!) {
    news(first: 10000) {
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
    __type(name: "NewsTypes") {
      enumValues {
        name
      }
    }
  }
`;

export default News;
