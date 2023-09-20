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
      <div className='transition-background text-white flex justify-center flex-col items-center h-full'>
 <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        'PV Pharma',
        5000, // wait 1s before replacing "Mice" with "Hamsters"
      ]}
      wrapper="span"
      speed={25}
      style={{ fontSize: '2em', display: 'inline-block' }}
    />
      </div>
    </AnimatePresence>
  );
};

export default Transition;
