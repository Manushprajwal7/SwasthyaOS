"use client";

import React, { useMemo } from "react";
import {
  TrendingUp,
  Bell,
  Calendar,
  Clock,
  Stethoscope,
  Users,
  Activity,
  Sun,
  Moon,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { AWSBadge } from "@/components/ui/aws-badge";
import { LivePulse } from "@/components/ui/live-pulse";
import { useLanguage } from "@/contexts/language-context";
import { useSimulation } from "@/hooks/use-simulation";
import { Button } from "@/components/ui/button";

// Import modular dashboard components
import { QueuePanel } from "./queue-panel";
import { KpiGrid } from "./kpi-grid";
import { AIFeed } from "./ai-feed";
import { SystemTrustStatus } from "./system-trust-status";

export function DashboardContent() {
  const { t } = useLanguage();
  const {
    patients,
    alerts,
    aiEvents,
    metrics,
    acknowledgeAlert,
    dismissAlert,
  } = useSimulation({
    enabled: true,
    patientArrivalInterval: 10000,
    alertInterval: 20000,
    aiEventInterval: 6000,
    metricUpdateInterval: 4000,
  });

  // Convert patients to queue format
  const queuePatients = useMemo(() => {
    return patients.slice(0, 8).map((p, idx) => ({
      token: `TK-${String(idx + 1).padStart(3, "0")}`,
      initials: p.name
        .split(" ")
        .map((n) => n[0])
        .join(""),
      name: p.name,
      age: `${p.age}${p.gender}`,
      complaint: p.chiefComplaint,
      wait: `${p.waitTime} min`,
      triage:
        p.triage === "critical"
          ? ("red" as const)
          : p.triage === "urgent"
          ? ("amber" as const)
          : ("green" as const),
      status: p.status,
      uhid: p.uhid,
    }));
  }, [patients]);

  // Convert AI events to alert format for display
  const aiAlerts = useMemo(() => {
    return aiEvents.slice(0, 6).map((event) => ({
      id: event.id,
      severity:
        event.type === "alert"
          ? ("high" as const)
          : event.type === "insight"
          ? ("medium" as const)
          : ("info" as const),
      time: event.timestamp.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      title: event.message,
      confidence: event.confidence,
      service: event.awsService,
      latency: event.latencyMs,
    }));
  }, [aiEvents]);

  // Critical alerts count
  const criticalAlertCount = useMemo(() => {
    return alerts.filter((a) => a.severity === "critical" && !a.acknowledged)
      .length;
  }, [alerts]);

  const now = new Date();
  const greeting =
    now.getHours() < 12
      ? "Good Morning"
      : now.getHours() < 17
      ? "Good Afternoon"
      : "Good Evening";
  const dateStr = now.toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-full">
      {/* ===== Welcome Banner ===== */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fade-in-up">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground font-heading">
            {greeting}, Dr. Kumar 👋
          </h1>
          <p className="mt-1 text-sm text-muted-foreground flex items-center gap-2">
            <Calendar className="h-3.5 w-3.5" />
            {dateStr}
            <span className="text-slate-300 dark:text-slate-600">|</span>
            <Clock className="h-3.5 w-3.5" />
            {now.toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-emerald-50 dark:bg-emerald-950/30 px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800">
            <LivePulse active color="green" size="sm" />
            <span>Real-time sync</span>
          </div>
          <AWSBadge service="HealthLake" model="FHIR R4" status="active" />
        </div>
      </div>

      {/* ===== Critical Alerts Banner ===== */}
      {criticalAlertCount > 0 && (
        <div className="p-4 rounded-xl bg-gradient-to-r from-red-50 to-red-50/50 dark:from-red-950/50 dark:to-red-950/20 border border-red-200 dark:border-red-800 flex items-center justify-between animate-fade-in-up">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-red-100 dark:bg-red-900">
              <Bell className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="font-semibold text-red-800 dark:text-red-200">
                {criticalAlertCount} Critical Alert
                {criticalAlertCount > 1 ? "s" : ""} Requiring Attention
              </p>
              <p className="text-sm text-red-600 dark:text-red-300">
                {
                  alerts.find(
                    (a) => a.severity === "critical" && !a.acknowledged
                  )?.title
                }
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-red-300 text-red-700 hover:bg-red-100 rounded-lg"
            onClick={() => {
              const alert = alerts.find(
                (a) => a.severity === "critical" && !a.acknowledged
              );
              if (alert) acknowledgeAlert(alert.id);
            }}
          >
            Acknowledge
          </Button>
        </div>
      )}

      {/* ===== KPI Row — Full Width ===== */}
      <div className="animate-fade-in-up" style={{ animationDelay: "0.05s" }}>
        <KpiGrid
          metrics={{
            consultationsToday: metrics.consultationsToday,
            aiRecommendations: metrics.aiRecommendations,
            bedOccupancy: metrics.bedOccupancy,
            activeAlerts:
              criticalAlertCount +
              alerts.filter((a) => a.severity === "warning").length,
            criticalAlertCount,
          }}
        />
      </div>

      {/* ===== Main Content: 2-Column Grid ===== */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* LEFT: Queue Panel (takes 7 cols) */}
        <div
          className="lg:col-span-7 animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          <QueuePanel
            patients={queuePatients}
            avgWaitTime={metrics.avgWaitTime}
            aiAccuracy={parseFloat(metrics.acceptanceRate.toFixed(1))}
            overflowStatus={
              metrics.waitingPatients > 8
                ? "HIGH"
                : metrics.waitingPatients > 5
                ? "MOD"
                : "LOW"
            }
          />
        </div>

        {/* RIGHT: AI Intelligence Feed (takes 5 cols) */}
        <div
          className="lg:col-span-5 animate-fade-in-up"
          style={{ animationDelay: "0.15s" }}
        >
          <AIFeed alerts={aiAlerts} />
        </div>
      </div>

      {/* ===== Model Performance & Regional Signals — Side by Side ===== */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Model Performance Card */}
        <Card
          className="p-5 hover-lift animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-foreground">
              Model Performance — Last 30 Days
            </h3>
            <AWSBadge service="Bedrock" model="Claude 3" />
          </div>

          {/* Stacked Bar */}
          <div className="space-y-3">
            <div className="h-8 rounded-full overflow-hidden flex bg-slate-100 dark:bg-slate-800">
              <div
                className="bg-teal-500 h-full transition-all duration-500 rounded-l-full"
                style={{
                  width: `${Math.round(metrics.acceptanceRate * 0.76)}%`,
                }}
              />
              <div
                className="bg-amber-400 h-full transition-all duration-500"
                style={{ width: "22%" }}
              />
              <div
                className="bg-red-400 h-full transition-all duration-500 rounded-r-full"
                style={{
                  width: `${
                    100 - Math.round(metrics.acceptanceRate * 0.76) - 22
                  }%`,
                }}
              />
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-teal-600 font-medium">
                ✓ Accepted: {Math.round(metrics.acceptanceRate * 0.76)}%
              </span>
              <span className="text-amber-600 font-medium">
                ✎ Edited: 22%
              </span>
              <span className="text-red-500 font-medium">
                ✕ Rejected:{" "}
                {100 - Math.round(metrics.acceptanceRate * 0.76) - 22}%
              </span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t dark:border-slate-700 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Current drift index:
            </span>
            <span className="text-sm font-mono font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded">
              0.031 ✓
            </span>
          </div>
        </Card>

        {/* Regional Signal Map */}
        <Card
          className="p-5 hover-lift animate-fade-in-up"
          style={{ animationDelay: "0.25s" }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-foreground">
              Regional Health Signals
            </h3>
            <AWSBadge service="Kinesis" model="SageMaker" />
          </div>
          <div className="h-44 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-xl flex items-center justify-center border border-dashed border-slate-200 dark:border-slate-700">
            <div className="text-center">
              <Activity className="h-8 w-8 text-slate-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-muted-foreground">
                India District Map
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                742 districts monitored
              </p>
            </div>
          </div>
          <div className="mt-3 flex gap-6 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              <span>Low</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
              <span>Moderate</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
              <span>High</span>
            </div>
          </div>
        </Card>
      </div>

      {/* ===== System Trust Scorecard — Full Width ===== */}
      <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
        <SystemTrustStatus />
      </div>
    </div>
  );
}
