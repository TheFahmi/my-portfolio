"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SPLASH_DURATION = 2800; // ms before fade out starts
const SESSION_KEY = "mfah-splash-shown";

export default function SplashScreen() {
  const [show, setShow] = useState(false);
  const [phase, setPhase] = useState<"enter" | "exit">("enter");

  useEffect(() => {
    // Only show on first visit per session
    if (typeof window === "undefined") return;
    
    const alreadyShown = sessionStorage.getItem(SESSION_KEY);
    if (alreadyShown) {
      setShow(false);
      return;
    }

    setShow(true);
    document.body.style.overflow = "hidden";

    const exitTimer = setTimeout(() => {
      setPhase("exit");
    }, SPLASH_DURATION);

    const removeTimer = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem(SESSION_KEY, "1");
      document.body.style.overflow = "";
    }, SPLASH_DURATION + 800);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
      document.body.style.overflow = "";
    };
  }, []);

  if (!show) return null;

  return (
    <AnimatePresence>
      {phase === "enter" && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ backgroundColor: "#030014" }}
          exit={{
            opacity: 0,
            scale: 1.05,
            transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] },
          }}
        >
          {/* Subtle grid background */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* Radial glow behind content */}
          <motion.div
            className="absolute"
            style={{
              width: "600px",
              height: "600px",
              background:
                "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />

          {/* Main content */}
          <div className="relative flex flex-col items-center gap-8">
            {/* Geometric lines - top */}
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <motion.div
                className="h-[1px] bg-gradient-to-r from-transparent to-white/40"
                initial={{ width: 0 }}
                animate={{ width: "60px" }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
              <motion.span
                className="text-white/30 text-xs font-mono tracking-[0.3em] uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                portfolio
              </motion.span>
              <motion.div
                className="h-[1px] bg-gradient-to-l from-transparent to-white/40"
                initial={{ width: 0 }}
                animate={{ width: "60px" }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </motion.div>

            {/* Initials - MFH */}
            <div className="flex items-center gap-1">
              {"MFH".split("").map((letter, i) => (
                <motion.span
                  key={letter}
                  className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-[-0.04em] select-none"
                  style={{
                    fontFamily: "var(--font-body), 'Inter', sans-serif",
                    background:
                      "linear-gradient(180deg, #ffffff 0%, #a1a1aa 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                  initial={{ opacity: 0, y: 30, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.4 + i * 0.15,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Full name reveal */}
            <motion.div
              className="flex flex-col items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.0 }}
            >
              <motion.p
                className="text-sm sm:text-base font-light tracking-[0.2em] uppercase"
                style={{ color: "#94a3b8" }}
                initial={{ opacity: 0, letterSpacing: "0.5em" }}
                animate={{ opacity: 1, letterSpacing: "0.2em" }}
                transition={{ duration: 0.8, delay: 1.1 }}
              >
                M. Fahmi Hassan
              </motion.p>

              {/* Role with typing cursor */}
              <motion.div
                className="flex items-center gap-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 1.5 }}
              >
                <span
                  className="text-xs font-mono tracking-wider"
                  style={{ color: "#64748b" }}
                >
                  Full Stack Engineer
                </span>
                <motion.span
                  className="inline-block w-[2px] h-3 bg-white/50"
                  animate={{ opacity: [1, 0] }}
                  transition={{
                    duration: 0.7,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Geometric lines - bottom */}
            <motion.div
              className="flex items-center gap-4 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.8 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="rounded-full"
                  style={{ backgroundColor: "rgba(255,255,255,0.3)" }}
                  initial={{ width: 0, height: "2px" }}
                  animate={{
                    width: i === 1 ? "24px" : "8px",
                    height: "2px",
                  }}
                  transition={{ duration: 0.4, delay: 1.9 + i * 0.1 }}
                />
              ))}
            </motion.div>

            {/* Loading indicator */}
            <motion.div
              className="absolute -bottom-16 left-1/2 -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.0 }}
            >
              <motion.div
                className="w-8 h-[1px]"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
                }}
                animate={{
                  scaleX: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </div>

          {/* Corner accents */}
          <motion.div
            className="absolute top-8 left-8 w-8 h-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ delay: 0.8 }}
          >
            <div className="absolute top-0 left-0 w-full h-[1px] bg-white" />
            <div className="absolute top-0 left-0 w-[1px] h-full bg-white" />
          </motion.div>

          <motion.div
            className="absolute bottom-8 right-8 w-8 h-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ delay: 0.8 }}
          >
            <div className="absolute bottom-0 right-0 w-full h-[1px] bg-white" />
            <div className="absolute bottom-0 right-0 w-[1px] h-full bg-white" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
