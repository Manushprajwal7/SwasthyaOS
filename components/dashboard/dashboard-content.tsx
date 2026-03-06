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
import { HealthSignalsMap } from "./health-signals-map";

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

      {/* ===== Layout Wrapper: 12-Column Grid ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-6">
        
        {/* ========================================================
            LEFT PILLAR (Col Span 3): Telemetry & KPIs
            ======================================================== */}
        <div className="lg:col-span-3 space-y-6 flex flex-col">
          {/* Vertical KPI Cards */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.05s" }}>
            <KpiGrid
              className="grid gap-4 grid-cols-1"
              metrics={{
                consultationsToday: metrics.consultationsToday,
                aiRecommendations: metrics.aiRecommendations,
                bedOccupancy: metrics.bedOccupancy,
                activeAlerts:
                  criticalAlertCount + alerts.filter((a) => a.severity === "warning").length,
                criticalAlertCount,
              }}
            />
          </div>

          {/* Model Performance Card */}
          <Card
            className="p-5 hover-lift animate-fade-in-up mt-auto"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-foreground">
                Model Performance (30d)
              </h3>
            </div>
            {/* Stacked Bar */}
            <div className="space-y-3">
              <div className="h-8 rounded-full overflow-hidden flex bg-slate-100 dark:bg-slate-800">
                <div
                  className="bg-teal-500 h-full transition-all duration-500 rounded-l-full"
                  style={{ width: `${Math.round(metrics.acceptanceRate * 0.76)}%` }}
                />
                <div
                  className="bg-amber-400 h-full transition-all duration-500"
                  style={{ width: "22%" }}
                />
                <div
                  className="bg-red-400 h-full transition-all duration-500 rounded-r-full"
                  style={{
                    width: `${100 - Math.round(metrics.acceptanceRate * 0.76) - 22}%`,
                  }}
                />
              </div>
              <div className="flex justify-between text-[11px] sm:text-xs">
                <span className="text-teal-600 font-medium">
                  ✓ {Math.round(metrics.acceptanceRate * 0.76)}%
                </span>
                <span className="text-amber-600 font-medium">
                  ✎ 22%
                </span>
                <span className="text-red-500 font-medium">
                  ✕ {100 - Math.round(metrics.acceptanceRate * 0.76) - 22}%
                </span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t dark:border-slate-700 flex items-center justify-between">
              <span className="text-xs text-muted-foreground mr-1">Drift index:</span>
              <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 px-1.5 py-0.5 rounded">
                0.031 ✓
              </span>
            </div>
            <div className="mt-4 w-full flex justify-end">
              <AWSBadge service="Bedrock" model="Claude 3" />
            </div>
          </Card>
        </div>

        {/* ========================================================
            CENTER PILLAR (Col Span 6): Primary Operations
            ======================================================== */}
        <div className="lg:col-span-6 space-y-6 flex flex-col h-full">
          {/* Critical Alerts Banner */}
          {criticalAlertCount > 0 && (
            <div className="p-4 rounded-xl bg-gradient-to-r from-red-50 to-red-50/50 dark:from-red-950/50 dark:to-red-950/20 border border-red-200 dark:border-red-800 flex items-center justify-between animate-fade-in-up">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-red-100 dark:bg-red-900 flex-shrink-0">
                  <Bell className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="font-semibold text-red-800 dark:text-red-200 text-sm">
                    {criticalAlertCount} Critical Alert
                    {criticalAlertCount > 1 ? "s" : ""}
                  </p>
                  <p className="text-xs text-red-600 dark:text-red-300 line-clamp-1">
                    {alerts.find((a) => a.severity === "critical" && !a.acknowledged)?.title}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-red-300 text-red-700 hover:bg-red-100 rounded-lg whitespace-nowrap ml-2"
                onClick={() => {
                  const alert = alerts.find((a) => a.severity === "critical" && !a.acknowledged);
                  if (alert) acknowledgeAlert(alert.id);
                }}
              >
                Acknowledge
              </Button>
            </div>
          )}

          {/* Patient Queue Panel */}
          <div className="animate-fade-in-up flex-1" style={{ animationDelay: "0.1s" }}>
            <QueuePanel
              patients={queuePatients}
              avgWaitTime={metrics.avgWaitTime}
              aiAccuracy={parseFloat(metrics.acceptanceRate.toFixed(1))}
              overflowStatus={
                metrics.waitingPatients > 8 ? "HIGH" : metrics.waitingPatients > 5 ? "MOD" : "LOW"
              }
            />
          </div>

          {/* System Trust Scorecard below the Queue Panel */}
          <div className="animate-fade-in-up mt-auto" style={{ animationDelay: "0.3s" }}>
            <SystemTrustStatus />
          </div>
        </div>

        {/* ========================================================
            RIGHT PILLAR (Col Span 3): Intel & Surveillance
            ======================================================== */}
        <div className="lg:col-span-3 space-y-6 flex flex-col">
          {/* AI Intelligence Feed */}
          <div className="animate-fade-in-up flex-1 md:max-h-[50vh] lg:max-h-none" style={{ animationDelay: "0.1s" }}>
            <AIFeed alerts={aiAlerts} />
          </div>

          {/* Regional Health Map */}
          <Card
            className="p-5 hover-lift animate-fade-in-up shrink-0"
            style={{ animationDelay: "0.25s" }}
          >
            <div className="flex flex-col mb-4 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-foreground">
                  Signals
                </h3>
                <AWSBadge service="Kinesis" model="SageMaker" />
              </div>
            </div>
            <HealthSignalsMap />
          </Card>
        </div>
      </div>
    </div>
  );
}
