'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import AnimatedProfileAvatar from './svg/AnimatedProfileAvatar';

interface ToggleableProfileImageProps {
  className?: string;
  imageUrl: string;
  alt: string;
}

const ToggleableProfileImage = ({
  className = '',
  imageUrl,
  alt
}: ToggleableProfileImageProps) => {
  const [showRealPhoto, setShowRealPhoto] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <div className="w-full h-full rounded-full overflow-hidden">
        {showRealPhoto ? (
          <div className="relative w-full h-full">
            <Image
              src={imageUrl}
              alt={alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              style={{ objectPosition: '50% 30%' }} /* Adjusted for better face positioning */
              priority
            />
          </div>
        ) : (
          <AnimatedProfileAvatar className="w-full h-full" />
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
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
          </svg>
        )}
      </motion.button>
    </div>
  );
};

export default ToggleableProfileImage;
