import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import React from 'react';

export const AwardCarousel = ({ awards }) => {
  const [emblaRef] = useEmblaCarousel({ align: 'start', slidesToScroll: 1 }, [
    Autoplay(),
  ]);

  return (
    <div className='embla w-full' ref={emblaRef}>
      <div className='embla__container flex  w-full justify-between'>
        {awards.map((award, index) => (
          <div
            key={index}
            className='flex flex-col rounded-xl p-[5px] space-y-4 transition-all w-[200px] h-[250px] flex-[0_0_auto] min-w-0 ml-4 items-center bg-[#FFFFFF]'
          >
            <div className='rounded-xl h-[205px] min-h-[205px] bg-white border-[#DBDCDD] w-full flex items-center justify-center'>
              <div
                style={{ '--image-url': `url(${award.image.url})` }}
                className='w-[90%] h-[90%] bg-[image:var(--image-url)] bg-center bg-contain bg-no-repeat'
              />
            </div>
            <h4 className='text-[#414042] max-w-[90%] text-[10px] text-center'>
              {award.title}
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
};
