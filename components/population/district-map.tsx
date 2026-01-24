'use client';

import React from 'react';
import { AlertCircle } from 'lucide-react';

interface District {
  name: string;
  signal: 'high' | 'medium' | 'low' | 'normal';
  cases: number;
  trend: 'up' | 'down' | 'stable';
  population: number;
}

interface DistrictMapProps {
  selectedSyndrome: string;
  timeRange: number;
  onSelectDistrict: (name: string) => void;
  selectedDistrict: string | null;
}

export function DistrictMap({
  selectedSyndrome,
  timeRange,
  onSelectDistrict,
  selectedDistrict,
}: DistrictMapProps) {
  const districts: District[] = [
    {
      name: 'Sehore',
      signal: 'high',
      cases: 42,
      trend: 'up',
      population: 2100000,
    },
    {
      name: 'Indore',
      signal: 'medium',
      cases: 28,
      trend: 'down',
      population: 3200000,
    },
    {
      name: 'Bhopal',
      signal: 'medium',
      cases: 32,
      trend: 'up',
      population: 2800000,
    },
    {
      name: 'Ujjain',
      signal: 'low',
      cases: 12,
      trend: 'stable',
      population: 1900000,
    },
    {
      name: 'Khandwa',
      signal: 'normal',
      cases: 2,
      trend: 'stable',
      population: 1200000,
    },
    {
      name: 'Raisen',
      signal: 'normal',
      cases: 1,
      trend: 'stable',
      population: 1100000,
    },
  ];

  const signalConfig = {
    high: { color: 'bg-error/20 border-error/50 ring-error/30', textColor: 'text-error', label: 'High Alert' },
    medium: {
      color: 'bg-warning/20 border-warning/50 ring-warning/30',
      textColor: 'text-warning',
      label: 'Medium Alert',
    },
    low: { color: 'bg-accent/20 border-accent/50 ring-accent/30', textColor: 'text-accent', label: 'Low Alert' },
    normal: {
      color: 'bg-success/20 border-success/50 ring-success/30',
      textColor: 'text-success',
      label: 'Normal',
    },
  };

  const trendEmoji = {
    up: '📈',
    down: '📉',
    stable: '➡️',
  };

  return (
    <div className="space-y-4">
      {/* District Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {districts.map((district) => {
          const config = signalConfig[district.signal];
          const isSelected = selectedDistrict === district.name;

          return (
            <button
              key={district.name}
              onClick={() => onSelectDistrict(isSelected ? null : district.name)}
              className={`rounded-lg border-2 transition-all p-4 text-left ${
                isSelected
                  ? `${config.color} ring-2 ring-offset-2`
                  : `border-border hover:border-primary/50 ${config.color}`
              }`}
            >
              <div className="space-y-2">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <h4 className="font-semibold text-foreground">
                    {district.name}
                  </h4>
                  <span className="text-lg">{trendEmoji[district.trend]}</span>
                </div>

                {/* Cases */}
                <div>
                  <p className={`text-2xl font-bold ${config.textColor}`}>
                    {district.cases}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {selectedSyndrome === 'all' ? 'Total cases' : 'Syndrome cases'}
                  </p>
                </div>

                {/* Status Badge */}
                <div
                  className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${config.textColor}`}
                >
                  {config.label}
                </div>

                {/* Population */}
                <p className="text-xs text-muted-foreground">
                  Pop: {(district.population / 1000000).toFixed(1)}M
                </p>

                {/* Incidence Rate */}
                <div className="text-xs text-muted-foreground">
                  Incidence: {((district.cases / district.population) * 100000).toFixed(1)}/100k
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* District Details */}
      {selectedDistrict && (
        <div className="rounded-lg bg-muted/50 p-4 border border-border">
          <p className="text-sm font-semibold text-foreground mb-2">
            {selectedDistrict} - Detailed View
          </p>
          <p className="text-xs text-muted-foreground">
            Click on district name to see granular data: PHC-wise breakdown, age distribution, symptom clustering patterns.
          </p>
        </div>
      )}

      {/* Legend */}
      <div className="flex flex-wrap gap-4 pt-4 border-t border-border">
        <div className="text-xs">
          <p className="font-semibold text-foreground mb-2">Signal Status</p>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-error" />
              <span className="text-muted-foreground">High Alert</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-warning" />
              <span className="text-muted-foreground">Medium Alert</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-accent" />
              <span className="text-muted-foreground">Low Alert</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-success" />
              <span className="text-muted-foreground">Normal</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
