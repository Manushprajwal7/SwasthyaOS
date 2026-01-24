'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { SymptomIntake } from './symptom-intake';
import { VitalsInput } from './vitals-input';
import { DecisionOutcome } from './decision-outcome';
import { AIReasoningTrace } from './ai-reasoning-trace';

type DecisionStep = 'intake' | 'vitals' | 'outcome';

interface CaseData {
  symptoms: string[];
  vitals: {
    temperature: number;
    heartRate: number;
    bloodPressure: string;
    respiratoryRate: number;
  };
  location: string;
}

export function RuralDecisionSupportContent() {
  const [currentStep, setCurrentStep] = useState<DecisionStep>('intake');
  const [caseData, setCaseData] = useState<CaseData>({
    symptoms: [],
    vitals: {
      temperature: 0,
      heartRate: 0,
      bloodPressure: '',
      respiratoryRate: 0,
    },
    location: '',
  });

  const handleSymptomSubmit = (symptoms: string[], location: string) => {
    setCaseData({ ...caseData, symptoms, location });
    setCurrentStep('vitals');
  };

  const handleVitalsSubmit = (vitals: CaseData['vitals']) => {
    setCaseData({ ...caseData, vitals });
    setCurrentStep('outcome');
  };

  return (
    <div className="space-y-6 p-8">
      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground">
          AarogyaPath: Rural Decision Support
        </h1>
        <p className="mt-2 text-muted-foreground">
          Voice-first clinical guidance for frontline health workers
        </p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center justify-between">
        {(['intake', 'vitals', 'outcome'] as const).map((step, index) => (
          <div key={step} className="flex items-center">
            <div
              className={`h-10 w-10 rounded-full flex items-center justify-center font-semibold ${
                currentStep === step
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {index + 1}
            </div>
            {index < 2 && (
              <div
                className={`h-1 flex-1 mx-2 ${
                  ['intake', 'vitals', 'outcome'].indexOf(currentStep) > index
                    ? 'bg-primary'
                    : 'bg-muted'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left: Intake & Input */}
        <div className="lg:col-span-2 space-y-6">
          {currentStep === 'intake' && (
            <SymptomIntake onSubmit={handleSymptomSubmit} />
          )}

          {currentStep === 'vitals' && (
            <VitalsInput
              onSubmit={handleVitalsSubmit}
              onBack={() => setCurrentStep('intake')}
            />
          )}

          {currentStep === 'outcome' && (
            <DecisionOutcome
              caseData={caseData}
              onReset={() => {
                setCurrentStep('intake');
                setCaseData({
                  symptoms: [],
                  vitals: {
                    temperature: 0,
                    heartRate: 0,
                    bloodPressure: '',
                    respiratoryRate: 0,
                  },
                  location: '',
                });
              }}
            />
          )}
        </div>

        {/* Right: AI Reasoning Trace */}
        <div className="lg:col-span-1">
          <AIReasoningTrace
            symptoms={caseData.symptoms}
            vitals={caseData.vitals}
            currentStep={currentStep}
          />
        </div>
      </div>
    </div>
  );
}
