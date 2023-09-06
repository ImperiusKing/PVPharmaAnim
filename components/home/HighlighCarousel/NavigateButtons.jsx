import Image from 'next/image';
import React from 'react';
import NextArrow from '../../../public/next.svg';
import PreviousArrow from '../../../public/previous.svg';

export const PrevButton = ({ onClick }) => {
  return (
    <button
      className='rounded-[50%] p-4 border-2 border-[#CFD1D2]'
      type='button'
      onClick={onClick}
    >
      <Image src={PreviousArrow} width={33} height={24} alt='Previous button' />
    </button>
  );
};

export const NextButton = ({ onClick }) => {
  return (
    <button
      className='rounded-[50%] p-4 border-2 border-[#CFD1D2]'
      type='button'
      onClick={onClick}
    >
      <Image src={NextArrow} width={33} height={24} alt='Previous button' />
    </button>
  );
};
