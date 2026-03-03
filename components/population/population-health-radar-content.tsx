"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IndiaMap } from "./india-map";
import { SyndromeFilter } from "./syndrome-filter";
import { TimeSlider } from "./time-slider";
import { AlertsPanel } from "./alerts-panel";
import { SituationReport } from "./situation-report";
import { AWSBadge } from "@/components/ui/aws-badge";
import { LivePulse } from "@/components/ui/live-pulse";
import { ConfidenceRing } from "@/components/ui/confidence-ring";
import { useLanguage } from "@/contexts/language-context";
import { TrendingUp, AlertTriangle } from "lucide-react";

export function PopulationHealthRadarContent() {
  const { t } = useLanguage();
  const [selectedSyndrome, setSelectedSyndrome] = useState("all");
  const [timeRange, setTimeRange] = useState(24);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

  return (
    <div className="space-y-6 p-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-heading">
            {t("population.title")} (JanSwasthyaWatch)
          </h1>
          <p className="mt-2 text-muted-foreground">
            {t("population.subtitle")}
          </p>
        </div>
        <AWSBadge service="Amazon Kinesis" model="SageMaker" />
      </div>

      {/* Controls Bar */}
      <div className="grid gap-4 md:grid-cols-4">
        {/* Syndrome Filter */}
        <Card className="p-4">
          <p className="text-xs font-semibold text-muted-foreground mb-2">
            SYNDROME LAYER
          </p>
          <div className="flex flex-wrap gap-2">
            {["all", "fever", "respiratory", "gi", "vector"].map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSyndrome(s)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  selectedSyndrome === s
                    ? "bg-teal-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {s === "all" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </Card>

        {/* Time Range */}
        <Card className="p-4">
          <p className="text-xs font-semibold text-muted-foreground mb-2">
            TIME RANGE
          </p>
          <div className="flex gap-2">
            {[
              { label: "7D", value: 168 },
              { label: "30D", value: 720 },
              { label: "90D", value: 2160 },
            ].map((t) => (
              <button
                key={t.value}
                onClick={() => setTimeRange(t.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                  timeRange === t.value
                    ? "bg-teal-600 text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </Card>

        {/* Data Overlay */}
        <Card className="p-4">
          <p className="text-xs font-semibold text-muted-foreground mb-2">
            DATA OVERLAY
          </p>
          <div className="flex gap-2">
            {["Cases", "Rate", "Change %"].map((o) => (
              <button
                key={o}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 text-slate-600"
              >
                {o}
              </button>
            ))}
          </div>
        </Card>

        {/* Summary Stats */}
        <Card className="p-4">
          <p className="text-xs font-semibold text-muted-foreground mb-2">
            SURVEILLANCE SUMMARY
          </p>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-lg font-bold text-foreground">742</p>
              <p className="text-xs text-muted-foreground">Districts</p>
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">1,247</p>
              <p className="text-xs text-muted-foreground">Cases</p>
            </div>
            <div>
              <p className="text-lg font-bold text-red-600">4</p>
              <p className="text-xs text-muted-foreground">Alerts</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content: 65% Map / 35% Intelligence */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Map Panel (65%) */}
        <div className="lg:col-span-8">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">
                District Health Map
              </h3>
              <AWSBadge service="Amazon Kinesis" />
            </div>
            <IndiaMap
              selectedState={selectedDistrict}
              onStateSelect={(id) =>
                setSelectedDistrict(id === selectedDistrict ? null : id)
              }
              syndrome={selectedSyndrome}
            />
            <p className="text-xs text-muted-foreground mt-4 text-center">
              Click on a state to view detailed district-level data
            </p>
          </Card>
        </div>

        {/* Intelligence Panel (35%) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Active Anomalies */}
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-foreground">
                Active Anomalies
              </h4>
              <AWSBadge service="SageMaker" model="RCFM" />
            </div>

            {/* Critical Alert */}
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 mb-3">
              <div className="flex items-start gap-2">
                <LivePulse active color="red" size="sm" />
                <div className="flex-1">
                  <p className="font-semibold text-red-800">
                    Nagpur, Maharashtra
                  </p>
                  <p className="text-xs text-red-700 mt-1">
                    Syndrome: Influenza-Like Illness (ILI)
                  </p>
                  <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                    <div>
                      <span className="text-muted-foreground">Cases (7d):</span>
                      <span className="font-bold text-red-700 ml-1">
                        847 (+340%)
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Population:</span>
                      <span className="font-bold ml-1">~2.4M</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <ConfidenceRing score={0.89} size="sm" />
                    <span className="text-xs text-muted-foreground">
                      RCFM Score: 0.94
                    </span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline" className="text-xs">
                      Investigate
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs">
                      Generate SitRep
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Amber Alert */}
            <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
              <div className="flex items-start gap-2">
                <LivePulse active color="amber" size="sm" />
                <div className="flex-1">
                  <p className="font-semibold text-amber-800">Patna, Bihar</p>
                  <p className="text-xs text-amber-700 mt-1">
                    Syndrome: Acute Gastroenteritis
                  </p>
                  <div className="text-xs mt-2">
                    <span className="text-muted-foreground">Cases (7d):</span>
                    <span className="font-bold text-amber-700 ml-1">
                      234 (+67%)
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <ConfidenceRing score={0.74} size="sm" />
                    <span className="text-xs text-muted-foreground">
                      RCFM Score: 0.71
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Syndrome Trends */}
          <Card className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-foreground">
                Syndrome Trends (30d)
              </h4>
              <AWSBadge service="Kinesis" />
            </div>
            <div className="h-32 bg-slate-50 rounded-lg flex items-center justify-center border border-dashed border-slate-200">
              <div className="text-center">
                <TrendingUp className="h-6 w-6 text-slate-400 mx-auto mb-1" />
                <p className="text-xs text-muted-foreground">Trend Chart</p>
              </div>
            </div>
          </Card>

          {/* 14-Day Forecast */}
          <Card className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-foreground">14-Day Forecast</h4>
              <AWSBadge service="SageMaker" model="DeepAR+" />
            </div>
            <div className="h-24 bg-slate-50 rounded-lg flex items-center justify-center border border-dashed border-slate-200">
              <p className="text-xs text-muted-foreground">
                Forecast with CI band
              </p>
            </div>
            <div className="flex gap-2 mt-3">
              <button className="text-xs text-teal-600 font-medium">
                With intervention
              </button>
              <button className="text-xs text-muted-foreground">Without</button>
            </div>
          </Card>
        </div>
      </div>

      {/* Situation Report Generator */}
      <SituationReport
        syndrome={selectedSyndrome}
        timeRange={timeRange}
        selectedDistrict={selectedDistrict}
      />
    </div>
  );
}
