"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, Variants } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [variant, setVariant] = useState<"default" | "hover" | "click">("default");

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 20, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");
    if (!mediaQuery.matches) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setVariant("click");
    const handleMouseUp = () => setVariant(variant === "hover" ? "hover" : "default");

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      const isInteractive =
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.getAttribute("role") === "button" ||
        target.classList.contains("cursor-pointer") ||
        window.getComputedStyle(target).cursor === "pointer";

      if (isInteractive) {
        setVariant("hover");
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.getAttribute("role") === "button" ||
        target.classList.contains("cursor-pointer");

      if (isInteractive) {
        setVariant("default");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, [cursorX, cursorY, isVisible, variant]);

  if (!isVisible) return null;

  const variants: Variants = {
    default: {
      height: 12,
      width: 12,
      x: -6,
      y: -6,
      backgroundColor: "var(--color-cyan-400, #22d3ee)",
      mixBlendMode: "difference",
      opacity: 1,
    },
    hover: {
      height: 48,
      width: 48,
      x: -24,
      y: -24,
      backgroundColor: "var(--color-cyan-400, #22d3ee)",
      mixBlendMode: "screen",
      opacity: 0.3,
    },
    click: {
      height: 8,
      width: 8,
      x: -4,
      y: -4,
      backgroundColor: "var(--color-cyan-400, #22d3ee)",
      mixBlendMode: "normal",
      opacity: 1,
    },
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full hidden md:block"
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
        }}
        variants={variants}
        animate={variant}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full hidden md:block w-1 h-1 bg-white mix-blend-difference"
        style={{
          translateX: cursorX,
          translateY: cursorY,
          x: -2,
          y: -2,
        }}
      />
    </>
  );
}
