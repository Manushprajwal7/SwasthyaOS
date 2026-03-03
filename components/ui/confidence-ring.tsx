"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ConfidenceRingProps {
  score: number; // 0.0 - 1.0
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

const sizeConfig = {
  sm: { width: 40, strokeWidth: 3, fontSize: "text-xs" },
  md: { width: 56, strokeWidth: 4, fontSize: "text-sm" },
  lg: { width: 72, strokeWidth: 5, fontSize: "text-base" },
};

export function ConfidenceRing({
  score,
  size = "md",
  showLabel = true,
  className,
}: ConfidenceRingProps) {
  const config = sizeConfig[size];
  const radius = (config.width - config.strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - score * circumference;
  const percentage = Math.round(score * 100);

  // Color based on confidence level
  const getColor = () => {
    if (score >= 0.8) return { stroke: "#059669", text: "text-green-600" }; // Safe Green
    if (score >= 0.6) return { stroke: "#D97706", text: "text-amber-600" }; // Warning Amber
    return { stroke: "#DC2626", text: "text-red-600" }; // Critical Red
  };

  const colors = getColor();

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center",
        className
      )}
    >
      <svg
        width={config.width}
        height={config.width}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={config.width / 2}
          cy={config.width / 2}
          r={radius}
          fill="none"
          stroke="#E2E8F0"
          strokeWidth={config.strokeWidth}
        />
        {/* Animated progress circle */}
        <circle
          cx={config.width / 2}
          cy={config.width / 2}
          r={radius}
          fill="none"
          stroke={colors.stroke}
          strokeWidth={config.strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-700 ease-out"
          style={{
            animation: "confidence-ring-fill 0.6s ease-out forwards",
          }}
        />
      </svg>
      {showLabel && (
        <span
          className={cn(
            "absolute font-mono font-bold",
            config.fontSize,
            colors.text
          )}
        >
          {percentage}%
        </span>
      )}
      <style jsx>{`
        @keyframes confidence-ring-fill {
          from {
            stroke-dashoffset: ${circumference};
          }
          to {
            stroke-dashoffset: ${offset};
          }
        }
      `}</style>
    </div>
  );
}
