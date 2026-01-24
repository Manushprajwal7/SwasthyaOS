'use client';

import React from 'react';
import { AlertTriangle, Home, Ambulance, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface DecisionOutcomeProps {
  caseData: {
    symptoms: string[];
    vitals: {
      temperature: number;
      heartRate: number;
      bloodPressure: string;
      respiratoryRate: number;
    };
    location: string;
  };
  onReset: () => void;
}

export function DecisionOutcome({ caseData, onReset }: DecisionOutcomeProps) {
  // Determine decision based on vitals and symptoms
  const hasHighFever = caseData.vitals.temperature > 39;
  const hasHighHeartRate = caseData.vitals.heartRate > 110;
  const hasChestPain = caseData.symptoms.includes('Chest Pain');
  const hasBreathingDifficulty = caseData.symptoms.includes('Breathing Difficulty');
  const hasEmergencySigns =
    hasBreathingDifficulty || (hasChestPain && hasHighFever) || hasHighHeartRate;

  let decision: 'local' | 'phc' | 'emergency' = 'local';
  if (hasEmergencySigns) {
    decision = 'emergency';
  } else if (hasHighFever || caseData.symptoms.length > 4) {
    decision = 'phc';
  }

  const decisionConfig = {
    local: {
      icon: Home,
      title: 'Treat Locally',
      color: 'bg-success/10 border-success/20 border-l-4 border-l-success',
      bgColor: 'bg-success',
      description:
        'Patient can be managed at local PHC or ASHA center with supervision and follow-up.',
      actions: [
        'Start empirical treatment per local guidelines',
        'Monitor vitals every 4 hours',
        'Ensure patient hydration and rest',
        'Follow-up call in 24 hours',
      ],
    },
    phc: {
      icon: AlertTriangle,
      title: 'Refer to PHC',
      color: 'bg-warning/10 border-warning/20 border-l-4 border-l-warning',
      bgColor: 'bg-warning',
      description:
        'Patient requires evaluation and management at Primary Health Center. Arrange transport.',
      actions: [
        'Arrange immediate referral to nearest PHC',
        'Provide transport assistance',
        'Share this assessment with PHC doctor',
        'Ensure follow-up documentation',
      ],
    },
    emergency: {
      icon: Ambulance,
      title: 'Emergency Escalation',
      color: 'bg-error/10 border-error/20 border-l-4 border-l-error',
      bgColor: 'bg-error',
      description:
        'Patient requires immediate emergency care. Call 108 ambulance and inform receiving hospital.',
      actions: [
        '🚨 Call 108 Emergency Ambulance NOW',
        'Start basic life support if trained',
        'Keep patient calm and comfortable',
        'Send medical summary with patient to hospital',
        'Contact family and inform hospital',
      ],
    },
  };

  const config = decisionConfig[decision];
  const Icon = config.icon;

  return (
    <div className="space-y-6">
      {/* Main Decision Card */}
      <Card className={config.color}>
        <div className="p-6">
          <div className="flex items-start gap-4 mb-4">
            <Icon className={`h-8 w-8 flex-shrink-0 ${config.bgColor.replace('bg-', 'text-')}`} />
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-foreground">
                {config.title}
              </h2>
              <p className="text-foreground mt-2 leading-relaxed">
                {config.description}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 pt-6 border-t border-border/50">
            <p className="text-sm font-semibold text-foreground mb-3">
              RECOMMENDED ACTIONS:
            </p>
            <div className="space-y-2">
              {config.actions.map((action, i) => (
                <div key={i} className="flex gap-3">
                  <CheckCircle className="h-5 w-5 flex-shrink-0 text-foreground/40" />
                  <p className="text-sm text-foreground">{action}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Clinical Summary */}
      <Card className="p-6">
        <h3 className="font-semibold text-foreground mb-4">Clinical Summary</h3>
        <div className="space-y-4">
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-1">
              SYMPTOMS
            </p>
            <p className="text-sm text-foreground">
              {caseData.symptoms.join(', ')}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-1">
                TEMPERATURE
              </p>
              <p className="text-lg font-bold text-foreground">
                {caseData.vitals.temperature}°C
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-1">
                HEART RATE
              </p>
              <p className="text-lg font-bold text-foreground">
                {caseData.vitals.heartRate} bpm
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-1">
                BLOOD PRESSURE
              </p>
              <p className="text-lg font-bold text-foreground">
                {caseData.vitals.bloodPressure}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-1">
                RESPIRATORY RATE
              </p>
              <p className="text-lg font-bold text-foreground">
                {caseData.vitals.respiratoryRate}/min
              </p>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-1">
              FACILITY
            </p>
            <p className="text-sm text-foreground">{caseData.location}</p>
          </div>
        </div>
      </Card>

      {/* Important Notes */}
      <Card className="bg-primary/5 border-primary/20 p-4">
        <p className="text-xs text-primary font-semibold mb-1">
          ⚠ IMPORTANT
        </p>
        <p className="text-sm text-primary/90 leading-relaxed">
          This decision is assistive only. If patient condition worsens, escalate care immediately. Trust clinical judgment.
        </p>
      </Card>

      {/* Actions */}
      <div className="flex gap-3">
        <Button
          onClick={onReset}
          variant="outline"
          className="flex-1 bg-transparent"
        >
          Start New Assessment
        </Button>
        <Button className="flex-1">
          Save & Share Report
        </Button>
      </div>
    </div>
  );
}
