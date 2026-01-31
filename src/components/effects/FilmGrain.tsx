"use client";

import { useEffect, useState } from "react";

export default function FilmGrain() {
  const [opacity, setOpacity] = useState(0.05);

  return (
    <div 
      className="pointer-events-none fixed inset-0 z-50 h-full w-full overflow-hidden"
      style={{ opacity }}
    >
      <div className="relative h-full w-full">
        <div 
          className="absolute -top-[100%] -left-[100%] h-[300%] w-[300%] animate-grain"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            opacity: 1,
          }}
        />
      </div>
    </div>
  );
}
