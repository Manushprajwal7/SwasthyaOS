"use client";

import React from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
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
        return "bg-success text-success-foreground";
      case "good":
        return "bg-accent text-accent-foreground";
      case "fair":
        return "bg-warning text-warning-foreground";
      case "poor":
        return "bg-error text-error-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getProgressColor = (value: number) => {
    if (value >= 95) return "bg-success";
    if (value >= 85) return "bg-accent";
    if (value >= 70) return "bg-warning";
    return "bg-error";
  };

  const overallTrustScore = Math.round(
    trustMetrics.reduce((sum, metric) => sum + metric.value, 0) /
      trustMetrics.length,
  );

  return (
    <div className="space-y-6">
      {/* Overall Trust Score - Horizontal Layout */}
      <div className="flex items-center justify-between p-4 bg-success/5 rounded-lg border border-success/20">
        <div className="flex items-center gap-4">
          <div className="text-4xl font-bold text-success">
            {overallTrustScore}%
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">
              {t("trust.overall.score")}
            </p>
            <Badge className="mt-1 bg-success text-success-foreground">
              {t("trust.system.trusted")}
            </Badge>
          </div>
        </div>

        {/* Trust Factors - Inline */}
        <div className="flex items-center gap-6 text-xs text-muted-foreground">
          <div className="text-center">
            <div className="font-medium text-foreground">v2.1.4</div>
            <div>{t("trust.model.version")}</div>
          </div>
          <div className="text-center">
            <div className="font-medium text-foreground">
              2 {t("time.hours.ago")}
            </div>
            <div>{t("trust.last.updated")}</div>
          </div>
          <div className="text-center">
            <Badge
              variant="outline"
              className="bg-success/10 text-success border-success/20"
            >
              {t("trust.compliant")}
            </Badge>
            <div className="mt-1">{t("trust.audit.status")}</div>
          </div>
          <div className="text-center">
            <div className="font-medium text-foreground">6 active</div>
            <div>{t("trust.data.sources")}</div>
          </div>
        </div>
      </div>

      {/* Individual Metrics - Grid Layout */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {trustMetrics.map((metric) => (
          <div
            key={metric.name}
            className="space-y-3 p-4 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="text-muted-foreground">{metric.icon}</div>
              <Badge
                variant="outline"
                className={`text-xs ${getStatusColor(metric.status)}`}
              >
                {t(`common.${metric.status}` as keyof typeof t)}
              </Badge>
            </div>

            <div>
              <div className="text-2xl font-bold text-foreground mb-1">
                {metric.value}%
              </div>
              <p className="text-xs font-medium text-foreground">
                {metric.name}
              </p>
            </div>

            <Progress value={metric.value} className="h-2" />

            <p className="text-xs text-muted-foreground line-clamp-2">
              {metric.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
