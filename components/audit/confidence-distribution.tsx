'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

export function ConfidenceDistribution() {
  const confidenceData = [
    { range: '90-100%', count: 342, percentage: 40 },
    { range: '80-90%', count: 287, percentage: 34 },
    { range: '70-80%', count: 147, percentage: 17 },
    { range: '60-70%', count: 52, percentage: 6 },
    { range: '<60%', count: 19, percentage: 3 },
  ];

  const colors = ['#0F766E', '#1E40AF', '#F59E0B', '#DC2626', '#94A3B8'];

  return (
    <div className="space-y-6">
      {/* Chart */}
      <Card className="p-6">
        <h3 className="font-semibold text-foreground mb-4">
          AI Recommendation Confidence Distribution
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={confidenceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="range" />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #D1D5DB',
                borderRadius: '0.5rem',
              }}
            />
            <Bar dataKey="count" fill="#0F766E" radius={[8, 8, 0, 0]}>
              {confidenceData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Breakdown Table */}
      <Card className="p-6">
        <h3 className="font-semibold text-foreground mb-4">Confidence Bands Analysis</h3>

        <div className="space-y-3">
          {confidenceData.map((band, index) => (
            <div key={band.range}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">
                  {band.range}
                </span>
                <span className="text-sm font-bold text-foreground">
                  {band.count} recommendations
                </span>
              </div>
              <div className="h-3 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full transition-all"
                  style={{
                    width: `${band.percentage}%`,
                    backgroundColor: colors[index],
                  }}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-muted-foreground">
                  {band.percentage}%
                </span>
                <span className="text-xs text-muted-foreground">
                  {((band.count / 847) * 100).toFixed(1)}% of all
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Quality Assessment */}
      <Card className="bg-primary/5 border-primary/20 p-6">
        <h3 className="font-semibold text-foreground mb-3">Quality Assessment</h3>
        <div className="space-y-2 text-sm text-foreground leading-relaxed">
          <p>
            <strong>High Confidence (90%+):</strong> 40% of all recommendations. Safe
            for autonomous acceptance with minimal review.
          </p>
          <p>
            <strong>Medium Confidence (70-90%):</strong> 51% of recommendations.
            Require clinician review but generally reliable.
          </p>
          <p>
            <strong>Low Confidence (60-70%):</strong> 9% of recommendations. Should
            always require expert validation before clinical use.
          </p>
        </div>

        <div className="mt-4 p-3 rounded-lg bg-success/10 border border-success/20">
          <p className="text-xs font-semibold text-success">
            ✓ 91% of recommendations are in high-medium confidence range
          </p>
        </div>
      </Card>
    </div>
  );
}
