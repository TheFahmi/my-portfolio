"use client";

import { motion } from "framer-motion";
import { useId } from "react";

interface WaveSectionDividerProps {
  fromColor?: string;
  toColor?: string;
  flip?: boolean;
  animated?: boolean;
  className?: string;
}

export const WaveSectionDivider = ({
  fromColor = "#FAF8F3",
  toColor = "#F5F1E8",
  flip = false,
  animated = true,
  className = "",
}: WaveSectionDividerProps) => {
  const gradientId = useId();
  
  const wavePathNormal = "M0,64 C240,96 480,32 720,64 C960,96 1200,32 1440,64 L1440,120 L0,120 Z";
  const wavePathFlipped = "M0,56 C240,88 480,24 720,56 C960,88 1200,24 1440,56 L1440,0 L0,0 Z";
  
  const path = flip ? wavePathFlipped : wavePathNormal;

  if (!animated) {
    return (
      <div className={`w-full overflow-hidden leading-none ${className}`}>
        <svg
          viewBox="0 0 1440 120"
          className="relative block w-full h-16 md:h-24 lg:h-32"
          preserveAspectRatio="none"
        >
          <defs>
          <linearGradient id={gradientId} x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor={fromColor} />
            <stop offset="100%" stopColor={toColor} />
          </linearGradient>
          </defs>
          <path d={path} fill={`url(#${gradientId})`} />
        </svg>
      </div>
    );
  }

  return (
    <div className={`w-full overflow-hidden leading-none ${className}`}>
      <svg
        viewBox="0 0 1440 120"
        className="relative block w-full h-16 md:h-24 lg:h-32"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor={fromColor} />
            <stop offset="100%" stopColor={toColor} />
          </linearGradient>
        </defs>
        <motion.path
          d={path}
          fill={`url(#${gradientId})`}
          animate={{
            d: [
              path,
              flip 
                ? "M0,48 C240,80 480,16 720,48 C960,80 1200,16 1440,48 L1440,0 L0,0 Z"
                : "M0,80 C240,112 480,48 720,80 C960,112 1200,48 1440,80 L1440,120 L0,120 Z",
              path,
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>
    </div>
  );
};

interface SectionDividerProps {
  variant?: "wave" | "curve" | "angle" | "fade";
  fromColor?: string;
  toColor?: string;
  flip?: boolean;
  animated?: boolean;
  className?: string;
}

export const SectionDivider = ({
  variant = "wave",
  fromColor = "#FAF8F3",
  toColor = "#3D3229",
  flip = false,
  animated = false,
  className = "",
}: SectionDividerProps) => {
  const gradientId = useId();
  
  const wavePathNormal = "M0,64 C240,96 480,32 720,64 C960,96 1200,32 1440,64 L1440,120 L0,120 Z";
  const wavePathFlipped = "M0,56 C240,88 480,24 720,56 C960,88 1200,24 1440,56 L1440,0 L0,0 Z";

  const curvePath = flip
    ? "M0,160 C320,300 420,0 1440,160 L1440,320 L0,320 Z"
    : "M0,160 C320,0 420,300 1440,160 L1440,0 L0,0 Z";

  const anglePath = flip
    ? "M0,64 L1440,224 L1440,320 L0,320 Z"
    : "M0,224 L1440,64 L1440,0 L0,0 Z";

  const paths = {
    wave: flip ? wavePathFlipped : wavePathNormal,
    curve: curvePath,
    angle: anglePath,
  };

  if (variant === "fade") {
    return (
      <div
        className={`w-full h-24 md:h-32 bg-gradient-to-b from-[${fromColor}] to-[${toColor}] ${className}`}
        style={{ background: `linear-gradient(to bottom, ${fromColor}, ${toColor})` }}
      />
    );
  }

  const viewBox = variant === "wave" ? "0 0 1440 120" : "0 0 1440 320";

  return (
    <div className={`w-full overflow-hidden leading-none ${className}`}>
      <svg
        viewBox={viewBox}
        className="relative block w-full h-16 md:h-24 lg:h-32"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor={fromColor} />
            <stop offset="100%" stopColor={toColor} />
          </linearGradient>
        </defs>
        <path d={paths[variant]} fill={`url(#${gradientId})`} />
      </svg>
    </div>
  );
};

export default SectionDivider;
