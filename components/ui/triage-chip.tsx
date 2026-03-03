"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface TriageChipProps {
  level: "green" | "amber" | "red";
  label?: string;
  size?: "sm" | "md";
  className?: string;
}

const levelConfig = {
  green: {
    bg: "bg-green-100",
    text: "text-green-800",
    border: "border-green-200",
    defaultLabel: "Stable",
  },
  amber: {
    bg: "bg-amber-100",
    text: "text-amber-800",
    border: "border-amber-200",
    defaultLabel: "Monitor",
  },
  red: {
    bg: "bg-red-100",
    text: "text-red-800",
    border: "border-red-200",
    defaultLabel: "Critical",
  },
};

const sizeConfig = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
};

export function TriageChip({
  level,
  label,
  size = "sm",
  className,
}: TriageChipProps) {
  const config = levelConfig[level];
  const displayLabel = label || config.defaultLabel;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-semibold border",
        config.bg,
        config.text,
        config.border,
        sizeConfig[size],
        className
      )}
    >
      {displayLabel}
    </span>
  );
}
