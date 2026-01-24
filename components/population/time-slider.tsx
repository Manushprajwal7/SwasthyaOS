'use client';

import React from 'react';
import { Clock } from 'lucide-react';

interface TimeSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export function TimeSlider({ value, onChange }: TimeSliderProps) {
  const timeOptions = [
    { value: 6, label: '6 hours' },
    { value: 12, label: '12 hours' },
    { value: 24, label: '24 hours' },
    { value: 72, label: '3 days' },
    { value: 168, label: '1 week' },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4 text-secondary" />
        <label className="text-sm font-semibold text-foreground">
          Time Range
        </label>
      </div>

      <div className="flex flex-col gap-2">
        {timeOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`text-left px-3 py-2 rounded-lg text-sm transition-all ${
              value === option.value
                ? 'bg-secondary text-secondary-foreground font-semibold'
                : 'bg-muted text-foreground hover:bg-muted/80'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Current Selection */}
      <div className="pt-2 border-t border-border">
        <p className="text-xs font-semibold text-muted-foreground">
          SELECTED: {value}h
        </p>
      </div>
    </div>
  );
}
