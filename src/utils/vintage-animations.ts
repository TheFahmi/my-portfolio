import { Variants } from 'framer-motion';

export const vintageVariants: Variants = {
  initial: { 
    opacity: 0, 
    y: 10,
    filter: 'sepia(0.5) blur(2px)',
    scale: 0.99
  },
  animate: { 
    opacity: 1, 
    y: 0,
    filter: 'sepia(0) blur(0px)',
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.43, 0.13, 0.23, 0.96] // Vintage ease
    }
  },
  exit: { 
    opacity: 0, 
    y: -10, 
    filter: 'sepia(0.5) blur(2px)',
    scale: 0.99,
    transition: {
      duration: 0.4,
      ease: 'easeIn'
    }
  }
};
