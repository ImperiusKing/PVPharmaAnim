import React from 'react';
import { BlogCard } from './BlogCard';

export const Blog = ({ title }) => {
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
          <BlogCard
            date='Dec 22, 2023'
            CardTitle='Meet AutoManage, the best AI management tools'
            CardDescription='Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
            image='https://i.ibb.co/Cnwd4q6/image-01.jpg'
          />
          <BlogCard
            date='Dec 22, 2023'
            CardTitle='Meet AutoManage, the best AI management tools'
            CardDescription='Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
            image='https://i.ibb.co/Y23YC07/image-02.jpg'
          />
          <BlogCard
            date='Dec 22, 2023'
            CardTitle='Meet AutoManage, the best AI management tools'
            CardDescription='Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
            image='https://i.ibb.co/7jdcnwn/image-03.jpg'
          />
        </div>
      </div>
    </section>
  );
};
