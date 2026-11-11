"use client";

import * as React from "react";
import { motion } from "motion/react";
import { HeroTerminal } from "@/components/hero-terminal";
import { cn } from "@/lib/utils";

const HALFTONE_ROWS = 9;
const HALFTONE_COLS = 12;

interface HalftoneDot {
  id: number;
  animate: {
    opacity: [number, number, number];
    scale: [number, number, number];
  };
  transition: {
    repeat: number;
    duration: number;
    delay: number;
    ease: "easeInOut";
  };
}

function createHalftoneDots(reverse: boolean): readonly HalftoneDot[] {
  return Array.from({ length: HALFTONE_ROWS * HALFTONE_COLS }, (_, i) => {
    const row = Math.floor(i / HALFTONE_COLS);
    const col = i % HALFTONE_COLS;
    const dist = reverse
      ? Math.hypot(HALFTONE_ROWS - 1 - row, col)
      : Math.hypot(row, col);
    const baseOpacity = Math.max(0.08, Math.min(0.85, 1 - dist / 11));

    return {
      id: i,
      animate: {
        opacity: [baseOpacity, Math.min(1, baseOpacity * 1.6), baseOpacity],
        scale: [1, 1.25, 1],
      },
      transition: {
        repeat: Infinity,
        duration: 4,
        delay: dist * 0.15,
        ease: "easeInOut",
      },
    };
  });
}

const FORWARD_HALFTONE_DOTS = createHalftoneDots(false);
const REVERSE_HALFTONE_DOTS = createHalftoneDots(true);

const DOT_GRID_ANIMATE = {
  backgroundPosition: ["0px 0px", "40px 40px"],
};

const DOT_GRID_TRANSITION = {
  repeat: Infinity,
  duration: 35,
  ease: "linear" as const,
};

const DOT_GRID_STYLE: React.CSSProperties = {
  backgroundImage:
    "radial-gradient(circle, rgba(255, 255, 255, 0.12) 1px, transparent 1px)",
  backgroundSize: "24px 24px",
};

const PRIMARY_ORB_ANIMATE = {
  x: [-30, 30, -30],
  y: [-18, 18, -18],
  scale: [1, 1.15, 1],
  opacity: [0.5, 0.8, 0.5],
};

const PRIMARY_ORB_TRANSITION = {
  repeat: Infinity,
  duration: 12,
  ease: "easeInOut" as const,
};

const SECONDARY_ORB_ANIMATE = {
  x: [25, -25, 25],
  y: [15, -15, 15],
  scale: [1.1, 0.95, 1.1],
  opacity: [0.3, 0.6, 0.3],
};

const SECONDARY_ORB_TRANSITION = {
  repeat: Infinity,
  duration: 16,
  ease: "easeInOut" as const,
};

const TERMINAL_INITIAL = { opacity: 0, y: 18 };
const TERMINAL_ANIMATE = { opacity: 1, y: 0 };
const TERMINAL_TRANSITION = {
  duration: 0.5,
  ease: [0.16, 1, 0.3, 1] as const,
};

const HalftoneMatrix = React.memo(function HalftoneMatrix({
  className,
  reverse = false,
}: {
  className?: string;
  reverse?: boolean;
}) {
  const dots = reverse ? REVERSE_HALFTONE_DOTS : FORWARD_HALFTONE_DOTS;

  return (
    <div
      aria-hidden="true"
      className={cn(
        "grid grid-cols-12 gap-2 select-none pointer-events-none",
        className
      )}
    >
      {dots.map((dot) => (
        <motion.span
          key={dot.id}
          className="h-1.5 w-1.5 rounded-full bg-primary/40 transition-colors"
          animate={dot.animate}
          transition={dot.transition}
        />
      ))}
    </div>
  );
});

export function HeroPreview() {
  return (
    <section className="w-full relative overflow-hidden bg-background">
      {/* Subtle Animated Background Dot Grid Drift */}
      <motion.div
        animate={DOT_GRID_ANIMATE}
        transition={DOT_GRID_TRANSITION}
        className="absolute inset-0 pointer-events-none select-none opacity-40"
        style={DOT_GRID_STYLE}
      />

      {/* Layer 1: Animated Primary Emerald Luminous Glow Orb */}
      <motion.div
        animate={PRIMARY_ORB_ANIMATE}
        transition={PRIMARY_ORB_TRANSITION}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[380px] bg-primary/25 blur-[120px] rounded-full pointer-events-none"
      />

      {/* Layer 2: Animated Secondary Mint / Emerald Accent Glow Orb */}
      <motion.div
        animate={SECONDARY_ORB_ANIMATE}
        transition={SECONDARY_ORB_TRANSITION}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[320px] bg-emerald-500/15 blur-[90px] rounded-full pointer-events-none"
      />

      {/* Halftone Matrix Pattern with Staggered Radar Wave: Top-Left (Desktop/Tablet Flank) */}
      <div className="hidden md:block absolute top-6 left-6 pointer-events-none">
        <HalftoneMatrix />
      </div>

      {/* Halftone Matrix Pattern with Staggered Radar Wave: Top-Right (Desktop/Tablet Flank) */}
      <div className="hidden md:block absolute top-6 right-6 pointer-events-none">
        <HalftoneMatrix className="[transform:scaleX(-1)]" />
      </div>

      {/* Main Terminal Presentation Container */}
      <div className="relative z-10 px-4 py-8 sm:px-8 sm:py-12 md:px-12 md:py-16">
        <motion.div
          initial={TERMINAL_INITIAL}
          animate={TERMINAL_ANIMATE}
          transition={TERMINAL_TRANSITION}
        >
          <HeroTerminal />
        </motion.div>
      </div>
    </section>
  );
}
