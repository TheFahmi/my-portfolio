'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import AnimatedAboutAvatar from './svg/AnimatedAboutAvatar';

interface ToggleableAboutImageProps {
  className?: string;
  imageUrl: string;
  alt: string;
}

const ToggleableAboutImage = ({
  className = '',
  imageUrl,
  alt
}: ToggleableAboutImageProps) => {
  const [showRealPhoto, setShowRealPhoto] = useState(true);

  return (
    <div className={`relative ${className}`}>
      <div className="w-full h-full overflow-hidden">
        {showRealPhoto ? (
          <div className="relative w-full h-full">
            <Image
              src={imageUrl}
              alt={alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-top"
              style={{ objectPosition: '50% 10%' }} /* Adjusted to show more of the lower part */
              priority
            />
          </div>
        ) : (
          <AnimatedAboutAvatar className="w-full h-full" />
        )}
      </div>

      <motion.button
        onClick={() => setShowRealPhoto(!showRealPhoto)}
        className="absolute bottom-4 right-4 bg-primary text-white p-2 rounded-full shadow-lg z-20 hover:bg-blue-700 transition-colors duration-300"
        aria-label={showRealPhoto ? "Show animated avatar" : "Show real photo"}
        title={showRealPhoto ? "Show animated avatar" : "Show real photo"}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {showRealPhoto ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
          </svg>
        )}
      </motion.button>
    </div>
  );
};

export default ToggleableAboutImage;
