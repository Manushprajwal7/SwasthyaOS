'use client';

import React from 'react';
import { MapPin, AlertTriangle } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface AlertPanelProps {
  severity: 'high' | 'medium' | 'low';
  title: string;
  location: string;
  description: string;
  confidence: number;
}

export function AlertPanel({
  severity,
  title,
  location,
  description,
  confidence,
}: AlertPanelProps) {
  const severityConfig = {
    high: {
      color: 'text-error',
      bgColor: 'bg-error/5',
      borderColor: 'border-l-error',
    },
    medium: {
      color: 'text-warning',
      bgColor: 'bg-warning/5',
      borderColor: 'border-l-warning',
    },
    low: {
      color: 'text-accent',
      bgColor: 'bg-accent/5',
      borderColor: 'border-l-accent',
    },
  };

  const config = severityConfig[severity];

  return (
    <div
      className={`rounded-lg border-l-4 ${config.borderColor} ${config.bgColor} p-4`}
    >
      <div className="flex items-start gap-3">
        <AlertTriangle className={`h-5 w-5 flex-shrink-0 mt-0.5 ${config.color}`} />
        <div className="flex-1">
          <h5 className="font-semibold text-foreground">{title}</h5>
          <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            {location}
          </div>
          <p className="mt-2 text-sm text-foreground">{description}</p>

          <div className="mt-3 flex items-center justify-between">
            <div className="text-xs font-semibold text-muted-foreground">
              AI CONFIDENCE
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-20 rounded-full bg-muted overflow-hidden">
                <div
                  className={`h-full ${severity === 'high' ? 'bg-error' : severity === 'medium' ? 'bg-warning' : 'bg-accent'}`}
                  style={{ width: `${confidence}%` }}
                />
              </div>
              <span className={`text-xs font-bold ${config.color}`}>
                {confidence}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
