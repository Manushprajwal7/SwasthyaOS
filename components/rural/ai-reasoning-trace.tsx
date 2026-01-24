'use client';

import React from 'react';
import { Brain, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface AIReasoningTraceProps {
  symptoms: string[];
  vitals: {
    temperature: number;
    heartRate: number;
    bloodPressure: string;
    respiratoryRate: number;
  };
  currentStep: 'intake' | 'vitals' | 'outcome';
}

export function AIReasoningTrace({
  symptoms,
  vitals,
  currentStep,
}: AIReasoningTraceProps) {
  const reasoningSteps = [
    {
      step: 1,
      title: 'Symptom Analysis',
      active: currentStep !== 'intake',
      content: symptoms.length > 0 
        ? `Identified ${symptoms.length} symptom(s): ${symptoms.slice(0, 2).join(', ')}${symptoms.length > 2 ? '...' : ''}`
        : 'Waiting for symptom input',
    },
    {
      step: 2,
      title: 'Vital Sign Check',
      active: currentStep === 'outcome',
      content: vitals.temperature > 0
        ? `Temp: ${vitals.temperature}°C | HR: ${vitals.heartRate} bpm`
        : 'Waiting for vital signs',
    },
    {
      step: 3,
      title: 'Decision Logic',
      active: currentStep === 'outcome',
      content:
        currentStep === 'outcome'
          ? 'Applying WHO/National guidelines...'
          : 'Awaiting vital signs input',
    },
  ];

  return (
    <div className="space-y-4">
      <Card className="p-6">
        <h4 className="font-semibold text-foreground flex items-center gap-2 mb-4">
          <Brain className="h-5 w-5 text-secondary" />
          AI Reasoning Trace
        </h4>

        <div className="space-y-4">
          {reasoningSteps.map((step) => (
            <div key={step.step} className="relative">
              {/* Step Indicator */}
              <div className="flex items-start gap-3">
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                    step.active
                      ? 'bg-secondary text-secondary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {step.step}
                </div>

                <div className="flex-1 mt-0.5">
                  <p
                    className={`text-sm font-semibold ${
                      step.active ? 'text-foreground' : 'text-muted-foreground'
                    }`}
                  >
                    {step.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {step.content}
                  </p>
                </div>

                {step.active && currentStep === 'outcome' && (
                  <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                )}
              </div>

              {/* Connector Line */}
              {step.step < 3 && (
                <div className="ml-3.5 h-4 w-0.5 bg-muted my-2" />
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Model Confidence */}
      {currentStep === 'outcome' && (
        <Card className="p-4 bg-secondary/5 border-secondary/20">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-secondary">
              MODEL CONFIDENCE
            </p>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Decision Confidence</span>
                <span className="font-bold text-foreground">87%</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-secondary w-87%" style={{ width: '87%' }} />
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Data Quality */}
      <Card className="p-4">
        <p className="text-xs font-semibold text-muted-foreground mb-2">
          DATA QUALITY
        </p>
        <div className="space-y-1 text-xs">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Input Complete</span>
            <span
              className={`font-semibold ${
                currentStep === 'outcome'
                  ? 'text-success'
                  : 'text-muted-foreground'
              }`}
            >
              {currentStep === 'outcome' ? '✓ Yes' : 'Incomplete'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Vital Signs</span>
            <span
              className={`font-semibold ${
                vitals.temperature > 0
                  ? 'text-success'
                  : 'text-muted-foreground'
              }`}
            >
              {vitals.temperature > 0 ? '✓ Recorded' : 'Pending'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Symptoms Reported</span>
            <span
              className={`font-semibold ${
                symptoms.length > 0
                  ? 'text-success'
                  : 'text-muted-foreground'
              }`}
            >
              {symptoms.length > 0 ? `✓ ${symptoms.length}` : 'None'}
            </span>
          </div>
        </div>
      </Card>

      {/* Info Box */}
      <Card className="bg-primary/5 p-3 border-primary/20">
        <p className="text-xs text-primary font-medium leading-relaxed">
          <strong>Voice-First Design:</strong> This assistant accepts voice input at every step. Speak clearly for best results.
        </p>
      </Card>
    </div>
  );
}
