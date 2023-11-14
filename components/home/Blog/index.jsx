import React from "react";
import { formatDate, truncateContent } from "../../../pages/news";
import { BlogCard } from "./BlogCard";

export const Blog = ({ title, description, news }) => {
  return (
    <section className="pt-20  pb-10 lg:pt-[120px] lg:pb-20">
      <div className="w-full">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4">
            <div className="mx-auto mb-[60px] max-w-[600px] text-center lg:mb-20">
              <h4 className="uppercase font-bold text-[#414042] text-[45px]">
                {title}
              </h4>
              <p className="mt-6 text-xl text-gray-600">{description}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap -mx-4">
          {news.map((item) => (
            <BlogCard
              key={item.id}
              date={formatDate(new Date(item.publishedAt))}
              CardTitle={item.title}
              CardDescription={truncateContent(item.description)}
              image={item.background.url}
              path={item.slug}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
