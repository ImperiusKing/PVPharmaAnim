import React from 'react';
import { formatDate, truncateContent } from '../../../pages/news';
import { BlogCard } from './BlogCard';

export const Blog = ({ title, news }) => {
  console.log({ news: news[0].contentRichText.html });
  return (
    <section className='pt-20  pb-10 lg:pt-[120px] lg:pb-20'>
      <div className='w-full'>
        <div className='flex flex-wrap -mx-4'>
          <div className='w-full px-4'>
            <div className='mx-auto mb-[60px] max-w-[510px] text-center lg:mb-20'>
              <h4 className='uppercase font-bold text-[#414042] text-[45px]'>
                {title}
              </h4>
              <p className='text-base text-body-color'>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel
                quis neque laborum ea rem libero repudiandae perferendis, facere
                quidem, ipsa blanditiis debitis explicabo eligendi cumque ab!
                Unde nesciunt ratione nihil.
              </p>
            </div>
          </div>
        </div>

        <div className='flex flex-wrap -mx-4'>
          {news.map((item) => (
            <BlogCard
              key={item.id}
              date={formatDate(new Date(item.publishedAt))}
              CardTitle={item.title}
              CardDescription={truncateContent(item.contentRichText.html)}
              image={item.background.url}
              path={item.slug}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
