import React from 'react';

interface PaperTextureProps {
  /** Additional CSS classes */
  className?: string;
  /** Intensity of the texture overlay (0 to 1). Defaults to 0.5 */
  intensity?: number;
}

export function PaperTexture({ 
  className = '', 
  intensity = 0.5 
}: PaperTextureProps) {
  return (
    <div 
      className={`pointer-events-none fixed inset-0 z-[-1] h-full w-full overflow-hidden bg-[#FDFBF7] ${className}`}
      aria-hidden="true"
    >
      {/* Texture Overlay using SVG Noise */}
      <div 
        className="absolute inset-0 h-full w-full"
        style={{
          opacity: intensity,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
          filter: 'contrast(120%) brightness(95%) sepia(30%)',
          mixBlendMode: 'multiply',
        }}
      />
      
      {/* Subtle Vignette for depth */}
      <div 
        className="absolute inset-0 h-full w-full"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0) 0%, rgba(240, 230, 210, 0.3) 100%)',
          mixBlendMode: 'multiply',
        }}
      />
      
      {/* Warm Gradient Wash */}
      <div 
        className="absolute inset-0 h-full w-full"
        style={{
          background: 'linear-gradient(to bottom right, rgba(255,255,255,0.4) 0%, rgba(245, 235, 220, 0.1) 100%)',
          mixBlendMode: 'soft-light',
        }}
      />
    </div>
  );
}
