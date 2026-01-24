'use client';

import React, { useState } from 'react';
import { Thermometer, Heart, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface VitalsInputProps {
  onSubmit: (vitals: {
    temperature: number;
    heartRate: number;
    bloodPressure: string;
    respiratoryRate: number;
  }) => void;
  onBack: () => void;
}

export function VitalsInput({ onSubmit, onBack }: VitalsInputProps) {
  const [vitals, setVitals] = useState({
    temperature: 0,
    heartRate: 0,
    bloodPressure: '',
    respiratoryRate: 0,
  });

  const handleVitalChange = (key: string, value: string | number) => {
    setVitals((prev) => ({ ...prev, [key]: value }));
  };

  const isAbnormal = {
    temperature: vitals.temperature > 38.5 || vitals.temperature < 35,
    heartRate: vitals.heartRate > 100 || vitals.heartRate < 60,
    respiratoryRate: vitals.respiratoryRate > 20 || vitals.respiratoryRate < 12,
  };

  const handleSubmit = () => {
    if (
      vitals.temperature > 0 &&
      vitals.heartRate > 0 &&
      vitals.bloodPressure &&
      vitals.respiratoryRate > 0
    ) {
      onSubmit(vitals);
    }
  };

  return (
    <div className="space-y-6">
      {/* Vital Signs Input */}
      <Card className="p-6">
        <h3 className="font-semibold text-foreground mb-2">
          Step 2: Record Patient Vitals
        </h3>
        <p className="text-sm text-muted-foreground mb-6">
          Use digital thermometer, pulse oximeter, and blood pressure monitor. Enter measurements.
        </p>

        {/* Temperature */}
        <div className="mb-6 p-4 rounded-lg bg-muted/50">
          <label className="block">
            <div className="flex items-center gap-2 mb-2">
              <Thermometer className="h-5 w-5 text-accent" />
              <span className="text-sm font-semibold text-foreground">
                Temperature (°C)
              </span>
              {isAbnormal.temperature && vitals.temperature > 0 && (
                <span className="text-xs font-bold text-error ml-auto">
                  ⚠ ABNORMAL
                </span>
              )}
            </div>
            <input
              type="number"
              step="0.1"
              value={vitals.temperature || ''}
              onChange={(e) => handleVitalChange('temperature', parseFloat(e.target.value))}
              placeholder="e.g., 38.5"
              className="w-full rounded-lg border border-border bg-card px-4 py-3 text-lg font-semibold text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <p className="text-xs text-muted-foreground mt-2">Normal: 36.5 - 37.5°C</p>
          </label>
        </div>

        {/* Heart Rate */}
        <div className="mb-6 p-4 rounded-lg bg-muted/50">
          <label className="block">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="h-5 w-5 text-error" />
              <span className="text-sm font-semibold text-foreground">
                Heart Rate (bpm)
              </span>
              {isAbnormal.heartRate && vitals.heartRate > 0 && (
                <span className="text-xs font-bold text-error ml-auto">
                  ⚠ ABNORMAL
                </span>
              )}
            </div>
            <input
              type="number"
              value={vitals.heartRate || ''}
              onChange={(e) => handleVitalChange('heartRate', parseInt(e.target.value))}
              placeholder="e.g., 88"
              className="w-full rounded-lg border border-border bg-card px-4 py-3 text-lg font-semibold text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-error"
            />
            <p className="text-xs text-muted-foreground mt-2">Normal: 60 - 100 bpm</p>
          </label>
        </div>

        {/* Blood Pressure */}
        <div className="mb-6 p-4 rounded-lg bg-muted/50">
          <label className="block">
            <span className="text-sm font-semibold text-foreground block mb-2">
              Blood Pressure (mmHg)
            </span>
            <input
              type="text"
              value={vitals.bloodPressure}
              onChange={(e) => handleVitalChange('bloodPressure', e.target.value)}
              placeholder="e.g., 120/80"
              className="w-full rounded-lg border border-border bg-card px-4 py-3 text-lg font-semibold text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <p className="text-xs text-muted-foreground mt-2">Format: Systolic/Diastolic</p>
          </label>
        </div>

        {/* Respiratory Rate */}
        <div className="p-4 rounded-lg bg-muted/50">
          <label className="block">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-semibold text-foreground">
                Respiratory Rate (breaths/min)
              </span>
              {isAbnormal.respiratoryRate && vitals.respiratoryRate > 0 && (
                <span className="text-xs font-bold text-error ml-auto">
                  ⚠ ABNORMAL
                </span>
              )}
            </div>
            <input
              type="number"
              value={vitals.respiratoryRate || ''}
              onChange={(e) => handleVitalChange('respiratoryRate', parseInt(e.target.value))}
              placeholder="e.g., 18"
              className="w-full rounded-lg border border-border bg-card px-4 py-3 text-lg font-semibold text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <p className="text-xs text-muted-foreground mt-2">Normal: 12 - 20 breaths/min</p>
          </label>
        </div>
      </Card>

      {/* Alert if abnormal */}
      {Object.values(isAbnormal).some(Boolean) && (
        <Card className="bg-error/10 border-error/20 border-l-4 border-l-error p-4">
          <div className="flex gap-2">
            <AlertCircle className="h-5 w-5 text-error flex-shrink-0" />
            <div>
              <p className="font-semibold text-error text-sm">
                Abnormal Readings Detected
              </p>
              <p className="text-xs text-error/80 mt-1">
                These vitals suggest need for urgent evaluation or referral.
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button onClick={onBack} variant="outline" className="flex-1 bg-transparent">
          ← Back
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={
            vitals.temperature === 0 ||
            vitals.heartRate === 0 ||
            !vitals.bloodPressure ||
            vitals.respiratoryRate === 0
          }
          className="flex-1"
        >
          View Decision →
        </Button>
      </div>
    </div>
  );
}
