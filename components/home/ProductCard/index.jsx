import Image from 'next/image';

export const Product = ({ name, image, description }) => {
  return (
    <div className='flex flex-col items-center space-y-4'>
      <h4 className='text-[#606060] text-lg uppercase'>{name}</h4>
      <div className='w-full rounded-2xl items-center flex max-w-[550px] bg-[#0089CE] flex-col'>
        <Image
          src={image}
          width={550}
          height={650}
          className='rounded-tl-2xl rounded-tr-2xl'
          alt='product'
        />
        <p className='text-white text-center my-4 w-3/4'>{description}</p>
      </div>
    </div>
  );
};
