import { AnimatePresence, motion } from 'framer-motion';
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
    y: '100%',
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

const Transition = () => {
  return (
    <AnimatePresence>
      <motion.div
        variants={transitionVariants}
        initial='initial'
        animate='animate'
        exit='exit'
        transition={{ delay: 3.5, duration: 1000, ease: 'easeInOut' }}
        className='transition-background text-white flex justify-center items-center h-full w-full fixed top-0 left-0'
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <h1 className='absolute top-0 left-0 text-8xl opacity-[0.4] text-pharma'>
            PV Pharma
          </h1>
          <TypeAnimation
            sequence={[
              // Same substring at the start will only be typed out once, initially
              'PVPHARMA',
              5000, // wait 1s before replacing "Mice" with "Hamsters"
            ]}
            cursor={false}
            wrapper='span'
            speed={25}
            style={{ fontSize: '3em', display: 'inline-block' }}
          />
          <div>
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
          <h1 className='absolute top-[60vh] right-0 text-8xl opacity-[0.4] text-pharma'>
            PV Pharma
          </h1>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Transition;
