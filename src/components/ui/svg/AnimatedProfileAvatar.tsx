"use client";

import { motion } from 'framer-motion';

const AnimatedProfileAvatar = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`relative flex items-center justify-center bg-slate-100 dark:bg-slate-900 overflow-hidden ${className}`}>

      {/* Background Matrix/Grid Effect */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px]"
          animate={{ backgroundPosition: ["0px 0px", "14px 24px"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <svg viewBox="0 0 200 200" className="w-3/4 h-3/4 z-10 overflow-visible">
        <defs>
          <linearGradient id="profileGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
          <mask id="cutout">
            <rect x="0" y="0" width="200" height="200" fill="white" />
            <circle cx="100" cy="90" r="30" fill="black" />
          </mask>
        </defs>

        {/* Orbiting Elements - representing active multitasking */}
        <motion.circle
          cx="100" cy="100" r="80"
          stroke="#e2e8f0" strokeWidth="1" fill="none"
          strokeDasharray="4 4"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />

        <motion.g animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} style={{ originX: "100px", originY: "100px" }}>
          <circle cx="180" cy="100" r="4" fill="#64748b" />
          <circle cx="20" cy="100" r="4" fill="#64748b" />
        </motion.g>

        {/* Head/Brain */}
        <motion.circle
          cx="100" cy="85" r="35"
          fill="url(#profileGradient)"
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Glasses / Visor (Tech Focus) */}
        <motion.rect
          x="75" y="80" width="50" height="10" rx="4"
          fill="#0f172a"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Shoulders / Body */}
        <path
          d="M50 170 C50 140, 60 130, 100 130 C140 130, 150 140, 150 170 L150 200 L50 200 Z"
          fill="#94a3b8"
          opacity="0.8"
        />

        {/* Laptop/Screen Base */}
        <rect x="40" y="170" width="120" height="10" rx="2" fill="#334155" />
        <path d="M60 170 L140 170 L130 150 L70 150 Z" fill="#64748b" opacity="0.5" />

      </svg>

      {/* Floating Code Symbols */}
      <motion.div
        className="absolute top-10 right-10 text-slate-500 font-bold text-lg"
        animate={{ y: [0, -10, 0], opacity: [0, 1, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        {"</>"}
      </motion.div>
      <motion.div
        className="absolute bottom-20 left-10 text-slate-600 font-bold text-lg"
        animate={{ y: [0, -10, 0], opacity: [0, 1, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
      >
        {"{}"}
      </motion.div>

    </div>
  );
};

export default AnimatedProfileAvatar;
