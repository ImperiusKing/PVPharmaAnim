import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import React from 'react';

export const AwardCarousel = ({ awards }) => {
  const [emblaRef] = useEmblaCarousel({ align: 'start', slidesToScroll: 1 }, [
    Autoplay(),
  ]);

  return (
    <div className='embla w-full' ref={emblaRef}>
      <div className='embla__container flex items-center w-full justify-between'>
        {awards.map((award, index) => (
          <div
            key={index}
            className='flex flex-col rounded-xl p-[5px] space-y-4 transition-all ml-8 w-[286px] h-[437px] flex-[0_0_auto] min-w-0 ml-4 items-center bg-[#E1E1E1]'
          >
            <div className='rounded-xl border-4 h-[356px] bg-white border-[#DBDCDD] w-full flex items-center justify-center'>
              <div
                style={{ '--image-url': `url(${award.image})` }}
                className='w-[80%] h-[80%] bg-[image:var(--image-url)] bg-center bg-contain bg-no-repeat'
              />
            </div>
            <h4 className='text-[#414042] max-w-[80%] text-xs text-center'>
              {award.description}
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
};
