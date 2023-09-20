'use client'; 

import { motion } from 'framer-motion';

const textContainer = {
	hidden: {
	  opacity: 0,
	},
	show: (i = 1) => ({
	  opacity: 1,
	  transition: { staggerChildren: 0.1, delayChildren: i * 0.1 },
	}),
 };
 
 export const textVariant2 = {
	hidden: {
	  opacity: 0,
	  y: 20,
	},
	show: {
	  opacity: 1,
	  y: 0,
	  transition: {
		 type: 'tween',
		 ease: 'easeIn',
	  },
	},
 };

export const TypingText = ({ title, textStyles }) => (
	<motion.p
	  variants={textContainer}
	  className={`font-normal text-[14px] text-secondary-white ${textStyles ?? ''}`}
	>
	  {Array.from(title).map((letter, index) => (
		 <motion.span variants={textVariant2} key={index}>
			{letter === ' ' ? '\u00A0' : letter}
		 </motion.span>
	  ))}
	</motion.p>
 );