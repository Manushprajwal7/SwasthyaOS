'use client';

import React from 'react';

interface District {
  name: string;
  signal: 'high' | 'medium' | 'low' | 'normal';
  count: number;
}

export function HealthSignalsMap() {
  const districts: District[] = [
    { name: 'Sehore', signal: 'high', count: 16 },
    { name: 'Indore', signal: 'medium', count: 4 },
    { name: 'Bhopal', signal: 'medium', count: 3 },
    { name: 'Ujjain', signal: 'low', count: 1 },
    { name: 'Khandwa', signal: 'normal', count: 0 },
    { name: 'Raisen', signal: 'normal', count: 0 },
  ];

  const signalConfig = {
    high: { color: 'bg-error', textColor: 'text-error', label: '🔴 High' },
    medium: { color: 'bg-warning', textColor: 'text-warning', label: '🟡 Medium' },
    low: { color: 'bg-accent', textColor: 'text-accent', label: '🟠 Low' },
    normal: { color: 'bg-success', textColor: 'text-success', label: '🟢 Normal' },
  };

  return (
    <div className="space-y-4">
      {/* Simplified District Heat Map */}
      <div className="grid grid-cols-2 gap-2">
        {districts.map((district) => {
          const config = signalConfig[district.signal];
          return (
            <div key={district.name} className="space-y-1">
              <div className="flex items-center gap-2">
                <div
                  className={`h-3 w-3 rounded-full ${config.color}`}
                />
                <span className="text-xs font-medium text-foreground">
                  {district.name}
                </span>
              </div>
              {district.count > 0 && (
                <p className={`text-xs font-semibold ${config.textColor}`}>
                  {district.count} {district.count === 1 ? 'case' : 'cases'}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="border-t border-border pt-3 space-y-1.5">
        <div className="text-xs font-semibold text-muted-foreground mb-2">
          SIGNAL STATUS
        </div>
        {Object.entries(signalConfig).map(([key, config]) => (
          <div key={key} className="flex items-center gap-2 text-xs">
            <div className={`h-2 w-2 rounded-full ${config.color}`} />
            <span className="text-muted-foreground">{config.label}</span>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-4 rounded-lg bg-muted/50 p-3">
        <p className="text-xs text-foreground">
          <strong>24 hours:</strong> 24 cases across 4 districts
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Highest concentration in Sehore region
        </p>
      </div>
    </div>
  );
}
