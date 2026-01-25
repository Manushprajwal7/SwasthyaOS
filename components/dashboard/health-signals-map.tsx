"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface HealthSignal {
  district: string;
  severity: "low" | "medium" | "high" | "critical";
  cases: number;
  trend: "increasing" | "decreasing" | "stable";
}

const mockHealthSignals: HealthSignal[] = [
  {
    district: "Bengaluru Urban",
    severity: "high",
    cases: 16,
    trend: "increasing",
  },
  { district: "Mysuru", severity: "medium", cases: 8, trend: "stable" },
  { district: "Mangaluru", severity: "low", cases: 3, trend: "decreasing" },
  { district: "Hubballi", severity: "medium", cases: 12, trend: "increasing" },
  { district: "Belagavi", severity: "low", cases: 5, trend: "stable" },
  {
    district: "Kalaburagi",
    severity: "critical",
    cases: 24,
    trend: "increasing",
  },
];

export function HealthSignalsMap() {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-error text-error-foreground";
      case "high":
        return "bg-warning text-warning-foreground";
      case "medium":
        return "bg-accent text-accent-foreground";
      case "low":
        return "bg-success text-success-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "increasing":
        return "↗️";
      case "decreasing":
        return "↘️";
      case "stable":
        return "→";
      default:
        return "→";
    }
  };

  return (
    <div className="space-y-4">
      {/* Google Maps Embed - Bengaluru, Karnataka */}
      <div className="relative rounded-lg overflow-hidden border border-border">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d497511.23228709215!2d77.46612515!3d12.953945599999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1706000000000!5m2!1sen!2sin"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full"
        ></iframe>
      </div>

      {/* District List */}
      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-foreground">
          District Status
        </h4>
        <div className="space-y-1">
          {mockHealthSignals.map((signal) => (
            <div
              key={signal.district}
              className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${getSeverityColor(signal.severity).split(" ")[0]}`}
                ></div>
                <span className="text-sm font-medium text-foreground">
                  {signal.district}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  {signal.cases} cases
                </span>
                <span className="text-xs">{getTrendIcon(signal.trend)}</span>
                <Badge
                  variant="outline"
                  className={`text-xs ${getSeverityColor(signal.severity)}`}
                >
                  {signal.severity}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 pt-2 border-t border-border">
        <span className="text-xs text-muted-foreground">Severity:</span>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-success rounded-full"></div>
          <span className="text-xs text-muted-foreground">Low</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-accent rounded-full"></div>
          <span className="text-xs text-muted-foreground">Medium</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-warning rounded-full"></div>
          <span className="text-xs text-muted-foreground">High</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-error rounded-full"></div>
          <span className="text-xs text-muted-foreground">Critical</span>
        </div>
      </div>
    </div>
  );
}
