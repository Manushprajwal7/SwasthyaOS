'use client';

import React, { useState } from 'react';
import { Check, Plus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface SymptomIntakeProps {
  onSubmit: (symptoms: string[], location: string) => void;
}

const commonSymptoms = [
  'Fever',
  'Cough',
  'Breathing Difficulty',
  'Chest Pain',
  'Headache',
  'Body Ache',
  'Nausea',
  'Diarrhea',
  'Vomiting',
  'Fatigue',
  'Sore Throat',
  'Rash',
];

export function SymptomIntake({ onSubmit }: SymptomIntakeProps) {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [location, setLocation] = useState('');
  const [customSymptom, setCustomSymptom] = useState('');

  const handleSymptomToggle = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleAddCustom = () => {
    if (customSymptom.trim()) {
      setSelectedSymptoms([...selectedSymptoms, customSymptom.trim()]);
      setCustomSymptom('');
    }
  };

  const handleSubmit = () => {
    if (selectedSymptoms.length > 0 && location.trim()) {
      onSubmit(selectedSymptoms, location);
    }
  };

  return (
    <div className="space-y-6">
      {/* Symptom Selection */}
      <Card className="p-6">
        <h3 className="font-semibold text-foreground mb-4">
          Step 1: Select Patient Symptoms
        </h3>
        <p className="text-sm text-muted-foreground mb-6">
          Tap or voice-select symptoms. Can pick multiple.
        </p>

        {/* Quick Select Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {commonSymptoms.map((symptom) => (
            <button
              key={symptom}
              onClick={() => handleSymptomToggle(symptom)}
              className={`rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                selectedSymptoms.includes(symptom)
                  ? 'bg-primary text-primary-foreground ring-2 ring-primary/50'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{symptom}</span>
                {selectedSymptoms.includes(symptom) && (
                  <Check className="h-4 w-4 ml-1" />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Custom Symptom */}
        <div className="space-y-3 pt-6 border-t border-border">
          <label>
            <p className="text-sm font-medium text-foreground mb-2">
              Other symptoms?
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={customSymptom}
                onChange={(e) => setCustomSymptom(e.target.value)}
                placeholder="Type or speak..."
                className="flex-1 rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') handleAddCustom();
                }}
              />
              <Button onClick={handleAddCustom} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </label>
        </div>

        {/* Selected Symptoms Display */}
        {selectedSymptoms.length > 0 && (
          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-sm font-medium text-foreground mb-3">
              Selected Symptoms ({selectedSymptoms.length})
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedSymptoms.map((symptom) => (
                <div
                  key={symptom}
                  className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1"
                >
                  <span className="text-sm text-primary font-medium">{symptom}</span>
                  <button
                    onClick={() => handleSymptomToggle(symptom)}
                    className="text-primary/60 hover:text-primary"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* Location Input */}
      <Card className="p-6">
        <h3 className="font-semibold text-foreground mb-4">
          Step 1b: Location Information
        </h3>
        <label>
          <p className="text-sm font-medium text-foreground mb-2">
            Health Facility / Village
          </p>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., PHC Sehore or Village Gram Panchayat"
            className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </label>
      </Card>

      {/* Submit Button */}
      <Button
        onClick={handleSubmit}
        disabled={selectedSymptoms.length === 0 || !location.trim()}
        className="w-full py-6 text-base font-semibold"
      >
        Continue to Vitals →
      </Button>

      {/* Voice Hint */}
      <Card className="bg-secondary/5 border-secondary/20 p-4">
        <p className="text-sm text-secondary font-medium">
          💬 Voice Feature: This tool is designed for voice input. Speak symptom names clearly.
        </p>
      </Card>
    </div>
  );
}
