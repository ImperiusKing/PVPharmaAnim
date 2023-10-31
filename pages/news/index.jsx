import { gql } from "@apollo/client";
import { useState } from "react";
import client from "../../apollo-client";
import { BlogCard } from "../../components/home/Blog/BlogCard";

const News = ({ news, newsTypes }) => {
  const [selectedTypes, setSelectedTypes] = useState([...newsTypes]);

  return (
    <div className="bg-white">
      <div className="mx-auto w-full">
        <div className="relative overflow-hidden bg-[#F5F5F5] w-full">
          <div className="py-16">
            <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
              <div className="w-[60%] mx-auto text-center">
                <h1 className="text-4xl font-black tracking-tight text-gray-900 sm:text-6xl">
                  TIN TỨC
                </h1>
                <p className="mt-6 text-xl text-gray-600">
                  Sản phẩm của Dược Phúc Vinh được đi sâu nghiên cứu, phát triển
                  và sản xuất một cách toàn diện với sứ mệnh: Mang đến cho cộng
                  đồng những dược phẩm chất lượng, an toàn, có tác dụng phòng và
                  trị bệnh cao.
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
                    {getProductTypeLabel(type)}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap -mx-4">
          {news
            .filter((newsItem) =>
              isInSelectedTypes(newsItem.type, selectedTypes)
            )
            .map((newsItem) => (
              <BlogCard
                path={newsItem.slug}
                key={newsItem.id}
                date={formatDate(new Date(newsItem.publishedAt))}
                CardTitle={newsItem.title}
                CardDescription={truncateContent(newsItem.content)}
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
  if (words.length <= wordLimit) {
    return content;
  }
}

function getProductTypeLabel(productType) {
  switch (productType) {
    case "TinTucPhucVinh":
      return "TIN PHÚC VINH";
    case "CamNangYHoc":
      return "CẨM NANG Y HỌC";
    case "TinTucTuyenDung":
      return "TIN TỨC TUYỂN DỤNG";
    case "all":
      return "TẤT CẢ";
  }
}

export function formatDate(dt) {
  const padL = (nr, len = 2, chr = `0`) => `${nr}`.padStart(2, chr);

  return `${padL(dt.getDate())}-${padL(dt.getMonth() + 1)}-${dt.getFullYear()}`;
}

function isInSelectedTypes(newsTypes, selectedTypes) {
  return newsTypes.some(
    (type) => selectedTypes.findIndex((i) => i === type) >= 0
  );
}

export async function getStaticProps() {
  const {
    data: { news, ...rest },
  } = await client.query({
    query: GET_ALL_NEWS,
    fetchPolicy:
      process.env.NODE_ENV === "development" ? "no-cache" : "cache-first",
  });

  return {
    props: {
      news,
      newsTypes: ["all", ...rest.__type.enumValues.map((i) => i.name)],
    },
  };
}

const GET_ALL_NEWS = gql`
  query AllNews {
    news(first: 10000) {
      id
      publishedAt
      title
      type
      content
      description
      slug
      background {
        url
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
