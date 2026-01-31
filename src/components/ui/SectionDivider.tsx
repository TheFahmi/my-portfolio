"use client";

interface SectionDividerProps {
  variant?: "wave" | "curve" | "angle" | "fade";
  fromColor?: string;
  toColor?: string;
  flip?: boolean;
  className?: string;
}

export const SectionDivider = ({
  variant = "wave",
  fromColor = "fill-slate-50",
  toColor = "fill-slate-900",
  flip = false,
  className = "",
}: SectionDividerProps) => {
  const wavePath = flip
    ? "M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
    : "M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,122.7C672,96,768,96,864,112C960,128,1056,160,1152,165.3C1248,171,1344,149,1392,138.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z";

  const curvePath = flip
    ? "M0,160 C320,300 420,0 1440,160 L1440,320 L0,320 Z"
    : "M0,160 C320,0 420,300 1440,160 L1440,0 L0,0 Z";

  const anglePath = flip
    ? "M0,64 L1440,224 L1440,320 L0,320 Z"
    : "M0,224 L1440,64 L1440,0 L0,0 Z";

  const paths = {
    wave: wavePath,
    curve: curvePath,
    angle: anglePath,
  };

  if (variant === "fade") {
    return (
      <div
        className={`w-full h-24 md:h-32 bg-gradient-to-b ${fromColor.replace("fill-", "from-")} ${toColor.replace("fill-", "to-")} ${className}`}
      />
    );
  }

  return (
    <div className={`w-full overflow-hidden leading-none ${className}`}>
      <svg
        viewBox="0 0 1440 320"
        className={`relative block w-full h-16 md:h-24 lg:h-32 ${fromColor}`}
        preserveAspectRatio="none"
      >
        <path d={paths[variant]} className={toColor} fillOpacity="1" />
      </svg>
    </div>
  );
};

export default SectionDivider;
