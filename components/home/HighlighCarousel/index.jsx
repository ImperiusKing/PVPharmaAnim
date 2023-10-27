import React from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { EffectCoverflow, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { NextButton, PrevButton } from './NavigateButtons';

export const HighlightCarousel = ({ highlights }) => {
  return (
    <div className='highlight-container'>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides
        loop={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{ el: '.swiper-pagination', clickable: true }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          clickable: true,
        }}
        modules={[EffectCoverflow, Navigation]}
        className='swiper_container'
      >
        {highlights.map((highlight, index) => (
          <SwiperSlide key={`${highlight.image.id}-${index}`}>
            <div
              key={highlight.image.id}
              className={`flex flex-col space-y-4 transition-all w-full flex-[0_0_auto] min-w-0 items-center`}
            >
              <div className='rounded-xl w-[500px] h-[350px] border-[#DBDCDD] w-full flex items-center justify-center'>
                <div
                  style={{ '--image-url': `url(${highlight.image.url})` }}
                  className='w-[90%] h-[90%] bg-[image:var(--image-url)] bg-contain bg-no-repeat'
                />
              </div>
              <h4 className='text-[15px]'>{highlight.title}</h4>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='flex mt-[5rem] space-x-8 slider-controller'>
        <PrevButton className='swiper-button-prev slider-arrow' />
        <NextButton className='swiper-button-next slider-arrow' />
      </div>
    </div>
  );
};
