'use client';

import { motion } from 'framer-motion';

interface Shape {
  id: number;
  type: 'circle' | 'square' | 'triangle';
  x: number;
  y: number;
  size: number;
  rotation: number;
  duration: number;
  delay: number;
  color: string;
}

interface GeometricShapesProps {
  className?: string;
  count?: number;
}

const GeometricShapes = ({ className = '', count = 15 }: GeometricShapesProps) => {
  // Generate random shapes
  const generateShapes = (count: number): Shape[] => {
    const colors = [
      'rgba(37, 99, 235, 0.2)',
      'rgba(59, 130, 246, 0.2)',
      'rgba(96, 165, 250, 0.2)',
      'rgba(147, 197, 253, 0.2)',
    ];
    
    return Array.from({ length: count }, (_, i) => {
      const type = ['circle', 'square', 'triangle'][Math.floor(Math.random() * 3)] as Shape['type'];
      return {
        id: i,
        type,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 5 + 2,
        rotation: Math.random() * 360,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * 5,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    });
  };

  const shapes = generateShapes(count);

  const renderShape = (shape: Shape) => {
    switch (shape.type) {
      case 'circle':
        return (
          <motion.circle
            key={shape.id}
            cx={shape.x}
            cy={shape.y}
            r={shape.size}
            fill={shape.color}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
              cx: [shape.x, shape.x + (Math.random() * 10 - 5)],
              cy: [shape.y, shape.y + (Math.random() * 10 - 5)],
            }}
            transition={{
              duration: shape.duration,
              delay: shape.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      case 'square':
        return (
          <motion.rect
            key={shape.id}
            x={shape.x - shape.size}
            y={shape.y - shape.size}
            width={shape.size * 2}
            height={shape.size * 2}
            fill={shape.color}
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
              rotate: [0, 90, 180],
              x: [shape.x - shape.size, (shape.x - shape.size) + (Math.random() * 10 - 5)],
              y: [shape.y - shape.size, (shape.y - shape.size) + (Math.random() * 10 - 5)],
            }}
            transition={{
              duration: shape.duration,
              delay: shape.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      case 'triangle':
        const points = `${shape.x},${shape.y - shape.size} ${shape.x - shape.size},${shape.y + shape.size} ${shape.x + shape.size},${shape.y + shape.size}`;
        return (
          <motion.polygon
            key={shape.id}
            points={points}
            fill={shape.color}
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
              rotate: [0, 120, 240],
            }}
            transition={{
              duration: shape.duration,
              delay: shape.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <svg
        className="absolute top-0 left-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {shapes.map(renderShape)}
      </svg>
    </div>
  );
};

export default GeometricShapes;
