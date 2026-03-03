"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { AWSBadge } from "@/components/ui/aws-badge";
import { LivePulse } from "@/components/ui/live-pulse";
import { TriageChip } from "@/components/ui/triage-chip";
import { Users, ArrowRight } from "lucide-react";

interface QueuePatient {
  token: string;
  initials: string;
  name: string;
  age: string;
  complaint: string;
  wait: string;
  triage: "red" | "amber" | "green";
  status: "waiting" | "in-consultation" | "completed";
  uhid: string;
}

interface QueuePanelProps {
  patients: QueuePatient[];
  avgWaitTime: number;
  aiAccuracy: number;
  overflowStatus: "LOW" | "MOD" | "HIGH";
}

export function QueuePanel({
  patients,
  avgWaitTime,
  aiAccuracy,
  overflowStatus,
}: QueuePanelProps) {
  const getOverflowColor = (status: string) => {
    switch (status) {
      case "HIGH":
        return "text-red-600";
      case "MOD":
        return "text-amber-600";
      default:
        return "text-emerald-600";
    }
  };

  return (
    <Card className="p-5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-teal-50 dark:bg-teal-950/50">
            <Users className="h-4 w-4 text-teal-600" />
          </div>
          <h3 className="text-base font-semibold text-foreground">
            Today&apos;s Queue
          </h3>
          <LivePulse active color="teal" size="sm" />
        </div>
        <AWSBadge service="HealthLake" />
      </div>

      {/* Queue List */}
      <div className="space-y-1 flex-1 max-h-[380px] overflow-y-auto custom-scrollbar pr-1">
        {patients.map((patient, idx) => (
          <div
            key={patient.token}
            className={`flex items-center gap-3 p-2.5 rounded-lg cursor-pointer transition-all duration-200 group ${
              patient.status === "in-consultation"
                ? "bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800 shadow-sm"
                : idx % 2 === 0
                ? "hover:bg-slate-50 dark:hover:bg-slate-800/50"
                : "bg-slate-50/50 dark:bg-slate-800/20 hover:bg-slate-100 dark:hover:bg-slate-800/50"
            }`}
          >
            <span className="text-xs font-mono text-muted-foreground w-14 flex-shrink-0">
              {patient.token}
            </span>
            <div className="h-8 w-8 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-semibold text-teal-700 dark:text-teal-300">
                {patient.initials}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {patient.name}{" "}
                <span className="text-muted-foreground font-normal">
                  · {patient.age}
                </span>
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {patient.complaint}
              </p>
            </div>
            <span className="text-xs text-muted-foreground flex-shrink-0">
              {patient.status === "in-consultation" ? (
                <span className="text-teal-600 font-medium flex items-center gap-1">
                  <LivePulse active color="teal" size="sm" />
                  In Consult
                </span>
              ) : (
                patient.wait
              )}
            </span>
            <TriageChip level={patient.triage} />
            <ArrowRight className="h-3.5 w-3.5 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
          </div>
        ))}
      </div>

      {/* Queue Intelligence Mini Card */}
      <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
        <p className="text-xs font-semibold text-muted-foreground mb-3 tracking-wide">
          QUEUE INTELLIGENCE
        </p>
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50">
            <p className="text-lg font-bold text-foreground">
              {avgWaitTime}
              <span className="text-xs font-normal text-muted-foreground ml-0.5">
                min
              </span>
            </p>
            <p className="text-xs text-muted-foreground">Avg wait</p>
          </div>
          <div className="text-center p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50">
            <p className="text-lg font-bold text-emerald-600">
              {aiAccuracy}%
            </p>
            <p className="text-xs text-muted-foreground">AI accuracy</p>
          </div>
          <div className="text-center p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50">
            <p
              className={`text-lg font-bold ${getOverflowColor(
                overflowStatus
              )}`}
            >
              {overflowStatus}
            </p>
            <p className="text-xs text-muted-foreground">Overflow</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
