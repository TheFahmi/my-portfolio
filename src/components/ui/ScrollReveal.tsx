"use client";

import { motion, useInView, useAnimation, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

type AnimationVariant = "fade" | "slideUp" | "slideLeft" | "slideRight" | "scale";

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  threshold?: number;
  width?: string;
}

const getVariants = (variant: AnimationVariant, shouldReduceMotion: boolean | null) => {
  if (shouldReduceMotion) {
    return {
      hidden: { opacity: 1 },
      visible: { opacity: 1 },
    };
  }

  const variants = {
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    slideUp: {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 },
    },
    slideLeft: {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0 },
    },
    slideRight: {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0 },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 },
    },
  };

  return variants[variant];
};

export const ScrollReveal = ({
  children,
  variant = "slideUp",
  delay = 0,
  duration = 0.5,
  className = "",
  once = true,
  threshold = 0.2, 
  width,
}: ScrollRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });
  const controls = useAnimation();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // If reduced motion is enabled, show immediately
    if (shouldReduceMotion) {
      controls.set("visible");
      return;
    }

    if (isInView) {
      controls.start("visible");
    } else if (!once) {
      controls.start("hidden");
    }
  }, [isInView, controls, once, shouldReduceMotion]);

  const selectedVariant = getVariants(variant, shouldReduceMotion);

  return (
    <motion.div
      ref={ref}
      variants={selectedVariant}
      initial={shouldReduceMotion ? "visible" : "hidden"}
      animate={controls}
      transition={{ 
        duration: shouldReduceMotion ? 0 : duration, 
        delay: shouldReduceMotion ? 0 : delay,
        ease: "easeOut" 
      }}
      className={className}
      style={{ width }}
    >
      {children}
    </motion.div>
  );
};
