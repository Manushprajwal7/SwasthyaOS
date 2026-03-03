"use client";

import React from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Shield, Brain, Database, Activity } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

interface TrustMetric {
  name: string;
  value: number;
  status: "excellent" | "good" | "fair" | "poor";
  icon: React.ReactNode;
  description: string;
}

export function SystemTrustStatus() {
  const { t } = useLanguage();

  const trustMetrics: TrustMetric[] = [
    {
      name: t("trust.ai.accuracy"),
      value: 94,
      status: "excellent",
      icon: <Brain className="h-4 w-4" />,
      description: "Clinical decision support accuracy",
    },
    {
      name: t("trust.data.quality"),
      value: 98,
      status: "excellent",
      icon: <Database className="h-4 w-4" />,
      description: "FHIR compliance and data integrity",
    },
    {
      name: t("trust.system.reliability"),
      value: 99.8,
      status: "excellent",
      icon: <Activity className="h-4 w-4" />,
      description: "Uptime and performance metrics",
    },
    {
      name: t("trust.security.score"),
      value: 96,
      status: "excellent",
      icon: <Shield className="h-4 w-4" />,
      description: "HIPAA compliance and data protection",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300";
      case "good":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300";
      case "fair":
        return "bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300";
      default:
        return "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300";
    }
  };

  const overallTrustScore = Math.round(
    trustMetrics.reduce((sum, metric) => sum + metric.value, 0) /
      trustMetrics.length
  );

  return (
    <Card className="p-5">
      {/* Header Row: Overall Score + Summary */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/50 border border-emerald-200/50 dark:border-emerald-800/50">
            <span className="text-xl font-bold text-emerald-600">
              {overallTrustScore}%
            </span>
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground">
              {t("trust.overall.score")}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300 border-0 text-xs">
                {t("trust.system.trusted")}
              </Badge>
              <span className="text-xs text-muted-foreground">
                v2.1.4 · Updated 2h ago
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <Badge
            variant="outline"
            className="bg-emerald-50/50 text-emerald-600 border-emerald-200/50 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800/50"
          >
            {t("trust.compliant")}
          </Badge>
          <span>6 active data sources</span>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {trustMetrics.map((metric) => (
          <div
            key={metric.name}
            className="flex flex-col gap-2 p-3 rounded-xl border border-border bg-slate-50/50 dark:bg-slate-800/30 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="p-1.5 rounded-lg bg-white dark:bg-slate-800 shadow-sm text-muted-foreground">
                {metric.icon}
              </div>
              <Badge
                variant="outline"
                className={`text-[10px] px-1.5 py-0 ${getStatusColor(
                  metric.status
                )} border-0`}
              >
                {metric.status}
              </Badge>
            </div>
            <div>
              <div className="text-xl font-bold text-foreground">
                {metric.value}%
              </div>
              <p className="text-xs font-medium text-muted-foreground mt-0.5">
                {metric.name}
              </p>
            </div>
            <Progress value={metric.value} className="h-1.5" />
          </div>
        ))}
      </div>
    </Card>
  );
}
