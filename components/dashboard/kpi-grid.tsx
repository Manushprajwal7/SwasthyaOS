"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { LivePulse } from "@/components/ui/live-pulse";
import {
  TrendingUp,
  RefreshCcw,
  Activity,
  AlertCircle,
  Stethoscope,
  Brain,
  BedDouble,
  Bell,
} from "lucide-react";

interface KPIData {
  consultationsToday: number;
  aiRecommendations: number;
  bedOccupancy: number;
  activeAlerts: number;
  criticalAlertCount: number;
}

interface KpiGridProps {
  metrics: KPIData;
}

export function KpiGrid({ metrics }: KpiGridProps) {
  const getBedOccupancyColor = (value: number) => {
    if (value > 85) return "bg-red-500";
    if (value > 70) return "bg-amber-500";
    return "bg-emerald-500";
  };

  const kpiCards = [
    {
      label: "CONSULTATIONS TODAY",
      value: metrics.consultationsToday,
      suffix: "",
      icon: <Stethoscope className="h-5 w-5" />,
      accentClass: "kpi-teal",
      iconBg: "bg-teal-50 dark:bg-teal-950/50 text-teal-600",
      change: `+${Math.floor(Math.random() * 10) + 3} vs yesterday`,
      changeColor: "text-emerald-600",
      changeIcon: <TrendingUp className="h-3 w-3" />,
    },
    {
      label: "AI RECOMMENDATIONS",
      value: metrics.aiRecommendations,
      suffix: "",
      icon: <Brain className="h-5 w-5" />,
      accentClass: "kpi-blue",
      iconBg: "bg-blue-50 dark:bg-blue-950/50 text-blue-600",
      change: "Live updating",
      changeColor: "text-teal-600",
      changeIcon: (
        <RefreshCcw
          className="h-3 w-3 animate-spin"
          style={{ animationDuration: "3s" }}
        />
      ),
    },
    {
      label: "BED OCCUPANCY",
      value: `${metrics.bedOccupancy.toFixed(0)}%`,
      icon: <BedDouble className="h-5 w-5" />,
      accentClass: "kpi-amber",
      iconBg: "bg-amber-50 dark:bg-amber-950/50 text-amber-600",
      progress: metrics.bedOccupancy,
      progressColor: getBedOccupancyColor(metrics.bedOccupancy),
    },
    {
      label: "ACTIVE ALERTS",
      value: metrics.activeAlerts,
      suffix: "",
      icon: <Bell className="h-5 w-5" />,
      accentClass: "kpi-red",
      iconBg: "bg-red-50 dark:bg-red-950/50 text-red-600",
      valueColor: "text-red-600",
      change: `${metrics.criticalAlertCount} critical`,
      changeColor: "text-muted-foreground",
      pulse: true,
    },
  ];

  return (
    <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
      {kpiCards.map((kpi) => (
        <Card
          key={kpi.label}
          className={`p-4 hover-lift ${kpi.accentClass}`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2 rounded-lg ${kpi.iconBg}`}>{kpi.icon}</div>
            {kpi.pulse && <LivePulse active color="red" size="sm" />}
          </div>
          <p className="text-xs font-semibold text-muted-foreground tracking-wide">
            {kpi.label}
          </p>
          <p
            className={`text-2xl lg:text-3xl font-bold mt-1 ${
              kpi.valueColor || "text-foreground"
            }`}
          >
            {kpi.value}
          </p>
          {kpi.progress !== undefined && (
            <div className="mt-2 h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 rounded-full ${kpi.progressColor}`}
                style={{ width: `${kpi.progress}%` }}
              />
            </div>
          )}
          {kpi.change && (
            <p className={`text-xs ${kpi.changeColor} mt-2 flex items-center gap-1`}>
              {kpi.changeIcon}
              {kpi.change}
            </p>
          )}
        </Card>
      ))}
    </div>
  );
}
