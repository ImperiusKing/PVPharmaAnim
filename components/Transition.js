import { motion } from 'framer-motion';
import Image from 'next/image';

//variants
const transitionVariants = {
  initial: {
    x: '100%',
    width: '100%',
  },
  animate: {
    x: '0%',
    width: '0%',
  },
  exit: {
    x: ['0%', '100%'],
    width: ['0%', '100%'],
  },
};

const Transition = () => {
  return (
    <>
      <motion.div
        className='fixed top-0 bottom 0 right-full h-screen z-30 bg-[#FFFFFF]'
        variants={transitionVariants}
        initial='initial'
        animate='animate'
        exit='exit'
        transition={{ delay: 100000, duration: 0.6, ease: 'easeInOut' }}
      >
        <div className='flex justify-center flex-col items-center h-full'>
          <div className='flex items-center gap-4'>
            <div className='flex flex-col text-left'>
              <h2 className='text-primary font-bold font-lemonMilk-bold uppercase text-[8rem]'>
                Phúc
              </h2>
              <h4 className='text-black font-lemonMilk uppercase -mt-[2.5rem] ml-[5px]'>
                Pharmaceuticals
              </h4>
            </div>
            <Image
              src='/PhucVinh_Logo PNG-03.png'
              width={400}
              height={400}
              alt=''
            />
            <div className='flex flex-col text-right'>
              <h2 className='text-primary font-bold font-lemonMilk-bold uppercase text-[8rem]'>
                Vinh
              </h2>
              <h4 className='text-black font-lemonMilk uppercase -mt-[2.5rem] mr-[5px]'>
                Since 2003
              </h4>
            </div>
          </div>
          {/* <svg width="100%" height="100%" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
            <text
              x="226"
              y="351"
              fill="#1F4C75"
              fontFamily="LemonMilk"
              fontWeight="bold"
              fontSize="180"
            >
              Your Text Here
            </text>
          </svg> */}
        </div>
        {/* <div className='flex justify-center items-center h-full'>
          <Image
            src='/PhucVinh_Logo PNG-03.png'
            width={300}
            height={300}
            alt=''
          />
        </div> */}
      </motion.div>
      <motion.div
        className='fixed top-0 bottom 0 right-full h-screen z-20 bg-[#3b2d71]'
        variants={transitionVariants}
        initial='initial'
        animate='animate'
        exit='exit'
        transition={{ delay: 0.4, duration: 0.6, ease: 'easeInOut' }}
      >
        1
      </motion.div>
      <motion.div
        className='fixed top-0 bottom 0 right-full h-screen z-10 bg-[#4b3792]'
        variants={transitionVariants}
        initial='initial'
        animate='animate'
        exit='exit'
        transition={{ delay: 0.6, duration: 0.6, ease: 'easeInOut' }}
      ></motion.div>
    </>
  );
};

export default Transition;
