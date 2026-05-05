"use client";

import { cn } from "@/lib/utils";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
  borderWidth?: number;
  reverse?: boolean;
}

export const BorderBeam = ({
  className,
  duration = 6,
  colorFrom = "#F59E0B",
  colorTo = "#38BDF8",
  borderWidth = 1,
}: BorderBeamProps) => {
  const id = `beam-${Math.random().toString(36).slice(2, 7)}`;
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden", className)}
      aria-hidden
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          padding: borderWidth,
          background: `linear-gradient(90deg, transparent 0%, ${colorFrom} 40%, ${colorTo} 60%, transparent 100%)`,
          backgroundSize: "200% 100%",
          animation: `border-beam-${id} ${duration}s linear infinite`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      <style>{`
        @keyframes border-beam-${id} {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
};

export default BorderBeam;
