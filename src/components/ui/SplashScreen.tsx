"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SPLASH_DURATION = 4000;
const SESSION_KEY = "mfah-splash-shown";

export default function SplashScreen() {
  const [show, setShow] = useState(false);
  const [phase, setPhase] = useState<"enter" | "exit">("enter");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const alreadyShown = sessionStorage.getItem(SESSION_KEY);
    if (alreadyShown) {
      setShow(false);
      return;
    }

    setShow(true);
    document.body.style.overflow = "hidden";

    const exitTimer = setTimeout(() => setPhase("exit"), SPLASH_DURATION);
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
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: "var(--theme-splash-bg)" }}
          exit={{
            opacity: 0,
            clipPath: "circle(0% at 50% 50%)",
            transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
          }}
        >
          {/* Ambient gradient orbs */}
          <motion.div
            className="absolute -top-1/3 -left-1/3 w-[80vmax] h-[80vmax] rounded-full"
            style={{
              background:
                "radial-gradient(circle, var(--theme-sphere-glow) 0%, transparent 60%)",
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
          />

          <motion.div
            className="absolute -bottom-1/3 -right-1/3 w-[60vmax] h-[60vmax] rounded-full"
            style={{
              background:
                "radial-gradient(circle, var(--theme-sphere-glow) 0%, transparent 60%)",
              opacity: 0.5,
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.5, scale: 1 }}
            transition={{ duration: 2.5, ease: "easeOut", delay: 0.3 }}
          />

          {/* Main content */}
          <div className="relative flex flex-col items-center gap-6">
            {/* Logo mark: stacked geometric shapes */}
            <motion.div
              className="relative w-20 h-20 sm:w-24 sm:h-24"
              initial={{ opacity: 0, rotate: -20, scale: 0.6 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                className="absolute inset-0"
                style={{
                  border: "2px solid var(--theme-fg-dim)",
                  transform: "rotate(45deg)",
                  borderRadius: "4px",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              />
              <motion.div
                className="absolute inset-4"
                style={{
                  border: "2px solid var(--theme-fg)",
                  borderRadius: "3px",
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.6, ease: "backOut" }}
              />
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.5 }}
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: "var(--theme-fg)" }}
                />
              </motion.div>
            </motion.div>

            {/* Name: clean stacked */}
            <motion.div
              className="flex flex-col items-center gap-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3, ease: "easeOut" }}
            >
              <h1
                className="text-2xl sm:text-3xl font-semibold tracking-tight"
                style={{
                  fontFamily: "var(--font-body), 'Inter', sans-serif",
                  color: "var(--theme-fg)",
                }}
              >
                M. Fahmi Hassan
              </h1>
              <p
                className="text-xs sm:text-sm font-mono tracking-widest uppercase"
                style={{ color: "var(--theme-splash-muted)" }}
              >
                Full Stack Engineer
              </p>
            </motion.div>

            {/* Loading bar */}
            <motion.div
              className="w-32 h-[1px] mt-2 overflow-hidden rounded-full"
              style={{ backgroundColor: "var(--theme-splash-muted)", opacity: 0.15 }}
            >
              <motion.div
                className="h-full w-full"
                style={{ backgroundColor: "var(--theme-fg)" }}
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
