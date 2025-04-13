'use client';

import { motion } from 'framer-motion';
import { useThemeDetector } from '@/hooks/useThemeDetector';
import Seagulls from './Seagulls';

interface BeachSectionProps {
  className?: string;
}

const BeachSection = ({ className = '' }: BeachSectionProps) => {
  const { isDarkMode } = useThemeDetector();

  // Warna elemen berdasarkan tema
  const colors = {
    sand: isDarkMode ? '#A48F58' : '#F0E6B2',
    sandDark: isDarkMode ? '#8A7643' : '#D4C88E',
    starfish: isDarkMode ? '#F27E7A' : '#FF6347',
    starfishStroke: isDarkMode ? '#BB5D59' : '#E0533F',
    shell: isDarkMode ? '#EADFD0' : '#FFFFFF',
    shellStroke: isDarkMode ? '#C9BFB1' : '#E0DAD1',
    ocean: isDarkMode ? 'rgba(56, 189, 248, 0.3)' : 'rgba(14, 165, 233, 0.1)',
    oceanDark: isDarkMode ? 'rgba(59, 130, 246, 0.4)' : 'rgba(37, 99, 235, 0.15)',
    oceanLight: isDarkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(37, 99, 235, 0.1)',
    background: isDarkMode ? '#1F2937' : '#FFFFFF',
  };

  // Waktu animasi untuk gelombang
  const animationTime = 15;

  return (
    <div className={`relative overflow-hidden w-full ${className}`} style={{ height: '300px' }}>
      {/* Seagulls in the sky */}
      <Seagulls className="z-20" count={7} />
      
      {/* Simple Wave Animation */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden" style={{ 
        height: '200px', 
        zIndex: 10, 
        background: 'transparent' 
      }}>
        <svg
          className="w-full"
          height="200"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 200"
          preserveAspectRatio="none"
        >
          {/* Base wave layer */}
          <motion.path
            d="M0,50 C150,20 300,120 450,50 C600,0 750,100 900,50 C1050,0 1150,50 1200,25 L1200,200 L0,200 Z"
            fill={colors.ocean}
            animate={{
              d: [
                "M0,50 C150,20 300,120 450,50 C600,0 750,100 900,50 C1050,0 1150,50 1200,25 L1200,200 L0,200 Z",
                "M0,70 C150,40 300,100 450,70 C600,20 750,120 900,70 C1050,20 1150,70 1200,45 L1200,200 L0,200 Z",
                "M0,50 C150,20 300,120 450,50 C600,0 750,100 900,50 C1050,0 1150,50 1200,25 L1200,200 L0,200 Z",
              ],
            }}
            transition={{
              duration: animationTime,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Second wave layer - slightly different timing */}
          <motion.path
            d="M0,80 C150,50 300,150 450,80 C600,30 750,130 900,80 C1050,30 1150,80 1200,55 L1200,200 L0,200 Z"
            fill={colors.oceanDark}
            animate={{
              d: [
                "M0,80 C150,50 300,150 450,80 C600,30 750,130 900,80 C1050,30 1150,80 1200,55 L1200,200 L0,200 Z",
                "M0,100 C150,70 300,130 450,100 C600,50 750,150 900,100 C1050,50 1150,100 1200,75 L1200,200 L0,200 Z",
                "M0,80 C150,50 300,150 450,80 C600,30 750,130 900,80 C1050,30 1150,80 1200,55 L1200,200 L0,200 Z",
              ],
            }}
            transition={{
              duration: animationTime,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />

          {/* Third wave layer - even more different timing */}
          <motion.path
            d="M0,100 C150,70 300,170 450,100 C600,50 750,150 900,100 C1050,50 1150,100 1200,75 L1200,200 L0,200 Z"
            fill={colors.oceanLight}
            animate={{
              d: [
                "M0,100 C150,70 300,170 450,100 C600,50 750,150 900,100 C1050,50 1150,100 1200,75 L1200,200 L0,200 Z",
                "M0,120 C150,90 300,150 450,120 C600,70 750,170 900,120 C1050,70 1150,120 1200,95 L1200,200 L0,200 Z",
                "M0,100 C150,70 300,170 450,100 C600,50 750,150 900,100 C1050,50 1150,100 1200,75 L1200,200 L0,200 Z",
              ],
            }}
            transition={{
              duration: animationTime * 0.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3,
            }}
          />
        </svg>
      </div>
      
      {/* Beach sand area */}
      <div className="absolute bottom-0 left-0 right-0" style={{ height: '80px', overflow: 'hidden' }}>
        <svg
          width="100%"
          height="150"
          viewBox="0 0 1600 150"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Sand dunes */}
          <path
            d="M0 70 C100 40 200 50 300 60 C400 70 500 50 600 45 C700 40 800 60 900 65 C1000 70 1100 50 1200 40 C1300 30 1400 50 1500 60 C1550 65 1600 70 1600 70 L1600 150 L0 150 Z"
            fill={colors.sand}
          />
          {/* Sand texture */}
          <g fill={colors.sandDark} opacity="0.4">
            <circle cx="150" cy="80" r="2" />
            <circle cx="170" cy="85" r="1" />
            <circle cx="190" cy="75" r="1.5" />
            <circle cx="250" cy="82" r="2" />
            <circle cx="300" cy="78" r="1" />
            <circle cx="350" cy="85" r="1.5" />
            <circle cx="450" cy="75" r="1" />
            <circle cx="550" cy="82" r="2" />
            <circle cx="650" cy="78" r="1.5" />
            <circle cx="750" cy="85" r="1" />
            <circle cx="850" cy="80" r="2" />
            <circle cx="950" cy="85" r="1.5" />
            <circle cx="1050" cy="75" r="1" />
            <circle cx="1150" cy="83" r="2" />
            <circle cx="1250" cy="77" r="1.5" />
            <circle cx="1350" cy="85" r="1" />
            <circle cx="1450" cy="80" r="2" />
            <circle cx="1550" cy="82" r="1.5" />
          </g>
        </svg>
      </div>

      {/* Starfish */}
      <motion.div 
        className="absolute"
        style={{ bottom: '30px', left: '10%' }}
        initial={{ scale: 0.95, rotate: 0 }}
        animate={{ scale: 1, rotate: 5 }}
        transition={{ 
          scale: { duration: 2, repeat: Infinity, repeatType: 'reverse' },
          rotate: { duration: 3, repeat: Infinity, repeatType: 'reverse' }
        }}
      >
        <svg width="40" height="40" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
          {/* Starfish shape */}
          <path
            d="M25 10 L30 20 L45 20 L35 30 L40 45 L25 35 L10 45 L15 30 L5 20 L20 20 Z"
            fill={colors.starfish}
            stroke={colors.starfishStroke}
            strokeWidth="1"
          />
          {/* Starfish texture */}
          <circle cx="25" cy="25" r="3" fill={colors.starfishStroke} opacity="0.3" />
          <circle cx="22" cy="22" r="1" fill={colors.starfishStroke} opacity="0.5" />
          <circle cx="28" cy="22" r="1" fill={colors.starfishStroke} opacity="0.5" />
          <circle cx="22" cy="28" r="1" fill={colors.starfishStroke} opacity="0.5" />
          <circle cx="28" cy="28" r="1" fill={colors.starfishStroke} opacity="0.5" />
        </svg>
      </motion.div>

      {/* Second Starfish */}
      <motion.div 
        className="absolute"
        style={{ bottom: '20px', left: '70%' }}
        initial={{ scale: 0.9, rotate: -10 }}
        animate={{ scale: 0.95, rotate: -15 }}
        transition={{ 
          scale: { duration: 2.5, repeat: Infinity, repeatType: 'reverse', delay: 0.5 },
          rotate: { duration: 3.5, repeat: Infinity, repeatType: 'reverse', delay: 0.5 }
        }}
      >
        <svg width="30" height="30" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
          {/* Starfish shape */}
          <path
            d="M25 10 L30 20 L45 20 L35 30 L40 45 L25 35 L10 45 L15 30 L5 20 L20 20 Z"
            fill={colors.starfish}
            stroke={colors.starfishStroke}
            strokeWidth="1"
          />
          {/* Starfish texture */}
          <circle cx="25" cy="25" r="3" fill={colors.starfishStroke} opacity="0.3" />
          <circle cx="22" cy="22" r="1" fill={colors.starfishStroke} opacity="0.5" />
          <circle cx="28" cy="22" r="1" fill={colors.starfishStroke} opacity="0.5" />
          <circle cx="22" cy="28" r="1" fill={colors.starfishStroke} opacity="0.5" />
          <circle cx="28" cy="28" r="1" fill={colors.starfishStroke} opacity="0.5" />
        </svg>
      </motion.div>

      {/* Seashell */}
      <motion.div 
        className="absolute"
        style={{ bottom: '15px', left: '40%' }}
        initial={{ y: 0, rotate: 0 }}
        animate={{ y: -2, rotate: 3 }}
        transition={{ 
          y: { duration: 2, repeat: Infinity, repeatType: 'reverse', delay: 1 },
          rotate: { duration: 4, repeat: Infinity, repeatType: 'reverse', delay: 1 }
        }}
      >
        <svg width="35" height="25" viewBox="0 0 50 30" xmlns="http://www.w3.org/2000/svg">
          {/* Shell shape */}
          <path
            d="M5 20 C5 10 20 0 25 5 C30 0 45 10 45 20 C45 25 35 30 25 30 C15 30 5 25 5 20 Z"
            fill={colors.shell}
            stroke={colors.shellStroke}
            strokeWidth="1"
          />
          {/* Shell ridges */}
          <path d="M10 20 C15 15 20 10 25 15" stroke={colors.shellStroke} fill="none" opacity="0.5" />
          <path d="M25 15 C30 10 35 15 40 20" stroke={colors.shellStroke} fill="none" opacity="0.5" />
          <path d="M12 23 C17 20 22 17 25 20" stroke={colors.shellStroke} fill="none" opacity="0.5" />
          <path d="M25 20 C28 17 33 20 38 23" stroke={colors.shellStroke} fill="none" opacity="0.5" />
        </svg>
      </motion.div>

      {/* Small Seaweed */}
      <motion.div 
        className="absolute"
        style={{ bottom: '20px', left: '20%' }}
        animate={{ 
          x: [0, 2, -2, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          repeatType: 'loop'
        }}
      >
        <svg width="20" height="30" viewBox="0 0 20 30" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 30 C10 25 15 20 10 15 C5 10 10 5 10 0"
            stroke={isDarkMode ? "#4ADE80" : "#22C55E"}
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M14 30 C14 27 18 23 14 20 C10 17 14 14 14 10"
            stroke={isDarkMode ? "#4ADE80" : "#22C55E"}
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M6 30 C6 27 2 23 6 20 C10 17 6 14 6 10"
            stroke={isDarkMode ? "#4ADE80" : "#22C55E"}
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      </motion.div>

      {/* Third Starfish - Bigger */}
      <motion.div 
        className="absolute"
        style={{ bottom: '35px', left: '85%' }}
        initial={{ scale: 0.9, rotate: 15 }}
        animate={{ scale: 1, rotate: 10 }}
        transition={{ 
          scale: { duration: 3, repeat: Infinity, repeatType: 'reverse', delay: 0.8 },
          rotate: { duration: 4, repeat: Infinity, repeatType: 'reverse', delay: 0.8 }
        }}
      >
        <svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
          {/* Starfish shape */}
          <path
            d="M25 10 L30 20 L45 20 L35 30 L40 45 L25 35 L10 45 L15 30 L5 20 L20 20 Z"
            fill={colors.starfish}
            stroke={colors.starfishStroke}
            strokeWidth="1"
          />
          {/* Starfish texture */}
          <circle cx="25" cy="25" r="3" fill={colors.starfishStroke} opacity="0.3" />
          <circle cx="22" cy="22" r="1" fill={colors.starfishStroke} opacity="0.5" />
          <circle cx="28" cy="22" r="1" fill={colors.starfishStroke} opacity="0.5" />
          <circle cx="22" cy="28" r="1" fill={colors.starfishStroke} opacity="0.5" />
          <circle cx="28" cy="28" r="1" fill={colors.starfishStroke} opacity="0.5" />
        </svg>
      </motion.div>

      {/* Additional Seashell */}
      <motion.div 
        className="absolute"
        style={{ bottom: '20px', left: '60%' }}
        initial={{ y: 0, rotate: -10 }}
        animate={{ y: -3, rotate: -15 }}
        transition={{ 
          y: { duration: 2.5, repeat: Infinity, repeatType: 'reverse', delay: 1.5 },
          rotate: { duration: 3.5, repeat: Infinity, repeatType: 'reverse', delay: 1.5 }
        }}
      >
        <svg width="45" height="35" viewBox="0 0 50 30" xmlns="http://www.w3.org/2000/svg">
          {/* Shell shape */}
          <path
            d="M5 20 C5 10 20 0 25 5 C30 0 45 10 45 20 C45 25 35 30 25 30 C15 30 5 25 5 20 Z"
            fill={colors.shell}
            stroke={colors.shellStroke}
            strokeWidth="1"
          />
          {/* Shell ridges */}
          <path d="M10 20 C15 15 20 10 25 15" stroke={colors.shellStroke} fill="none" opacity="0.5" />
          <path d="M25 15 C30 10 35 15 40 20" stroke={colors.shellStroke} fill="none" opacity="0.5" />
          <path d="M12 23 C17 20 22 17 25 20" stroke={colors.shellStroke} fill="none" opacity="0.5" />
          <path d="M25 20 C28 17 33 20 38 23" stroke={colors.shellStroke} fill="none" opacity="0.5" />
        </svg>
      </motion.div>

      {/* Seaweed Group */}
      <motion.div 
        className="absolute"
        style={{ bottom: '20px', left: '75%' }}
        animate={{ 
          x: [0, 3, -3, 0],
          rotate: [0, 8, -8, 0]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          repeatType: 'loop'
        }}
      >
        <svg width="30" height="40" viewBox="0 0 30 40" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M15 40 C15 35 20 30 15 25 C10 20 15 15 15 10 C15 5 10 0 5 0"
            stroke={isDarkMode ? "#4ADE80" : "#22C55E"}
            strokeWidth="2.5"
            fill="none"
          />
          <path
            d="M20 40 C20 37 25 33 20 30 C15 27 20 24 20 20 C20 15 25 10 25 5"
            stroke={isDarkMode ? "#4ADE80" : "#22C55E"}
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M10 40 C10 37 5 33 10 30 C15 27 10 24 10 20 C10 15 5 10 5 5"
            stroke={isDarkMode ? "#4ADE80" : "#22C55E"}
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </motion.div>

      {/* Water level line */}
      <div 
        className="absolute bottom-0 left-0 right-0"
        style={{ 
          height: '2px', 
          background: colors.ocean,
          zIndex: 10
        }}
      />
    </div>
  );
};

export default BeachSection; 