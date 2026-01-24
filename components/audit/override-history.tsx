'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

interface Override {
  id: string;
  timestamp: string;
  clinician: string;
  aiRecommendation: string;
  clinicianDecision: string;
  reason: string;
  patientOutcome: string;
  confidence: number;
}

export function OverrideHistory() {
  const overrides: Override[] = [
    {
      id: 'O-2401',
      timestamp: '2024-01-24 13:40',
      clinician: 'Dr. Rajesh Kumar',
      aiRecommendation: 'Discharge patient after 24h',
      clinicianDecision: 'Extended observation for 48h',
      reason: 'Patient showing persistent low-grade fever; concerned about relapse',
      patientOutcome: 'Positive - Fever resolved by 48h. Discharge successful.',
      confidence: 78,
    },
    {
      id: 'O-2402',
      timestamp: '2024-01-23 19:20',
      clinician: 'ASHA Priya',
      aiRecommendation: 'Treat locally at PHC',
      clinicianDecision: 'Referred to hospital',
      reason: 'Patient socially isolated; lacks support at home for self-care',
      patientOutcome: 'Positive - Hospital stay prevented complications.',
      confidence: 82,
    },
    {
      id: 'O-2403',
      timestamp: '2024-01-23 16:50',
      clinician: 'Dr. Priya Sharma',
      aiRecommendation: 'Broad-spectrum antibiotics',
      clinicianDecision: 'Targeted antibiotic per culture',
      reason: 'Awaiting culture results; not giving empirical therapy',
      patientOutcome: 'Neutral - Standard care approach; culture confirmed viability.',
      confidence: 85,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Summary */}
      <Card className="p-6 bg-warning/5 border-warning/20">
        <div className="flex gap-3">
          <AlertCircle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-warning mb-1">
              Clinical Override Analysis
            </p>
            <p className="text-xs text-warning/90 leading-relaxed">
              {overrides.length} clinician overrides documented this month. Rate: 12.4%. All overrides resulted in positive or neutral patient outcomes, validating clinical expertise.
            </p>
          </div>
        </div>
      </Card>

      {/* Override Records */}
      <div className="space-y-4">
        {overrides.map((override) => (
          <Card key={override.id} className="p-6 border-l-4 border-l-warning">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-mono text-muted-foreground">
                    {override.id}
                  </p>
                  <p className="text-sm font-semibold text-foreground mt-1">
                    {override.clinician}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {override.timestamp}
                  </p>
                </div>
                <div className="flex items-center gap-2 bg-warning/10 px-3 py-1 rounded-full">
                  <div className="h-2 w-2 rounded-full bg-warning" />
                  <span className="text-xs font-bold text-warning">OVERRIDE</span>
                </div>
              </div>

              {/* Comparison Grid */}
              <div className="grid gap-4 md:grid-cols-2 py-4 border-t border-border border-b">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-2">
                    AI RECOMMENDATION
                  </p>
                  <p className="text-sm text-foreground">
                    {override.aiRecommendation}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="h-1.5 w-16 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full bg-secondary"
                        style={{ width: `${override.confidence}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold text-foreground">
                      {override.confidence}%
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-2">
                    CLINICIAN DECISION
                  </p>
                  <p className="text-sm text-foreground font-medium">
                    {override.clinicianDecision}
                  </p>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-1">
                    REASON FOR OVERRIDE
                  </p>
                  <p className="text-sm text-foreground">{override.reason}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-1">
                    PATIENT OUTCOME
                  </p>
                  <p className="text-sm text-foreground">
                    {override.patientOutcome}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Learning Summary */}
      <Card className="bg-primary/5 border-primary/20 p-6">
        <h3 className="font-semibold text-foreground mb-3">
          System Learning from Overrides
        </h3>
        <div className="space-y-2 text-sm text-foreground leading-relaxed">
          <p>
            Clinical overrides provide valuable feedback for model improvement. All override cases are logged and analyzed to:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Identify patterns of AI recommendation limitations</li>
            <li>Incorporate domain expertise back into training data</li>
            <li>Refine confidence bands for future recommendations</li>
            <li>Ensure human-in-the-loop quality assurance</li>
          </ul>
          <p className="mt-3">
            <strong>Impact:</strong> 89% of clinical overrides have resulted in
            positive patient outcomes, validating expert judgment.
          </p>
        </div>
      </Card>
    </div>
  );
}
