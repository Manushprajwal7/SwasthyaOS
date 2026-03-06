"use client";

import React, { useState } from "react";
import { LivePulse } from "@/components/ui/live-pulse";

interface StateData {
  id: string;
  name: string;
  cases: number;
  signal: "critical" | "high" | "moderate" | "low" | "normal";
  hasAnomaly: boolean;
}

interface IndiaMapProps {
  onStateSelect?: (stateId: string) => void;
  selectedState?: string | null;
  syndrome?: string;
}

// Simplified India map paths for key states
const statesPaths: Record<string, string> = {
  MH: "M150,280 L180,260 L220,270 L240,300 L230,340 L190,360 L150,340 L140,300 Z", // Maharashtra
  UP: "M220,180 L280,160 L320,180 L310,220 L280,240 L240,230 L220,200 Z", // Uttar Pradesh
  BR: "M320,200 L360,190 L380,210 L370,240 L340,250 L320,230 Z", // Bihar
  MP: "M180,240 L240,230 L280,240 L270,280 L230,300 L180,280 Z", // Madhya Pradesh
  RJ: "M120,180 L180,160 L220,180 L210,230 L170,250 L120,230 Z", // Rajasthan
  GJ: "M80,240 L130,230 L150,260 L140,300 L100,310 L70,280 Z", // Gujarat
  KA: "M150,340 L190,330 L210,360 L200,400 L160,410 L140,380 Z", // Karnataka
  TN: "M200,400 L230,380 L260,400 L250,450 L210,460 L190,430 Z", // Tamil Nadu
  AP: "M210,340 L250,320 L280,340 L270,380 L240,400 L210,380 Z", // Andhra Pradesh
  WB: "M360,240 L390,220 L410,250 L400,290 L370,300 L350,270 Z", // West Bengal
  OR: "M320,280 L360,270 L380,300 L370,340 L330,350 L310,320 Z", // Odisha
  KL: "M170,420 L190,410 L200,440 L190,480 L170,470 L160,440 Z", // Kerala
  PB: "M160,120 L200,110 L220,130 L210,160 L180,170 L160,150 Z", // Punjab
  HR: "M180,140 L220,130 L240,160 L230,190 L200,200 L180,170 Z", // Haryana
  DL: "M200,160 L220,155 L230,175 L220,190 L200,185 L195,170 Z", // Delhi
};

const statesData: StateData[] = [
  {
    id: "MH",
    name: "Maharashtra",
    cases: 847,
    signal: "critical",
    hasAnomaly: true,
  },
  {
    id: "UP",
    name: "Uttar Pradesh",
    cases: 234,
    signal: "high",
    hasAnomaly: true,
  },
  { id: "BR", name: "Bihar", cases: 189, signal: "moderate", hasAnomaly: true },
  {
    id: "MP",
    name: "Madhya Pradesh",
    cases: 156,
    signal: "moderate",
    hasAnomaly: false,
  },
  { id: "RJ", name: "Rajasthan", cases: 98, signal: "low", hasAnomaly: false },
  { id: "GJ", name: "Gujarat", cases: 67, signal: "low", hasAnomaly: false },
  {
    id: "KA",
    name: "Karnataka",
    cases: 45,
    signal: "normal",
    hasAnomaly: false,
  },
  { id: "TN", name: "Tamil Nadu", cases: 78, signal: "low", hasAnomaly: false },
  {
    id: "AP",
    name: "Andhra Pradesh",
    cases: 56,
    signal: "normal",
    hasAnomaly: false,
  },
  {
    id: "WB",
    name: "West Bengal",
    cases: 123,
    signal: "moderate",
    hasAnomaly: false,
  },
  { id: "OR", name: "Odisha", cases: 34, signal: "normal", hasAnomaly: false },
  { id: "KL", name: "Kerala", cases: 23, signal: "normal", hasAnomaly: false },
  { id: "PB", name: "Punjab", cases: 45, signal: "low", hasAnomaly: false },
  { id: "HR", name: "Haryana", cases: 67, signal: "low", hasAnomaly: false },
  { id: "DL", name: "Delhi", cases: 89, signal: "moderate", hasAnomaly: false },
];

const signalColors = {
  critical: "#DC2626",
  high: "#EA580C",
  moderate: "#D97706",
  low: "#0D9488",
  normal: "#6EE7B7",
};

const signalBgColors = {
  critical: "#FEE2E2",
  high: "#FFEDD5",
  moderate: "#FEF3C7",
  low: "#CCFBF1",
  normal: "#D1FAE5",
};

export function IndiaMap({
  onStateSelect,
  selectedState,
  syndrome,
}: IndiaMapProps) {
  const [hoveredState, setHoveredState] = useState<string | null>(null);

  const getStateData = (id: string) => statesData.find((s) => s.id === id);

  return (
    <div className="relative">
      <svg
        viewBox="0 40 500 500"
        className="w-full h-auto"
        style={{ maxHeight: "400px" }}
      >
        {/* States */}
        {Object.entries(statesPaths).map(([id, path]) => {
          const data = getStateData(id);
          const isSelected = selectedState === id;
          const isHovered = hoveredState === id;
          const fillColor = data ? signalBgColors[data.signal] : "transparent";
          const strokeColor = data ? signalColors[data.signal] : "#CBD5E1";

          return (
            <g key={id}>
              <path
                d={path}
                fill={fillColor}
                stroke={strokeColor}
                strokeWidth={isSelected || isHovered ? 3 : 1.5}
                className="cursor-pointer transition-all duration-200"
                onMouseEnter={() => setHoveredState(id)}
                onMouseLeave={() => setHoveredState(null)}
                onClick={() => onStateSelect?.(id)}
                style={{
                  filter: isSelected
                    ? "drop-shadow(0 4px 6px rgba(0,0,0,0.1))"
                    : undefined,
                  transform: isHovered ? "scale(1.02)" : undefined,
                  transformOrigin: "center",
                }}
              />
              {/* Anomaly pulse indicator */}
              {data?.hasAnomaly && (
                <circle
                  cx={getStateCentroid(path).x}
                  cy={getStateCentroid(path).y}
                  r="8"
                  fill={signalColors[data.signal]}
                  className="animate-ping"
                  opacity="0.6"
                />
              )}
              {data?.hasAnomaly && (
                <circle
                  cx={getStateCentroid(path).x}
                  cy={getStateCentroid(path).y}
                  r="5"
                  fill={signalColors[data.signal]}
                />
              )}
            </g>
          );
        })}

        {/* State Labels */}
        {Object.entries(statesPaths).map(([id, path]) => {
          const centroid = getStateCentroid(path);
          return (
            <text
              key={`label-${id}`}
              x={centroid.x}
              y={centroid.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-[8px] font-semibold fill-slate-600 pointer-events-none"
            >
              {id}
            </text>
          );
        })}
      </svg>

      {/* Hover Tooltip */}
      {hoveredState && (
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm border border-slate-200/60 rounded-xl shadow-lg p-4 z-10 w-48 transition-all animate-in fade-in zoom-in-95 duration-200">
          {(() => {
            const data = getStateData(hoveredState);
            if (!data) return null;
            return (
              <>
                <p className="font-semibold text-foreground">{data.name}</p>
                <p className="text-sm text-muted-foreground">
                  Cases: {data.cases}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: signalColors[data.signal] }}
                  />
                  <span className="text-xs capitalize">
                    {data.signal} Alert
                  </span>
                </div>
                {data.hasAnomaly && (
                  <p className="text-xs text-red-600 font-semibold mt-1">
                    ⚠️ Anomaly Detected
                  </p>
                )}
              </>
            );
          })()}
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur rounded-xl shadow-sm border border-slate-200/50 p-3.5 text-xs">
        <p className="font-bold text-slate-700 tracking-tight mb-2 uppercase text-[10px]">Signal Intensity</p>
        <div className="space-y-1.5 flex flex-col">
          {Object.entries(signalColors).map(([key, color]) => (
            <div key={key} className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded shadow-sm"
                style={{ backgroundColor: color }}
              />
              <span className="capitalize font-medium text-slate-600">{key}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur shadow-sm border border-slate-200/50 rounded-xl p-3 text-xs">
        <p className="font-bold text-foreground tracking-tight">742 Districts Monitored</p>
        <p className="text-[10px] uppercase font-bold text-teal-600 tracking-wider mt-0.5">Real-time telemetry</p>
      </div>
    </div>
  );
}

// Helper function to get approximate centroid of a path
function getStateCentroid(path: string): { x: number; y: number } {
  const matches = path.match(/[ML]\s*(\d+),(\d+)/g);
  if (!matches) return { x: 0, y: 0 };

  let sumX = 0,
    sumY = 0;
  matches.forEach((match) => {
    const [, x, y] = match.match(/(\d+),(\d+)/) || [];
    sumX += parseInt(x);
    sumY += parseInt(y);
  });

  return {
    x: sumX / matches.length,
    y: sumY / matches.length,
  };
}
