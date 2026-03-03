"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { AWSBadge } from "@/components/ui/aws-badge";
import { LivePulse } from "@/components/ui/live-pulse";
import { ConfidenceRing } from "@/components/ui/confidence-ring";
import { Brain, Sparkles } from "lucide-react";

interface AIAlert {
  id: string;
  severity: "high" | "medium" | "info";
  time: string;
  title: string;
  confidence: number;
  service: string;
  latency: number;
}

interface AIFeedProps {
  alerts: AIAlert[];
}

export function AIFeed({ alerts }: AIFeedProps) {
  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case "high":
        return "border-l-red-500 bg-red-50/50 dark:bg-red-950/20";
      case "medium":
        return "border-l-amber-500 bg-amber-50/50 dark:bg-amber-950/20";
      default:
        return "border-l-blue-500 bg-blue-50/50 dark:bg-blue-950/20";
    }
  };

  const getSeverityTextColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-amber-600";
      default:
        return "text-blue-600";
    }
  };

  const getPulseColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "red" as const;
      case "medium":
        return "amber" as const;
      default:
        return "teal" as const;
    }
  };

  return (
    <Card className="p-5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-violet-50 dark:bg-violet-950/50">
            <Sparkles className="h-4 w-4 text-violet-600" />
          </div>
          <h3 className="text-base font-semibold text-foreground">
            AI Intelligence Feed
          </h3>
        </div>
        <AWSBadge service="Bedrock" />
      </div>

      {/* Alert Feed */}
      <div className="space-y-2 flex-1 max-h-[380px] overflow-y-auto custom-scrollbar pr-1">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-3 rounded-lg border-l-4 border border-slate-100 dark:border-slate-800 transition-all duration-300 hover-lift ${getSeverityStyles(
              alert.severity
            )}`}
          >
            <div className="flex items-start gap-2">
              <LivePulse
                active
                color={getPulseColor(alert.severity)}
                size="sm"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-muted-foreground">
                    {alert.time}
                  </span>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${getSeverityTextColor(
                      alert.severity
                    )} bg-white/50 dark:bg-slate-900/50`}
                  >
                    {alert.severity}
                  </span>
                </div>
                <p className="text-sm font-medium text-foreground leading-snug">
                  {alert.title}
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center gap-1.5">
                    <ConfidenceRing
                      score={alert.confidence}
                      size="sm"
                      showLabel={false}
                    />
                    <span className="text-xs text-muted-foreground">
                      {alert.confidence}%
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {alert.latency}ms
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-2 pl-5">
              <button className="text-xs text-teal-600 hover:text-teal-700 font-medium transition-colors">
                Investigate →
              </button>
              <button className="text-xs text-slate-400 hover:text-slate-600 transition-colors">
                Dismiss
              </button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
