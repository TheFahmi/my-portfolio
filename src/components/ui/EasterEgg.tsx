import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ConfettiPieceProps {
  x: number;
  y: number;
  color: string;
  delay: number;
}

const colors = ['#ffffff', '#d1d5db', '#9ca3af', '#6b7280', '#e5e7eb'];

const ConfettiPiece = ({ x, y, color, delay }: ConfettiPieceProps) => (
  <motion.div
    initial={{ opacity: 1, x, y, scale: 0 }}
    animate={{
      opacity: [1, 1, 0],
      x: x + (Math.random() - 0.5) * 400, 
      y: y + Math.random() * 500 + 100, 
      rotate: Math.random() * 360 * 3, 
      scale: [0, 1, 0.5],
    }}
    transition={{ duration: 2.5, delay, ease: "easeOut" }}
    style={{
      position: 'fixed',
      width: '10px',
      height: '10px',
      backgroundColor: color,
      borderRadius: Math.random() > 0.5 ? '50%' : '2px',
      zIndex: 9999,
      pointerEvents: 'none',
    }}
  />
);

export const EasterEgg = ({ triggered }: { triggered: boolean }) => {
  const [pieces, setPieces] = useState<ConfettiPieceProps[]>([]);

  useEffect(() => {
    if (triggered) {
      const newPieces = Array.from({ length: 100 }).map(() => ({
        x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
        y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.2,
      }));
      setPieces(newPieces);
    } else {
        setPieces([]);
    }
  }, [triggered]);

  return (
    <AnimatePresence>
      {triggered && (
        <>
            <motion.div
                initial={{ opacity: 0, scale: 0.5, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: -50 }}
                className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
            >
                <div className="bg-black/90 backdrop-blur-md px-8 py-6 rounded-2xl shadow-2xl border border-white/20 text-center transform">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-2">
                        LEVEL UP!
                    </h2>
                    <p className="text-slate-600 dark:text-slate-300 font-medium">
                        Konami Code Activated! 🎮
                    </p>
                </div>
            </motion.div>
            
            {pieces.map((p, i) => (
                <ConfettiPiece key={i} {...p} />
            ))}
        </>
      )}
    </AnimatePresence>
  );
};
