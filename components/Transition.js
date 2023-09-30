import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import localFont from 'next/font/local';
import { TypeAnimation } from 'react-type-animation';

//variants
const staggerContainer = (staggerChildren, delayChildren) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

const transitionVariants = {
  animate: {
    y: '-100%',
    height: '100%',
  },
  initial: {
    y: '0%',
  },
  exit: {
    x: ['0%', '100%'],
    width: ['0%', '100%'],
  },
};

const fadeInVariants = {
  initial: { opacity: 0, y: 100 },
  animate: { opacity: 1, y: 50 },
};

const fadeInVariantsLeft = {
  initial: { opacity: 0, x: -150 },
  animate: { opacity: 1, x: 25 },
};

const fadeInVariantsRight = {
  initial: { opacity: 0, x: 200 },
  animate: { opacity: 1, x: 0 },
};

const utm = localFont({ src: '../public/font/utm.ttf' });

const Transition = () => {
  
  useEffect(() => {
    // Disable scrolling on component mount
    document.body.style.overflow = 'hidden';
  }, []);

    const handleAnimationComplete = () => {
      // Re-enable scrolling once the transition animation completes
      document.body.style.overflow = '';
    };

  return (
    <AnimatePresence>
      {/* <motion.div
        variants={transitionVariants}
        initial='initial'
        animate='animate'
        exit='exit'
        transition={{ delay: 5, duration: 0.75, ease: 'easeInOut' }}
        className='bg-[#0089CE] flex justify-center items-center h-full w-full fixed top-0 left-0'
      ></motion.div> */}
      <motion.div
        variants={transitionVariants}
        initial='initial'
        animate='animate'
        exit='exit'
        transition={{ delay: 4, duration: 1, ease: 'easeInOut' }}
        onAnimationComplete={handleAnimationComplete}
        className='transition-background text-white flex justify-center items-center h-full w-full fixed top-0 left-0'
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <motion.div
            initial='initial'
            animate='animate'
            exit='exit'
            variants={fadeInVariantsLeft}
            className='absolute top-0 left-0'
            transition={{ delay: 2, duration: 1.5, ease: 'easeInOut' }}
          >
            <h1
              className={` ml-10 text-[120px] opacity-10 text-pharma ${utm.className}`}
            >
              PV PHARMA
            </h1>
          </motion.div>
          <TypeAnimation
            sequence={[
              'PV PHARMA',
              5000, // wait 5s before continuing to the next sequence
            ]}
            cursor={false}
            wrapper='span'
            speed={7.5}
            style={{
              fontSize: '80px',
              display: 'inline-block',
              marginBottom: '90px',
            }}
            className={utm.className}
          />
          <div>
            <motion.div
              initial='initial'
              animate='animate'
              exit='exit'
              variants={fadeInVariants}
              transition={{ delay: 1, duration: 1, ease: 'easeInOut' }}
            >
              <h4
                className={`text-white uppercase text-[25px] -mt-[15rem] ml-[7px]`}
              >
                GIÁ TRỊ CỦA SỐNG KHỎE
              </h4>
            </motion.div>
          </div>
          <motion.div
            initial='initial'
            animate='animate'
            exit='exit'
            variants={fadeInVariantsRight}
            className='absolute bottom-0 right-0'
            transition={{ delay: 2, duration: 1.5, ease: 'easeInOut' }}
          >
            <h1
              className={` mr-10 text-[120px] opacity-20 text-pharma ${utm.className}`}
            >
              PV PHARMA
            </h1>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Transition;
