'use client';

import React from 'react';

export function SystemTrustStatus() {
  const trustMetrics = [
    { label: 'Model Accuracy', value: 94, status: 'excellent' as const },
    { label: 'Data Consistency', value: 98, status: 'excellent' as const },
    { label: 'Clinical Validation', value: 91, status: 'excellent' as const },
    { label: 'System Reliability', value: 99.8, status: 'excellent' as const },
  ];

  const statusConfig = {
    excellent: { color: 'bg-success', textColor: 'text-success' },
    good: { color: 'bg-accent', textColor: 'text-accent' },
    warning: { color: 'bg-warning', textColor: 'text-warning' },
  };

  const overallTrust = Math.round(
    trustMetrics.reduce((sum, m) => sum + m.value, 0) / trustMetrics.length
  );

  return (
    <div className="space-y-4">
      {/* Overall Score */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">
          Overall Score
        </span>
        <div className="text-2xl font-bold text-foreground">{overallTrust}%</div>
      </div>

      {/* Trust Metrics */}
      <div className="space-y-3">
        {trustMetrics.map((metric) => {
          const config = statusConfig[metric.status];
          return (
            <div key={metric.label}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-muted-foreground">
                  {metric.label}
                </span>
                <span className="text-xs font-bold text-foreground">
                  {metric.value}%
                </span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className={`h-full ${config.color} transition-all`}
                  style={{ width: `${metric.value}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Status Badge */}
      <div className="mt-4 rounded-lg bg-success/10 px-3 py-2 text-center">
        <p className="text-xs font-semibold text-success">
          ✓ System Trustworthy
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Ready for clinical decision support
        </p>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-muted-foreground border-t border-border pt-3">
        <strong>Note:</strong> AI recommendations are assistive. Final clinical judgment rests with the healthcare provider.
      </p>
    </div>
  );
}
