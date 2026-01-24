'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { DistrictMap } from './district-map';
import { SyndromeFilter } from './syndrome-filter';
import { TimeSlider } from './time-slider';
import { AlertsPanel } from './alerts-panel';
import { SituationReport } from './situation-report';

export function PopulationHealthRadarContent() {
  const [selectedSyndrome, setSelectedSyndrome] = useState('all');
  const [timeRange, setTimeRange] = useState(24); // hours
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

  return (
    <div className="space-y-6 p-8">
      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground">
          JanSwasthyaWatch: Population Health Radar
        </h1>
        <p className="mt-2 text-muted-foreground">
          Real-time epidemiological surveillance & AI-detected anomaly detection across districts
        </p>
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
              SURVEILLANCE SUMMARY
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Districts Active</span>
                <span className="font-bold text-foreground">6/6</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total Cases</span>
                <span className="font-bold text-foreground">156</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Alerts</span>
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
              District-Level Heat Map
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
          <AlertsPanel
            syndrome={selectedSyndrome}
            timeRange={timeRange}
          />
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
