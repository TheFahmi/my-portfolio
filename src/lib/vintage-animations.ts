import { Variants } from 'framer-motion';

/**
 * Vintage/Retro Animation Variants
 * Slower, more deliberate motion with ease-in-out curves
 * for a nostalgic, vintage feel.
 */

// Gentle fade + slight upward movement
export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
  }
};

// Simple fade
export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
  }
};

// Container for staggered children
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

// Gentle scale up
export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
  }
};

// Slide from left
export const slideInLeft: Variants = {
  initial: { opacity: 0, x: -30 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] }
  }
};

// Slide from right
export const slideInRight: Variants = {
  initial: { opacity: 0, x: 30 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] }
  }
};

// Page transition animation
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 15 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
  },
  exit: {
    opacity: 0,
    y: -15,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
  }
};

// Hover effect for interactive elements
export const vintageHover = {
  scale: 1.02,
  transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
};

// Tap effect for buttons
export const vintageTap = {
  scale: 0.98,
  transition: { duration: 0.1 }
};
