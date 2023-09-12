import Image from 'next/image';
import React from 'react';
import NextArrow from '../../../public/next.svg';
import PreviousArrow from '../../../public/previous.svg';

export const PrevButton = ({ className }) => {
  return (
    <button
      className={`rounded-[50%] p-4 border-2 border-[#CFD1D2] ${className}`}
      type='button'
    >
      <Image src={PreviousArrow} width={28} height={24} alt='Previous button' />
    </button>
  );
};

export const NextButton = ({ className }) => {
  return (
    <button
      className={`rounded-[50%] p-4 border-2 border-[#CFD1D2] ${className}`}
      type='button'
    >
      <Image src={NextArrow} width={28} height={24} alt='Previous button' />
    </button>
  );
};
