"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IndiaMap } from "./india-map";
import { AlertsPanel } from "./alerts-panel";
import { SituationReport } from "./situation-report";
import { AWSBadge } from "@/components/ui/aws-badge";
import { LivePulse } from "@/components/ui/live-pulse";
import { ConfidenceRing } from "@/components/ui/confidence-ring";
import { useLanguage } from "@/contexts/language-context";
import { useToast } from "@/hooks/use-toast";
import { TrendingUp, AlertTriangle, Calendar, Clock, Activity, SignalHigh } from "lucide-react";
import { PopulationKpiGrid } from "./population-kpi-grid";

export function PopulationHealthRadarContent() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [selectedSyndrome, setSelectedSyndrome] = useState("all");
  const [timeRange, setTimeRange] = useState(24);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [activeOverlay, setActiveOverlay] = useState("Cases");

  const [dateStr, setDateStr] = useState("");
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const now = new Date();
    setDateStr(
      now.toLocaleDateString("en-IN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
    setTimeStr(
      now.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  }, []);

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-full">
      {/* ===== Welcome Banner ===== */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fade-in-up">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground font-heading">
            {t("population.title")} (JanSwasthyaWatch)
          </h1>
          <p className="mt-1 text-sm text-muted-foreground flex items-center gap-2">
            <Calendar className="h-3.5 w-3.5" />
            {dateStr}
            <span className="text-slate-300 dark:text-slate-600">|</span>
            <Clock className="h-3.5 w-3.5" />
            {timeStr}
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-emerald-50 dark:bg-emerald-950/30 px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800">
            <LivePulse active color="green" size="sm" />
            <span>Surveillance active</span>
          </div>
          <AWSBadge service="Amazon Kinesis" model="SageMaker" status="active" />
        </div>
      </div>

      {/* ===== Layout Wrapper: 12-Column Grid ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-6">
        
        {/* ========================================================
            LEFT PILLAR (Col Span 3): Telemetry & KPIs
            ======================================================== */}
        <div className="lg:col-span-3 space-y-6 flex flex-col h-[calc(100vh-12rem)] overflow-y-auto custom-scrollbar pr-1">
          {/* Controls Container */}
          <Card className="p-4 space-y-5 flex-shrink-0 bg-slate-50 border border-slate-200 dark:bg-slate-900 shadow-sm border-border z-10">
            {/* Syndrome Filter */}
            <div>
              <p className="text-[10px] font-semibold text-muted-foreground mb-2 tracking-wider uppercase">
                Syndrome Model
              </p>
              <div className="flex flex-wrap gap-1.5">
                {["all", "fever", "respiratory", "gi", "vector"].map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setSelectedSyndrome(s);
                      toast({
                        title: "Syndrome Model Updated",
                        description: `Now filtering surveillance data for ${s === "all" ? "All Syndromes" : s.charAt(0).toUpperCase() + s.slice(1)}.`,
                      });
                    }}
                    className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-colors ${
                      selectedSyndrome === s
                        ? "bg-teal-600 shadow-sm text-white"
                        : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                    }`}
                  >
                    {s === "all" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Range */}
            <div>
              <p className="text-[10px] font-semibold text-muted-foreground mb-2 tracking-wider uppercase">
                Temporal Window
              </p>
              <div className="flex gap-1.5">
                {[
                  { label: "7D", value: 168 },
                  { label: "30D", value: 720 },
                  { label: "90D", value: 2160 },
                ].map((t) => (
                  <button
                    key={t.value}
                    onClick={() => {
                      setTimeRange(t.value);
                      toast({
                        title: "Temporal Window Changed",
                        description: `Analyzing trends over the last ${t.label}.`,
                      });
                    }}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border ${
                      timeRange === t.value
                        ? "bg-teal-50 border-teal-600 text-teal-700"
                        : "bg-white text-slate-600 border-slate-200"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Data Overlay */}
            <div>
              <p className="text-[10px] font-semibold text-muted-foreground mb-2 tracking-wider uppercase">
                Overlay Matrix
              </p>
              <div className="flex gap-1.5">
                {["Cases", "Rate", "Change %"].map((o) => (
                  <button
                    key={o}
                    onClick={() => {
                      setActiveOverlay(o);
                      toast({
                        title: "Overlay Changed",
                        description: `Map data re-rendered to show ${o}.`,
                      });
                    }}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold ${
                      activeOverlay === o
                        ? "bg-teal-50 border border-teal-600 text-teal-700"
                        : "bg-white border border-slate-200 text-slate-600"
                    }`}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>
          </Card>

          {/* Vertical KPI Cards */}
          <div className="animate-fade-in-up flex-1" style={{ animationDelay: "0.05s" }}>
            <PopulationKpiGrid
              metrics={{
                activeDistricts: 742,
                totalCases: 24718,
                activeAlerts: 4,
                highRiskZones: 12
              }}
            />
          </div>
        </div>

        {/* ========================================================
            CENTER PILLAR (Col Span 6): Map & Intel
            ======================================================== */}
        <div className="lg:col-span-6 space-y-6 flex flex-col h-[calc(100vh-12rem)] overflow-y-auto custom-scrollbar px-1">
          {/* Map Panel */}
          <Card className="p-0 overflow-hidden shadow-sm flex flex-col min-h-[500px] border border-border bg-white dark:bg-slate-900 group relative">
             <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-teal-400 via-emerald-400 to-indigo-400 opacity-90" />
             <div className="p-4 border-b border-border flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
                <div className="flex items-center gap-2">
                   <SignalHigh className="h-5 w-5 text-teal-600" />
                   <div>
                     <h3 className="font-bold text-foreground tracking-tight text-sm">
                       Epidemiological Map
                     </h3>
                     <p className="text-[10px] text-muted-foreground mt-0.5">Real-time national surveillance radar</p>
                   </div>
                </div>
                <AWSBadge service="Amazon Kinesis" />
             </div>
             <div className="p-4 flex-1 flex flex-col relative h-[420px]">
                <IndiaMap
                  selectedState={selectedDistrict}
                  onStateSelect={(id) => {
                    const isDeselecting = id === selectedDistrict;
                    setSelectedDistrict(isDeselecting ? null : id);
                    if (!isDeselecting) {
                      toast({
                        title: "Region Selected",
                        description: `Fetching detailed telemetry for region ${id}.`,
                      });
                    }
                  }}
                  syndrome={selectedSyndrome}
                />
             </div>
          </Card>

          {/* Situation Report Generator */}
          <div className="flex-shrink-0 pb-4">
             <SituationReport
               syndrome={selectedSyndrome}
               timeRange={timeRange}
               selectedDistrict={selectedDistrict}
             />
          </div>
        </div>

        {/* ========================================================
            RIGHT PILLAR (Col Span 3): Anomalies & Forecast
            ======================================================== */}
        <div className="lg:col-span-3 space-y-6 flex flex-col h-[calc(100vh-12rem)] overflow-y-auto custom-scrollbar pl-1">
          {/* Active Anomalies Feed */}
          <Card className="flex flex-col overflow-hidden shadow-sm border border-border bg-white dark:bg-slate-900 relative">
             <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-red-400 to-amber-400 opacity-90" />
             <div className="p-4 border-b border-border flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
               <div className="flex items-center gap-2">
                 <AlertTriangle className="h-4 w-4 text-red-600" />
                 <h4 className="font-semibold text-foreground text-sm tracking-tight">
                   Active Anomalies
                 </h4>
               </div>
               <AWSBadge service="SageMaker" model="RCFM" />
             </div>

             <div className="p-4 space-y-4">
                {/* Critical Alert */}
                <div className="p-4 rounded-xl bg-red-50/80 border border-red-200/60 shadow-sm relative group overflow-hidden">
                  <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                     <AlertTriangle className="h-16 w-16 text-red-500" />
                  </div>
                  <div className="relative z-10 flex items-start gap-3">
                    <LivePulse active color="red" size="sm" className="mt-1 shrink-0" />
                    <div className="flex-1">
                      <p className="font-bold text-red-900 tracking-tight text-sm">
                        Nagpur, Maharashtra
                      </p>
                      <p className="text-[11px] font-medium text-red-700 mt-1 flex items-center gap-1 bg-red-100 w-fit px-2 py-0.5 rounded">
                        Influenza-Like Illness (ILI)
                      </p>
                      <div className="grid grid-cols-2 gap-3 mt-3 text-xs bg-white/60 p-2 rounded-lg border border-red-100">
                        <div>
                          <span className="text-red-900/60 block text-[9px] uppercase font-bold tracking-wider mb-0.5">Cases (7d)</span>
                          <span className="font-bold text-red-700 text-sm">
                            847 <span className="text-[10px] text-red-500 ml-0.5">(+340%)</span>
                          </span>
                        </div>
                        <div>
                          <span className="text-red-900/60 block text-[9px] uppercase font-bold tracking-wider mb-0.5">Population</span>
                          <span className="font-bold text-red-900 text-sm">~2.4M</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-3 px-1">
                        <div className="flex items-center gap-2">
                           <ConfidenceRing score={0.89} size="sm" />
                           <span className="text-[10px] font-semibold text-red-800/70">
                             RCFM Score
                           </span>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4 border-t border-red-200/50 pt-3">
                        <Button 
                          size="sm" 
                          onClick={() => {
                            toast({
                              title: "Investigation Initiated",
                              description: "Alert escalated to local Nodal Officer in Nagpur.",
                            });
                          }}
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white h-7 text-xs"
                        >
                          Investigate
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => {
                            toast({
                              title: "Report Generated",
                              description: "Situation Report for Nagpur pushed to central dashboard.",
                            });
                          }}
                          className="flex-1 border-red-200 text-red-700 hover:bg-red-100 h-7 text-xs bg-white/50"
                        >
                          Gen. SitRep
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Amber Alert */}
                <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/60 shadow-sm">
                  <div className="flex items-start gap-3">
                    <LivePulse active color="amber" size="sm" className="mt-1 shrink-0" />
                    <div className="flex-1">
                      <p className="font-bold text-amber-900 tracking-tight text-sm">Patna, Bihar</p>
                      <p className="text-[11px] font-medium text-amber-700 mt-1 flex items-center gap-1 bg-amber-100 w-fit px-2 py-0.5 rounded">
                        Acute Gastroenteritis
                      </p>
                      <div className="flex items-center gap-3 mt-3 text-xs">
                         <div className="bg-white/60 px-2.5 py-1.5 rounded-lg border border-amber-100 flex-1">
                            <span className="text-amber-900/60 block text-[9px] uppercase font-bold tracking-wider">Cases</span>
                            <span className="font-bold text-amber-700 text-sm">234 <span className="text-[10px] text-amber-500 ml-0.5">(+67%)</span></span>
                         </div>
                         <div className="flex items-center gap-2 flex-1 justify-end px-2">
                            <ConfidenceRing score={0.74} size="sm" />
                            <span className="text-[10px] font-semibold text-amber-800/70">
                              0.71
                            </span>
                         </div>
                      </div>
                    </div>
                  </div>
                </div>
             </div>
          </Card>

          {/* Forecast Box */}
          <Card className="flex flex-col shadow-sm border border-border bg-white dark:bg-slate-900">
             <div className="p-4 border-b border-border flex items-center justify-between">
               <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-indigo-600" />
                  <h4 className="font-semibold text-foreground text-sm tracking-tight">14-Day Forecast</h4>
               </div>
               <AWSBadge service="SageMaker" model="DeepAR+" />
             </div>
             <div className="p-4">
                <div className="h-32 bg-slate-50 rounded-lg flex items-center justify-center border border-dashed border-slate-200 mb-3 relative overflow-hidden">
                   {/* Dummy stylized chart shape */}
                   <svg className="absolute inset-0 h-full w-full opacity-50" preserveAspectRatio="none" viewBox="0 0 100 100">
                      <path d="M0,80 Q20,60 40,85 T80,40 T100,50 L100,100 L0,100 Z" fill="#e0e7ff" />
                      <polyline points="0,80 20,60 40,85 80,40 100,50" fill="none" stroke="#6366f1" strokeWidth="2" strokeDasharray="4 2" />
                      <polyline points="0,70 20,50 40,75 80,30 100,40" fill="none" stroke="#10b981" strokeWidth="2" />
                   </svg>
                   <p className="text-xs font-semibold text-indigo-800/80 z-10 bg-white/80 px-2 py-1 rounded backdrop-blur-sm shadow-sm ring-1 ring-slate-900/5">
                     Trajectory vs Intervention
                   </p>
                </div>
                <div className="flex items-center justify-center gap-4">
                  <button 
                    onClick={() => {
                      toast({
                        title: "Intervention Scenario Loaded",
                        description: "Forecast updated to show projected curve with selected interventions.",
                      });
                    }}
                    className="flex items-center gap-1.5 hover:bg-slate-100 p-1.5 rounded transition-colors"
                  >
                     <span className="h-2 w-2 rounded-full bg-emerald-500" />
                     <span className="text-[10px] font-bold text-slate-700 tracking-wide uppercase">With Action</span>
                  </button>
                  <button 
                    onClick={() => {
                      toast({
                        title: "Baseline Scenario Loaded",
                        description: "Forecast reverted to natural trajectory without intervention.",
                      });
                    }}
                    className="flex items-center gap-1.5 hover:bg-slate-100 p-1.5 rounded transition-colors"
                  >
                     <span className="h-2 w-2 rounded-full border border-indigo-500 bg-transparent" />
                     <span className="text-[10px] font-bold text-slate-500 tracking-wide uppercase">Baseline</span>
                  </button>
                </div>
             </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
