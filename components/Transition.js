import {motion} from 'framer-motion';
import Image from 'next/image';

//variants
const transitionVariants = {
  initial:{
    x: '100%',
    width: '100%'
  },
  animate: {
    x: '0%',
    width: '0%'
  },
  exit: {
    x: ['0%','100%'],
    width: ['0%','100%']
  },
}

const Transition = () => {
  return (
    <>
       <motion.div
      className='fixed top-0 bottom 0 right-full h-screen z-30 bg-[#FFFFFF]'
      variants={transitionVariants}
      initial='initial'
      animate='animate'
      exit='exit'
      transition={{ delay: 100, duration: 0.6, ease: 'easeInOut' }}
    >
        <div className='flex justify-center items-center h-full'>
    <     Image src='/PhucVinh_Logo PNG-03.png' width={300} height={300} alt='' /> 
        </div>
      </motion.div>
      <motion.div 
        className='fixed top-0 bottom 0 right-full h-screen z-20 bg-[#3b2d71]'
        variants={transitionVariants}
        initial='initial'
        animate='animate'
        exit='exit'
        transition={{ delay: 0.4, duration:  0.6, ease: 'easeInOut'}}
      >
        1
      </motion.div>
      <motion.div 
        className='fixed top-0 bottom 0 right-full h-screen z-10 bg-[#4b3792]'
        variants={transitionVariants}
        initial='initial'
        animate='animate'
        exit='exit'
        transition={{ delay: 0.6, duration:  0.6, ease: 'easeInOut'}}
      >
      </motion.div>
      
    </>
  );
};

export default Transition;
