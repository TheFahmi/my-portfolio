"use client";
import React from "react";
import { motion } from "framer-motion";

export const BackgroundBeams = ({ className }: { className?: string }) => {
    return (
        <div
            className={`absolute inset-0 z-0 flex flex-col items-center justify-center overflow-hidden bg-neutral-950 antialiased ${className}`}
        >
            <div className="absolute inset-0 bg-neutral-950 opacity-[0.8]" />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
                className="absolute h-full w-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-neutral-950 to-neutral-950"
            />
            <div className="absolute top-0 left-0 h-full w-full overflow-hidden">
                <div className="absolute top-[-50%] left-[-20%] h-[200%] w-[150%] animate-blob rounded-full bg-blue-500/10 blur-[100px]" />
                <div className="absolute top-[-20%] right-[-20%] h-[150%] w-[120%] animate-blob animation-delay-2000 rounded-full bg-purple-500/10 blur-[120px]" />
                <div className="absolute bottom-[-50%] left-[20%] h-[150%] w-[150%] animate-blob animation-delay-4000 rounded-full bg-indigo-500/10 blur-[100px]" />
            </div>
        </div>
    );
};
