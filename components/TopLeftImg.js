import Image from "next/image";


const TopLeftImg = () => {
  return (
    <div className='absolute left-0 top-0 z-10 w-[200px] xl:w-[400px]'>
      <Image src='/PhucVinh_Logo PNG-03.png' width={400} height={400} alt='' />
    </div>
  );
};

// const TopLeftImg = () => {
//   return (
//     <div className='absolute inset-0 z-10'>
//       <Image src='/top-.png' fill alt='' />
//     </div>
//   );
// };

export default TopLeftImg;
