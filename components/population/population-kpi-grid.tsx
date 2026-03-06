"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { MapPin, Users, AlertTriangle, ShieldCheck } from "lucide-react";

interface PopulationKpiGridProps {
  metrics: {
    activeDistricts: number;
    totalCases: number;
    activeAlerts: number;
    highRiskZones: number;
  };
  className?: string;
}

export function PopulationKpiGrid({ metrics, className }: PopulationKpiGridProps) {
  const cards = [
    {
      title: "Active Districts",
      value: metrics.activeDistricts,
      trend: "+12",
      trendLabel: "vs expected",
      icon: MapPin,
      color: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
      description: "Reporting real-time data",
    },
    {
      title: "Total Cases (7d)",
      value: metrics.totalCases.toLocaleString(),
      trend: "+8.4%",
      trendLabel: "vs last week",
      icon: Users,
      color: "bg-teal-50 text-teal-600 dark:bg-teal-900/20 dark:text-teal-400",
      description: "Across all syndromes",
    },
    {
      title: "Active Alerts",
      value: metrics.activeAlerts,
      trend: "-2",
      trendLabel: "since yesterday",
      icon: AlertTriangle,
      color:
        metrics.activeAlerts > 0
          ? "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400"
          : "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400",
      description: "Requiring investigation",
    },
    {
      title: "High Risk Zones",
      value: metrics.highRiskZones,
      trend: "stable",
      trendLabel: "RCFM model",
      icon: ShieldCheck,
      color: "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400",
      description: "Under close surveillance",
    },
  ];

  return (
    <div className={cn("grid gap-4", className)}>
      {cards.map((card, i) => (
        <Card
          key={i}
          className="p-5 hover-lift relative overflow-hidden group border-border bg-white dark:bg-slate-900"
        >
          {/* Subtle gradient background effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50/50 dark:from-slate-900 dark:to-slate-900/50 -z-10" />

          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                {card.title}
              </p>
              <div className="mt-2 flex items-baseline gap-2">
                <p className="text-3xl font-bold tracking-tight text-foreground font-heading">
                  {card.value}
                </p>
              </div>
              <p className="mt-1 text-xs text-muted-foreground flex items-center gap-1.5 leading-snug">
                <span
                  className={cn(
                    "font-medium tracking-tight px-1.5 py-0.5 rounded-full text-[10px]",
                    card.trend.startsWith("+") && card.title !== "Total Cases (7d)"
                      ? "bg-amber-100/50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                      : card.trend.startsWith("+")
                      ? "bg-emerald-100/50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                      : card.trend === "stable" || card.trend.startsWith("-")
                      ? "bg-emerald-100/50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                      : "bg-slate-100 text-slate-600"
                  )}
                >
                  {card.trend}
                </span>
                <span className="truncate">{card.trendLabel}</span>
              </p>
            </div>
            <div
              className={cn(
                "p-3 rounded-2xl shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3",
                card.color
              )}
            >
              <card.icon className="h-5 w-5" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
