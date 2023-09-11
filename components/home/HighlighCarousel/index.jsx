import React, { useState } from 'react';
import { NextButton, PrevButton } from './NavigateButtons';

export const HighlightCarousel = ({ highlights }) => {
  const [items, setItems] = useState(highlights);
  console.log({ highlights });
  return (
    <div className='flex items-center flex-col w-[80%]'>
      <div className=' flex items-center w-full justify-between gap-8'>
        {items.map((highlight, index) => (
          <div
            key={highlight.image.id}
            className={`flex flex-col space-y-4 transition-all w-[25%] flex-[0_0_auto] min-w-0 ml-4 items-center ${
              index === 1 ? 'scale-125' : ''
            }`}
          >
            <div className='rounded-xl border-4 h-[300px] border-[#DBDCDD] w-full flex items-center justify-center'>
              <div
                style={{ '--image-url': `url(${highlight.image.url})` }}
                className='w-[80%] h-[80%] bg-[image:var(--image-url)] bg-contain bg-no-repeat'
              />
            </div>
            <h4>{highlight.title}</h4>
          </div>
        ))}
      </div>
      <div className='flex mt-[5rem] space-x-8'>
        <PrevButton
          onClick={() => {
            const [firstItem, ...rest] = items;
            setItems([...rest, firstItem]);
          }}
        />
        <NextButton
          onClick={() => {
            const lastItem = items[items.length - 1];
            setItems([lastItem, ...items.slice(0, 2)]);
          }}
        />
      </div>
    </div>
  );
};
