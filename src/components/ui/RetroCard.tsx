import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface RetroCardProps {
  children: ReactNode;
  className?: string;
  variant?: "paper" | "photo";
}

export const RetroCard = ({ children, className = "", variant = "paper" }: RetroCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.01, rotate: 0.5 }}
      className={`relative bg-[#f4e4bc] dark:bg-[#2c241b] border-2 border-[#4a3b2a] dark:border-[#d4c5a5] shadow-[4px_4px_0px_0px_rgba(74,59,42,1)] dark:shadow-[4px_4px_0px_0px_rgba(212,197,165,1)] p-6 ${className}`}
    >
      {/* Paper Texture Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-noise" />
      
      {/* Corner Accents */}
      <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#4a3b2a]/30 dark:border-[#d4c5a5]/30" />
      <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#4a3b2a]/30 dark:border-[#d4c5a5]/30" />
      <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#4a3b2a]/30 dark:border-[#d4c5a5]/30" />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#4a3b2a]/30 dark:border-[#d4c5a5]/30" />

      {children}
    </motion.div>
  );
};

export default RetroCard;
