"use client";

import { motion, useSpring, useTransform, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export const AnimatedCounter = ({ 
  value, 
  suffix = "", 
  className 
}: AnimatedCounterProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const spring = useSpring(0, { 
    mass: 0.8, 
    stiffness: 75, 
    damping: 15,
  });

  const display = useTransform(spring, (current) => Math.round(current));

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, value, spring]);

  return (
    <div ref={ref} className={`flex items-baseline gap-0.5 ${className || ""}`}>
      <motion.span className="text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-200 dark:to-slate-400">
        {display}
      </motion.span>
      {suffix && (
        <span className="text-2xl font-bold text-cyan-500 dark:text-cyan-400">
          {suffix}
        </span>
      )}
    </div>
  );
};
