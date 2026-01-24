'use client';

import React from 'react';
import { X, TrendingUp } from 'lucide-react';

interface RightPanelProps {
  title: string;
  content: string;
  confidence?: number;
  onClose: () => void;
}

export function RightPanel({ title, content, confidence, onClose }: RightPanelProps) {
  return (
    <div className="flex w-80 flex-col border-l border-border bg-card">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-foreground">{title}</h3>
        </div>
        <button
          onClick={onClose}
          className="rounded-lg p-1 hover:bg-muted"
          aria-label="Close panel"
        >
          <X className="h-5 w-5 text-muted-foreground" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <p className="text-sm text-foreground leading-relaxed">{content}</p>

        {/* Confidence Badge */}
        {confidence !== undefined && (
          <div className="mt-6 space-y-2">
            <div className="text-xs font-semibold text-muted-foreground">
              AI CONFIDENCE
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="h-2 flex-1 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${confidence}%` }}
                  />
                </div>
                <span className="ml-2 text-xs font-semibold text-foreground">
                  {confidence}%
                </span>
              </div>
            </div>

            {/* Confidence Status */}
            <div
              className={`mt-3 rounded-lg px-3 py-2 text-xs font-medium ${
                confidence >= 85
                  ? 'bg-success/10 text-success'
                  : confidence >= 70
                    ? 'bg-accent/10 text-accent'
                    : 'bg-error/10 text-error'
              }`}
            >
              {confidence >= 85
                ? '✓ High Confidence'
                : confidence >= 70
                  ? '⚠ Medium Confidence'
                  : '⚠ Low Confidence - Human Review Recommended'}
            </div>
          </div>
        )}

        {/* Source References */}
        <div className="mt-6 space-y-2">
          <div className="text-xs font-semibold text-muted-foreground">
            SOURCES & REFERENCES
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">
              • WHO Clinical Guidelines
            </p>
            <p className="text-xs text-muted-foreground">
              • NITI Aayog Health Protocols
            </p>
            <p className="text-xs text-muted-foreground">
              • Regional Treatment Standards
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border px-6 py-4">
        <p className="text-xs text-muted-foreground">
          AI explanations are assistive. Clinical judgment supersedes all recommendations.
        </p>
      </div>
    </div>
  );
}
