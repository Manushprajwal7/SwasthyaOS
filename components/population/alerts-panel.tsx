'use client';

import React from 'react';
import { AlertTriangle, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface AlertsPanelProps {
  syndrome: string;
  timeRange: number;
}

interface Alert {
  id: string;
  district: string;
  title: string;
  description: string;
  confidence: number;
  severity: 'high' | 'medium' | 'low';
  affectedPopulation: number;
}

export function AlertsPanel({ syndrome, timeRange }: AlertsPanelProps) {
  const alerts: Alert[] = [
    {
      id: '1',
      district: 'Sehore',
      title: 'Unusual Fever Cluster',
      description: '16 cases in 48h. Pattern suggests outbreak.',
      confidence: 92,
      severity: 'high',
      affectedPopulation: 45000,
    },
    {
      id: '2',
      district: 'Bhopal',
      title: 'Rising Respiratory Cases',
      description: 'Week-on-week increase: 18% trend',
      confidence: 78,
      severity: 'medium',
      affectedPopulation: 23000,
    },
    {
      id: '3',
      district: 'Indore',
      title: 'GI Syndrome Spike',
      description: 'Food contamination suspected in PHC zone',
      confidence: 85,
      severity: 'medium',
      affectedPopulation: 8000,
    },
  ];

  const severityConfig = {
    high: { color: 'bg-error/10 border-error/20 border-l-4 border-l-error', badge: 'text-error' },
    medium: {
      color: 'bg-warning/10 border-warning/20 border-l-4 border-l-warning',
      badge: 'text-warning',
    },
    low: { color: 'bg-accent/10 border-accent/20 border-l-4 border-l-accent', badge: 'text-accent' },
  };

  return (
    <Card className="p-6 h-fit">
      <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
        <AlertTriangle className="h-5 w-5 text-error" />
        AI Alerts ({alerts.length})
      </h3>

      <div className="space-y-3">
        {alerts.map((alert) => {
          const config = severityConfig[alert.severity];
          return (
            <div key={alert.id} className={`rounded-lg p-3 ${config.color}`}>
              <div className="flex items-start justify-between gap-2 mb-2">
                <h4 className="font-semibold text-foreground text-sm">
                  {alert.title}
                </h4>
                <span className={`text-xs font-bold ${config.badge} whitespace-nowrap`}>
                  {alert.severity.toUpperCase()}
                </span>
              </div>

              <p className="text-xs text-foreground mb-2">{alert.description}</p>

              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-muted-foreground">
                  <span>District</span>
                  <span className="font-semibold text-foreground">
                    {alert.district}
                  </span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Affected Population</span>
                  <span className="font-semibold text-foreground">
                    {(alert.affectedPopulation / 1000).toFixed(0)}k
                  </span>
                </div>

                {/* Confidence Indicator */}
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/50">
                  <span className="text-muted-foreground">Confidence</span>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-16 rounded-full bg-border overflow-hidden">
                      <div
                        className={`h-full ${config.badge.replace('text-', 'bg-')}`}
                        style={{ width: `${alert.confidence}%` }}
                      />
                    </div>
                    <span className={`font-bold ${config.badge}`}>
                      {alert.confidence}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <TrendingUp className="h-3 w-3" />
          <span>
            {alerts.length} anomalies detected in last {timeRange}h
          </span>
        </div>
      </div>
    </Card>
  );
}
