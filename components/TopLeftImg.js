import Image from "next/image";


const TopLeftImg = () => {
  return (
    <div className='absolute left-0 top-0 z-10 w-[200px] xl:w-[400px]'>
      <Image src='/PhucVinh_Logo PNG-03.png' width={10} height={10} alt='' />
    </div>
  );
};

export default TopLeftImg;
