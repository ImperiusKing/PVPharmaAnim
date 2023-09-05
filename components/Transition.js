import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

//variants
const transitionVariants = {
  initial: {
    x: '100%',
    width: '100%',
  },
  animate: {
    x: '0%',
  },
  exit: {
    x: ['0%', '100%'],
    width: ['0%', '100%'],
  },
};

const fadeInVariants = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0 },
};

const Transition = () => {
  return (
    <AnimatePresence>
      <motion.div
        className='fixed top-0 bottom 0 right-full h-screen z-30 bg-[#FFFFFF]'
        variants={transitionVariants}
        initial='initial'
        animate='animate'
        exit='exit'
        transition={{ delay: 3.5, duration: 2, ease: 'easeInOut' }}
      >
        <div className='flex justify-center flex-col items-center h-full'>
          <div className='flex items-center gap-4'>
            <div className='flex flex-col text-left'>
              <motion.div
                initial='initial'
                animate='animate'
                exit='exit'
                variants={fadeInVariants}
                transition={{ delay: 1, duration: 1, ease: 'easeInOut' }}
              >
                <h2 className='text-primary font-bold font-lemonMilk-bold uppercase text-[6.8rem]'>
                  Phúc
                </h2>
              </motion.div>
              <motion.div
                initial='initial'
                animate='animate'
                exit='exit'
                variants={fadeInVariants}
                transition={{ delay: 2, duration: 1, ease: 'easeInOut' }}
              >
                <h4 className='text-black font-lemonMilk uppercase text-[1rem] -mt-[2.5rem] ml-[7px]'>
                  Pharmaceuticals
                </h4>
              </motion.div>
            </div>
            <motion.div
              initial='initial'
              animate='animate'
              exit='exit'
              variants={fadeInVariants}
              transition={{ delay: 0.5, duration: 1, ease: 'easeInOut' }}
            >
              <Image
                src='/PhucVinh_Logo PNG-03.png'
                width={200}
                height={200}
                alt=''
              />
            </motion.div>
            <div className='flex flex-col text-right'>
              <motion.div
                initial='initial'
                animate='animate'
                exit='exit'
                variants={fadeInVariants}
                transition={{ delay: 1.5, duration: 1, ease: 'easeInOut' }}
              >
                <h2 className='text-primary font-bold font-lemonMilk-bold uppercase text-[6.8rem]'>
                  Vinh
                </h2>
              </motion.div>
              <motion.div
                initial='initial'
                animate='animate'
                exit='exit'
                variants={fadeInVariants}
                transition={{ delay: 2.5, duration: 1, ease: 'easeInOut' }}
              >
                <h4 className='text-black font-lemonMilk uppercase text-[1rem] -mt-[2.5rem] mr-[7px]'>
                  Since 2003
                </h4>
              </motion.div>
            </div>
          </div>
          {}
        </div>
        {}
      </motion.div>
      <motion.div
        className='fixed top-0 bottom 0 right-full h-screen z-20 bg-[#3b2d71]'
        variants={transitionVariants}
        initial='initial'
        animate='animate'
        exit='exit'
        transition={{ delay: 0.4, duration: 0.6, ease: 'easeInOut' }}
      ></motion.div>
      <motion.div
        className='fixed top-0 bottom 0 right-full h-screen z-10 bg-[#4b3792]'
        variants={transitionVariants}
        initial='initial'
        animate='animate'
        exit='exit'
        transition={{ delay: 0.6, duration: 0.6, ease: 'easeInOut' }}
      ></motion.div>
    </AnimatePresence>
  );
};

export default Transition;
