"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { DistrictMap } from "./district-map";
import { SyndromeFilter } from "./syndrome-filter";
import { TimeSlider } from "./time-slider";
import { AlertsPanel } from "./alerts-panel";
import { SituationReport } from "./situation-report";
import { useLanguage } from "@/contexts/language-context";

export function PopulationHealthRadarContent() {
  const { t } = useLanguage();
  const [selectedSyndrome, setSelectedSyndrome] = useState("all");
  const [timeRange, setTimeRange] = useState(24); // hours
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

  return (
    <div className="space-y-6 p-8">
      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground">
          {t("population.title")}
        </h1>
        <p className="mt-2 text-muted-foreground">{t("population.subtitle")}</p>
      </div>

      {/* Controls Bar */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Syndrome Filter */}
        <Card className="p-6">
          <SyndromeFilter
            selected={selectedSyndrome}
            onSelect={setSelectedSyndrome}
          />
        </Card>

        {/* Time Range */}
        <Card className="p-6">
          <TimeSlider value={timeRange} onChange={setTimeRange} />
        </Card>

        {/* Summary Stats */}
        <Card className="p-6">
          <div className="space-y-3">
            <div className="text-xs font-semibold text-muted-foreground">
              {t("population.surveillance.summary")}
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  {t("population.districts.active")}
                </span>
                <span className="font-bold text-foreground">6/6</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  {t("population.total.cases")}
                </span>
                <span className="font-bold text-foreground">156</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  {t("population.alerts")}
                </span>
                <span className="font-bold text-error">4</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* District Map */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h3 className="font-semibold text-foreground mb-4">
              {t("population.district.map")}
            </h3>
            <DistrictMap
              selectedSyndrome={selectedSyndrome}
              timeRange={timeRange}
              onSelectDistrict={setSelectedDistrict}
              selectedDistrict={selectedDistrict}
            />
          </Card>
        </div>

        {/* Alerts Panel */}
        <div>
          <AlertsPanel syndrome={selectedSyndrome} timeRange={timeRange} />
        </div>
      </div>

      {/* Situation Report */}
      <SituationReport
        syndrome={selectedSyndrome}
        timeRange={timeRange}
        selectedDistrict={selectedDistrict}
      />
    </div>
  );
}
