import Image from 'next/image';
import { useState } from 'react';

export const Product = ({ name, image, description, index }) => {
  const colorNames = ['#0089CE', '#02324a', '#39718e'];
  const [fullText, setFullText] = useState(false);

  function onClick() {
    setFullText(!fullText);
  }

  let text = description;
  if (!fullText) {
    if (description.length > 180) {
      text = `${description.substring(0, 180)}...`;
    }
  }
  return (
    <div className='flex flex-col items-center justify-center space-y-4 group'>
      <h4 className='text-[#606060] text-[15px] uppercase'>{name}</h4>
      <div className='w-[100%] relative rounded-2xl items-center flex max-w-[550px] bg-[#0089CE] flex-col overflow-hidden'>
        <Image
          src={image}
          width={550}
          height={650}
          className='rounded-tl-2xl rounded-tr-2xl'
          alt='product'
        />
        <div
          style={{
            backgroundColor: colorNames[index],
          }}
          className='absolute h-fit flex items-center bottom-[0rem] group-hover:bottom-[0] group-hover:h-full bg-primary/[.90] transition: ;
        -all duration-300 transform '
          onMouseEnter={onClick}
          onMouseLeave={onClick}
        >
          <p className='text-white text-center my-4 w-3/4 mx-auto'>{text}</p>
        </div>
      </div>
    </div>
  );
};
