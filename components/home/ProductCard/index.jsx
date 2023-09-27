import Image from 'next/image';

export const Product = ({ name, image, description }) => {
  return (
    <div className='flex flex-col items-center justify-center space-y-4 group ml-30[px]'>
      <h4 className='text-[#606060] text-[18px] text-bold text-lg uppercase'>{name}</h4>
      <div className='w-[100%] relative rounded-2xl items-center flex max-w-[550px] bg-[#0089CE] flex-col overflow-hidden'>
        <Image
          src={image}
          width={550}
          height={650}
          className='rounded-tl-2xl rounded-tr-2xl'
          alt='product'
        />
        <div class='absolute h-[2rem] -bottom-[6rem] group-hover:bottom-[0] group-hover:h-fit bg-gray-300 group-hover:bg-primary/[.90] transition
        -all duration-300 transform '>
          <p className='text-white text-center my-4 w-3/4 mx-auto'>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};
