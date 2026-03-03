"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface LivePulseProps {
  active?: boolean;
  color?: "teal" | "red" | "amber" | "green";
  size?: "sm" | "md";
  className?: string;
}

const colorConfig = {
  teal: "bg-teal-500",
  red: "bg-red-500",
  amber: "bg-amber-500",
  green: "bg-green-500",
};

const pulseColorConfig = {
  teal: "bg-teal-400",
  red: "bg-red-400",
  amber: "bg-amber-400",
  green: "bg-green-400",
};

const sizeConfig = {
  sm: { dot: "h-2 w-2", ring: "h-4 w-4" },
  md: { dot: "h-3 w-3", ring: "h-6 w-6" },
};

export function LivePulse({
  active = true,
  color = "teal",
  size = "md",
  className,
}: LivePulseProps) {
  const sizes = sizeConfig[size];

  if (!active) {
    return (
      <span
        className={cn(
          "inline-block rounded-full bg-slate-400",
          sizes.dot,
          className
        )}
      />
    );
  }

  return (
    <span className={cn("relative inline-flex", className)}>
      {/* Pulsing outer ring */}
      <span
        className={cn(
          "absolute inline-flex rounded-full opacity-75",
          pulseColorConfig[color],
          sizes.ring,
          "animate-ping"
        )}
        style={{
          animationDuration: "2s",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
      {/* Solid center dot */}
      <span
        className={cn(
          "relative inline-flex rounded-full",
          colorConfig[color],
          sizes.dot
        )}
      />
    </span>
  );
}
