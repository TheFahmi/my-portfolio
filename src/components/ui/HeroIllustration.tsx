"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const floatingVariants = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const floatVariants2 = {
  animate: {
    y: [-15, 15, -15],
    x: [-5, 5, -5],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 0.5
    }
  }
};

const pulseVariants = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.8, 1, 0.8],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const rotateVariants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

const techItems = [
  { name: "React", color: "#61DAFB", x: "10%", y: "20%", delay: 0 },
  { name: "Next.js", color: "#000000", x: "80%", y: "15%", delay: 0.2 },
  { name: "TypeScript", color: "#3178C6", x: "75%", y: "75%", delay: 0.4 },
  { name: "Node.js", color: "#339933", x: "15%", y: "70%", delay: 0.6 },
  { name: "Tailwind", color: "#06B6D4", x: "85%", y: "45%", delay: 0.8 },
];

const TechIcon = ({ name, color, delay }: { name: string; color: string; delay: number }) => {
  const icons: Record<string, React.ReactElement> = {
    React: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 13.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"/>
        <path fillRule="evenodd" d="M12 8c3.079 0 6.162 1.787 8.414 4.586-1.135 1.414-2.37 2.6-3.642 3.466-2.263 1.534-4.94 2.448-7.772 2.448-2.832 0-5.509-.914-7.772-2.448-1.272-.866-2.507-2.052-3.642-3.466C1.838 9.787 4.921 8 8 8c1.141 0 2.262.205 3.293.59a.75.75 0 0 0 .414-1.44A11.93 11.93 0 0 0 8 6.5c-3.579 0-7.162 2.087-9.789 5.414a.75.75 0 0 0 0 .972C1.066 16.463 4.446 19.5 8 19.5c3.554 0 6.934-3.037 8.789-5.614a.75.75 0 0 0-1.178-.928C14.122 15.091 11.209 18 8 18c-2.833 0-5.511-2.23-7.246-4.586C2.469 11.14 5.188 9.5 8 9.5c1.297 0 2.553.273 3.714.792a.75.75 0 1 0 .572-1.384A9.43 9.43 0 0 0 8 8Z" clipRule="evenodd"/>
      </svg>
    ),
    "Next.js": (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10Z"/>
      </svg>
    ),
    TypeScript: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M3 3h18v18H3V3Zm10.5 13.5v-1.8H9v1.2h1.5V18h1.5v-1.5h3v-1.2h-3v-.8h1.5v-1.2h-3V12h3v-1.2h-4.5v1.2H9v1.2H7.5V15H9v1.5h4.5Zm3-6h1.5v-1.2h-4.5V12h1.5v3h1.5v-3Z"/>
      </svg>
    ),
    "Node.js": (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 2L2 7.5v9L12 22l10-5.5v-9L12 2Zm0 2.18L19.82 8.5 12 12.82 4.18 8.5 12 4.18ZM4 10.09l7 3.82v6.99l-7-3.82v-6.99Zm9 10.81v-6.99l7-3.82v6.99l-7 3.82Z"/>
      </svg>
    ),
    Tailwind: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
      </svg>
    )
  };

  return (
    <motion.div
      variants={floatingVariants}
      animate="animate"
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ scale: 1.2, rotate: 10 }}
      className="absolute w-10 h-10 md:w-12 md:h-12 p-2 rounded-xl bg-white/90 dark:bg-slate-800/90 shadow-lg border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm cursor-pointer z-20"
      style={{ color }}
    >
      {icons[name] || <span className="text-xs font-bold">{name[0]}</span>}
    </motion.div>
  );
};

const CodeWindow = () => {
  const lines = [
    { text: "const developer = {", color: "text-purple-400" },
    { text: "  name: 'Fahmi',", color: "text-cyan-400" },
    { text: "  role: 'Full Stack',", color: "text-green-400" },
    { text: "  passion: true", color: "text-yellow-400" },
    { text: "};", color: "text-purple-400" },
  ];

  return (
    <motion.div
      variants={floatVariants2}
      animate="animate"
      className="absolute bottom-[15%] right-[10%] w-48 md:w-56 bg-slate-900/95 rounded-xl p-4 shadow-2xl border border-slate-700/50 backdrop-blur-md z-20"
    >
      <div className="flex gap-1.5 mb-3">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500"/>
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"/>
        <div className="w-2.5 h-2.5 rounded-full bg-green-500"/>
      </div>
      <div className="font-mono text-xs md:text-sm space-y-1">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 + i * 0.1 }}
            className={line.color}
          >
            {line.text}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const DecorativeCircles = () => (
  <>
    <motion.div
      variants={rotateVariants}
      animate="animate"
      className="absolute inset-0"
    >
      <svg className="w-full h-full" viewBox="0 0 400 400">
        <circle
          cx="200"
          cy="200"
          r="180"
          fill="none"
          stroke="url(#gradient1)"
          strokeWidth="1"
          strokeDasharray="10 10"
          opacity="0.3"
        />
        <circle
          cx="200"
          cy="200"
          r="150"
          fill="none"
          stroke="url(#gradient2)"
          strokeWidth="1"
          strokeDasharray="5 15"
          opacity="0.2"
        />
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06B6D4"/>
            <stop offset="100%" stopColor="#8B5CF6"/>
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6"/>
            <stop offset="100%" stopColor="#06B6D4"/>
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
    
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 rounded-full bg-cyan-400/60"
        style={{
          left: `${20 + i * 15}%`,
          top: `${15 + (i % 3) * 25}%`,
        }}
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 3 + i * 0.5,
          repeat: Infinity,
          delay: i * 0.3,
        }}
      />
    ))}
  </>
);

export const HeroIllustration = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          variants={pulseVariants}
          animate="animate"
          className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full bg-gradient-to-br from-cyan-400/20 to-purple-500/20 blur-3xl"
        />
      </div>

      <div className="absolute inset-8 md:inset-12">
        <DecorativeCircles />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="relative w-48 h-48 md:w-64 md:h-64">
          <motion.div
            whileHover={{ scale: 1.05, rotateY: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-full h-full rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 shadow-2xl flex items-center justify-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10" />
            
            <div className="relative z-10 text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-4"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <defs>
                    <linearGradient id="iconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#06B6D4"/>
                      <stop offset="100%" stopColor="#8B5CF6"/>
                    </linearGradient>
                  </defs>
                  <path
                    d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z"
                    fill="none"
                    stroke="url(#iconGrad)"
                    strokeWidth="3"
                  />
                  <text x="50" y="60" textAnchor="middle" fill="url(#iconGrad)" fontSize="30" fontWeight="bold"></text>
                </svg>
              </motion.div>
              
              <p className="text-cyan-400 font-bold text-lg md:text-xl">Dev</p>
              <p className="text-slate-400 text-sm">Mode: ON</p>
            </div>

            <motion.div
              className="absolute inset-0 rounded-3xl"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.3), transparent)",
              }}
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute -left-4 top-1/4 bg-slate-800/90 backdrop-blur-sm rounded-lg p-2 border border-slate-700/50 shadow-lg"
          >
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs text-slate-300 font-medium">Online</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="absolute -right-4 bottom-1/4 bg-slate-800/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-slate-700/50 shadow-lg"
          >
            <span className="text-xs text-cyan-400 font-mono"></span>
          </motion.div>
        </div>
      </motion.div>

      {techItems.map((tech, i) => (
        <div
          key={tech.name}
          style={{ left: tech.x, top: tech.y }}
          className="absolute"
        >
          <TechIcon {...tech} />
        </div>
      ))}

      <CodeWindow />

      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
        <line x1="50%" y1="50%" x2="15%" y2="25%" stroke="#06B6D4" strokeWidth="1" strokeDasharray="5 5">
          <animate attributeName="stroke-dashoffset" from="0" to="10" dur="2s" repeatCount="indefinite"/>
        </line>
        <line x1="50%" y1="50%" x2="85%" y2="20%" stroke="#8B5CF6" strokeWidth="1" strokeDasharray="5 5">
          <animate attributeName="stroke-dashoffset" from="0" to="10" dur="2s" repeatCount="indefinite"/>
        </line>
        <line x1="50%" y1="50%" x2="80%" y2="80%" stroke="#06B6D4" strokeWidth="1" strokeDasharray="5 5">
          <animate attributeName="stroke-dashoffset" from="10" to="0" dur="2s" repeatCount="indefinite"/>
        </line>
      </svg>
    </div>
  );
};

export default HeroIllustration;
