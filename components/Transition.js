import { AnimatePresence } from 'framer-motion';
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
      <div className='transition-background text-white flex justify-center items-center h-screen w-screen fixed top-0 left-0'>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <TypeAnimation
            sequence={[
              // Same substring at the start will only be typed out once, initially
              'PVPHARMA',
              5000, // wait 1s before replacing "Mice" with "Hamsters"
            ]}
            wrapper="span"
            speed={25}
            style={{ fontSize: '3em', display: 'inline-block' }}
          />
        </div>
      </div>
    </AnimatePresence>
  );
};

export default Transition;
