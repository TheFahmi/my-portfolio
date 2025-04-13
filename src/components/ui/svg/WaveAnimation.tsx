'use client';

import { motion } from 'framer-motion';
import { useThemeDetector } from '@/hooks/useThemeDetector';

interface WaveAnimationProps {
  className?: string;
  color?: string;
  darkColor?: string;
  height?: number;
}

const WaveAnimation = ({
  className = '',
  color = 'rgba(37, 99, 235, 0.2)',
  darkColor = 'rgba(59, 130, 246, 0.6)',
  height = 100
}: WaveAnimationProps) => {
  // Get current theme
  const { isDarkMode } = useThemeDetector();
  
  // Use dark color in dark mode if provided
  const activeColor = isDarkMode && darkColor ? darkColor : color;
  
  // Menghitung waktu animasi yang sama untuk kapal dan ombak
  const animationTime = 15; 
  
  // Times untuk animasi yang sama antara kapal dan ombak
  const waveTimes = [0, 0.33, 0.66, 1];
  
  // Ship colors based on theme
  const shipColors = {
    body: isDarkMode ? '#4A7FC1' : '#34568B',
    bodyStroke: isDarkMode ? '#6A9FE1' : '#1E3A5F',
    cabin: isDarkMode ? '#5D9CEB' : '#4A7FC1',
    cabinStroke: isDarkMode ? '#7DBCFF' : '#2A5F9E',
    upperDeck: isDarkMode ? '#7DBCFF' : '#5D9CEB',
    upperDeckStroke: isDarkMode ? '#9DCFFF' : '#3A7DCB',
    mast: isDarkMode ? '#A67C52' : '#8B4513',
    mastStroke: isDarkMode ? '#C69C72' : '#6A340F',
    sail: isDarkMode ? '#FFFFFF' : '#FFFFFF',
    sailStroke: isDarkMode ? '#EEEEEE' : '#DDDDDD',
    window: isDarkMode ? '#FFE566' : '#FFD700',
    cargo1: isDarkMode ? '#E89B6E' : '#D2691E',
    cargo1Stroke: isDarkMode ? '#C67C4E' : '#8B4513',
    cargo2: isDarkMode ? '#C67C4E' : '#A0522D',
    cargo2Stroke: isDarkMode ? '#A65C2E' : '#8B4513',
  };

  return (
    <div className={`absolute w-full overflow-hidden ${className}`} style={{ height, maxWidth: '100%' }}>
      {/* Container for ships - positioned above the waves */}
      <div className="absolute inset-0 overflow-hidden z-20" style={{ width: '100%', maxWidth: '100vw' }}>
        {/* Ship 1 Animation - Large Cargo Ship */}
        <motion.div
          className="absolute z-30"
          style={{ bottom: '100px', left: '-140px' }}
          animate={{
            x: ['0%', '100%', '200%', '300%', '400%', '500%', '600%', '700%', '800%', '900%', '1000%', '1100%', '1200%'], 
            y: ['0px', '-20px', '-10px', '0px'],
            rotate: [0, 1, 2, 0]
          }}
          transition={{
            x: {
              duration: 60,
              repeat: Infinity,
              ease: "linear"
            },
            y: {
              duration: animationTime,
              repeat: Infinity,
              ease: "easeInOut",
              times: waveTimes
            },
            rotate: {
              duration: animationTime,
              repeat: Infinity,
              ease: "easeInOut",
              times: waveTimes
            }
          }}
        >
          <svg width="140" height="90" viewBox="0 0 140 90" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Ship Body */}
            <path d="M20 50H120L110 75H30L20 50Z" fill={shipColors.body} stroke={shipColors.bodyStroke} strokeWidth="1.5" />
            <path d="M40 30H100V50H40V30Z" fill={shipColors.cabin} stroke={shipColors.cabinStroke} strokeWidth="1.5" />
            <path d="M50 10H90V30H50V10Z" fill={shipColors.upperDeck} stroke={shipColors.upperDeckStroke} strokeWidth="1.5" />
            {/* Mast and Sail */}
            <rect x="68" y="10" width="4" height="65" fill={shipColors.mast} stroke={shipColors.mastStroke} strokeWidth="1" />
            <path d="M72 20C85 25 95 40 95 50H72V20Z" fill={shipColors.sail} stroke={shipColors.sailStroke} strokeWidth="1" />
            {/* Flags */}
            <rect x="72" y="10" width="25" height="5" fill="#FF0000" />
            <rect x="72" y="15" width="20" height="5" fill="#FFFFFF" />
            {/* Windows */}
            <circle cx="50" cy="40" r="3" fill={shipColors.window} />
            <circle cx="65" cy="40" r="3" fill={shipColors.window} />
            <circle cx="80" cy="40" r="3" fill={shipColors.window} />
            <circle cx="95" cy="40" r="3" fill={shipColors.window} />
            {/* Cargo */}
            <rect x="45" y="15" width="10" height="10" fill={shipColors.cargo1} stroke={shipColors.cargo1Stroke} strokeWidth="1" />
            <rect x="60" y="15" width="10" height="10" fill={shipColors.cargo2} stroke={shipColors.cargo2Stroke} strokeWidth="1" />
          </svg>
        </motion.div>

        {/* Ship 2 Animation - Sailboat */}
        <motion.div
          className="absolute z-30"
          style={{ bottom: '102px', left: '-100px' }}
          animate={{
            x: ['0%', '100%', '200%', '300%', '400%', '500%', '600%', '700%', '800%', '900%', '1000%', '1100%', '1200%'],
            y: ['0px', '-18px', '-8px', '0px'],
            rotate: [0, 1.2, 2, 0]
          }}
          transition={{
            x: {
              duration: 45,
              repeat: Infinity,
              ease: "linear",
              delay: 8
            },
            y: {
              duration: animationTime,
              repeat: Infinity,
              ease: "easeInOut",
              times: waveTimes
            },
            rotate: {
              duration: animationTime,
              repeat: Infinity,
              ease: "easeInOut",
              times: waveTimes
            }
          }}
        >
          <svg width="100" height="80" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Ship Body */}
            <path d="M20 50H80L75 65H25L20 50Z" fill={shipColors.body} stroke={shipColors.bodyStroke} strokeWidth="1" />
            {/* Mast and Sail */}
            <rect x="48" y="20" width="3" height="45" fill={shipColors.mast} stroke={shipColors.mastStroke} strokeWidth="1" />
            <path d="M51 20C65 25 70 45 70 50H51V20Z" fill={shipColors.sail} stroke={shipColors.sailStroke} strokeWidth="1" />
            {/* Flags */}
            <rect x="51" y="20" width="15" height="3" fill="#FF6347" />
            {/* Cabin */}
            <rect x="40" y="40" width="20" height="10" fill={shipColors.cabin} stroke={shipColors.cabinStroke} strokeWidth="1" />
            <rect x="45" y="42" width="10" height="6" fill={shipColors.window} stroke={shipColors.window} strokeWidth="0.5" />
          </svg>
        </motion.div>

        {/* Ship 3 Animation - Fishing Boat */}
        <motion.div
          className="absolute z-30"
          style={{ bottom: '98px', left: '-90px' }}
          animate={{
            x: ['0%', '100%', '200%', '300%', '400%', '500%', '600%', '700%', '800%', '900%', '1000%', '1100%', '1200%'],
            y: ['0px', '-15px', '-22px', '0px'],
            rotate: [0, 2, 3.5, 0]
          }}
          transition={{
            x: {
              duration: 50,
              repeat: Infinity,
              ease: "linear",
              delay: 15
            },
            y: {
              duration: animationTime,
              repeat: Infinity,
              ease: "easeInOut",
              times: waveTimes
            },
            rotate: {
              duration: animationTime,
              repeat: Infinity,
              ease: "easeInOut",
              times: waveTimes
            }
          }}
        >
          <svg width="90" height="60" viewBox="0 0 90 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Ship Body */}
            <path d="M15 40H75L70 55H20L15 40Z" fill={shipColors.body} stroke={shipColors.bodyStroke} strokeWidth="1" />
            {/* Cabin */}
            <rect x="25" y="25" width="25" height="15" fill={shipColors.cabin} stroke={shipColors.cabinStroke} strokeWidth="1" />
            <rect x="30" y="28" width="15" height="8" fill={shipColors.window} stroke={shipColors.window} strokeWidth="0.5" />
            {/* Fishing Rod */}
            <rect x="60" y="20" width="2" height="30" fill={shipColors.mast} stroke={shipColors.mastStroke} strokeWidth="0.5" />
            <path d="M62 20C62 20 75 15 80 25" stroke="#000000" strokeWidth="0.5" fill="none" />
            <path d="M80 25C80 25 80 30 80 35" stroke="#000000" strokeWidth="0.5" fill="none" />
          </svg>
        </motion.div>

        {/* Ship 4 Animation - Steamboat with Chimney */}
        <motion.div
          className="absolute z-30"
          style={{ bottom: '104px', left: '-120px' }}
          animate={{
            x: ['0%', '100%', '200%', '300%', '400%', '500%', '600%', '700%', '800%', '900%', '1000%', '1100%', '1200%'],
            y: ['0px', '-12px', '-18px', '0px'],
            rotate: [0, 1.8, 2.8, 0]
          }}
          transition={{
            x: {
              duration: 65,
              repeat: Infinity,
              ease: "linear",
              delay: 25
            },
            y: {
              duration: animationTime,
              repeat: Infinity,
              ease: "easeInOut",
              times: waveTimes
            },
            rotate: {
              duration: animationTime,
              repeat: Infinity,
              ease: "easeInOut",
              times: waveTimes
            }
          }}
        >
          <svg width="120" height="100" viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Ship Body */}
            <path d="M10 60H110L105 80H15L10 60Z" fill={shipColors.body} stroke={shipColors.bodyStroke} strokeWidth="1.5" />
            
            {/* Main Cabin */}
            <rect x="30" y="35" width="60" height="25" fill={shipColors.cabin} stroke={shipColors.cabinStroke} strokeWidth="1.5" />
            
            {/* Windows */}
            <rect x="35" y="40" width="10" height="8" rx="1" fill={shipColors.window} stroke={shipColors.window} strokeWidth="0.5" />
            <rect x="50" y="40" width="10" height="8" rx="1" fill={shipColors.window} stroke={shipColors.window} strokeWidth="0.5" />
            <rect x="65" y="40" width="10" height="8" rx="1" fill={shipColors.window} stroke={shipColors.window} strokeWidth="0.5" />
            <rect x="80" y="40" width="5" height="15" rx="1" fill={shipColors.window} stroke={shipColors.window} strokeWidth="0.5" />
            
            {/* Chimney with Smoke Animation */}
            <g>
              <rect x="50" y="15" width="12" height="20" fill="#444444" stroke="#222222" strokeWidth="1" />
              <rect x="48" y="12" width="16" height="3" fill="#666666" stroke="#222222" strokeWidth="0.5" />
              
              {/* Animated Smoke */}
              <motion.g
                initial={{ y: 0 }}
                animate={{ y: [-5, -40] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeOut",
                  repeatType: "loop"
                }}
              >
                <motion.path 
                  d="M52,10 C54,6 58,8 56,4 C54,0 57,-4 60,-2 C63,0 66,-4 63,-6" 
                  stroke="#AAAAAA" 
                  strokeWidth="2.5" 
                  fill="none"
                  animate={{
                    opacity: [0.9, 0.7, 0.4, 0.1, 0],
                    scale: [0.8, 1, 1.2, 1.4, 1.5],
                    x: [0, -2, -5, -8, -10]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                />

                <motion.path 
                  d="M57,10 C60,7 63,9 65,5 C67,1 63,-2 60,-3 C57,-4 55,-8 58,-10" 
                  stroke="#BBBBBB" 
                  strokeWidth="2" 
                  fill="none"
                  animate={{
                    opacity: [0.9, 0.7, 0.5, 0.2, 0],
                    scale: [0.7, 0.9, 1.1, 1.3, 1.5],
                    x: [0, 2, 5, 8, 12]
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: 0.2
                  }}
                />

                <motion.path 
                  d="M54,8 C56,5 59,7 58,3 C57,-1 60,-3 62,-1 C64,1 67,-2 65,-5" 
                  stroke="#CCCCCC" 
                  strokeWidth="1.8" 
                  fill="none"
                  animate={{
                    opacity: [0.8, 0.6, 0.4, 0.2, 0],
                    scale: [0.7, 0.9, 1.1, 1.3, 1.4],
                    x: [-1, -3, -2, 0, 2]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: 0.5
                  }}
                />
              </motion.g>

              <motion.g
                initial={{ y: 0 }}
                animate={{ y: [-5, -30] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeOut",
                  repeatType: "loop",
                  delay: 1
                }}
              >
                <motion.ellipse
                  cx="56"
                  cy="8"
                  rx="4"
                  ry="3"
                  fill="rgba(200, 200, 200, 0.3)"
                  animate={{
                    opacity: [0.7, 0.5, 0.3, 0.1, 0],
                    scale: [0.8, 1, 1.3, 1.5, 1.7],
                    cx: [56, 54, 53, 51, 48]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                />

                <motion.ellipse
                  cx="56"
                  cy="6"
                  rx="3"
                  ry="2"
                  fill="rgba(220, 220, 220, 0.4)"
                  animate={{
                    opacity: [0.8, 0.6, 0.4, 0.2, 0],
                    scale: [0.7, 0.9, 1.2, 1.4, 1.6],
                    cx: [56, 58, 59, 61, 64]
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: 0.3
                  }}
                />
              </motion.g>
            </g>
            
            {/* Deck Details */}
            <rect x="20" y="55" width="80" height="5" fill="#A0522D" stroke="#8B4513" strokeWidth="0.5" />
            <path d="M95 45 L105 55 L95 55 Z" fill="#D2B48C" stroke="#8B4513" strokeWidth="0.5" />
            <circle cx="20" cy="45" r="5" fill="#D2B48C" stroke="#8B4513" strokeWidth="0.5" />
          </svg>
        </motion.div>
      </div>

      {/* Wave Animation - Completely new approach */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden z-10" style={{ maxWidth: '100%' }}>
        <svg
          className="w-full"
          height={height}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 200"
          preserveAspectRatio="none"
        >
          {/* Base wave layer */}
          <motion.path
            d="M0,50 C150,20 300,120 450,50 C600,0 750,100 900,50 C1050,0 1150,50 1200,25 L1200,200 L0,200 Z"
            fill={activeColor}
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
            fill={isDarkMode ? "rgba(59, 130, 246, 0.4)" : "rgba(37, 99, 235, 0.15)"}
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
            fill={isDarkMode ? "rgba(59, 130, 246, 0.2)" : "rgba(37, 99, 235, 0.1)"}
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
    </div>
  );
};

export default WaveAnimation;
