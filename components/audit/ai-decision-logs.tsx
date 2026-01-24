'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { CheckCircle, X, Clock } from 'lucide-react';

interface DecisionLog {
  id: string;
  timestamp: string;
  clinician: string;
  recommendation: string;
  confidence: number;
  decision: 'accepted' | 'rejected' | 'modified';
  patientId: string;
}

export function AIDecisionLogs() {
  const logs: DecisionLog[] = [
    {
      id: 'D-2401',
      timestamp: '2024-01-24 14:23',
      clinician: 'Dr. Rajesh Kumar',
      recommendation: 'Azithromycin for acute respiratory infection',
      confidence: 92,
      decision: 'accepted',
      patientId: 'P-2402',
    },
    {
      id: 'D-2402',
      timestamp: '2024-01-24 12:45',
      clinician: 'ASHA Priya',
      recommendation: 'Refer to PHC for elevated fever',
      confidence: 88,
      decision: 'accepted',
      patientId: 'P-2405',
    },
    {
      id: 'D-2403',
      timestamp: '2024-01-24 11:12',
      clinician: 'Dr. Priya Sharma',
      recommendation: 'CT scan for suspected pneumonia',
      confidence: 75,
      decision: 'modified',
      patientId: 'P-2403',
    },
    {
      id: 'D-2404',
      timestamp: '2024-01-24 09:30',
      clinician: 'Dr. Ajit Singh',
      recommendation: 'Paracetamol for fever management',
      confidence: 85,
      decision: 'accepted',
      patientId: 'P-2401',
    },
    {
      id: 'D-2405',
      timestamp: '2024-01-24 08:15',
      clinician: 'ANM Rajini',
      recommendation: 'Emergency ambulance dispatch',
      confidence: 95,
      decision: 'rejected',
      patientId: 'P-2404',
    },
  ];

  const decisionConfig = {
    accepted: {
      icon: CheckCircle,
      color: 'text-success',
      bgColor: 'bg-success/10',
      label: 'Accepted',
    },
    rejected: {
      icon: X,
      color: 'text-error',
      bgColor: 'bg-error/10',
      label: 'Rejected',
    },
    modified: {
      icon: Clock,
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      label: 'Modified',
    },
  };

  return (
    <Card className="p-6">
      <h3 className="font-semibold text-foreground mb-4">AI Recommendation History</h3>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left font-semibold text-muted-foreground p-3">
                Timestamp
              </th>
              <th className="text-left font-semibold text-muted-foreground p-3">
                Clinician
              </th>
              <th className="text-left font-semibold text-muted-foreground p-3">
                Recommendation
              </th>
              <th className="text-left font-semibold text-muted-foreground p-3">
                Confidence
              </th>
              <th className="text-left font-semibold text-muted-foreground p-3">
                Decision
              </th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => {
              const config = decisionConfig[log.decision];
              const Icon = config.icon;

              return (
                <tr key={log.id} className="border-b border-border hover:bg-muted/50">
                  <td className="p-3 text-xs text-muted-foreground">
                    {log.timestamp}
                  </td>
                  <td className="p-3">
                    <div>
                      <p className="font-medium text-foreground">{log.clinician}</p>
                      <p className="text-xs text-muted-foreground">{log.patientId}</p>
                    </div>
                  </td>
                  <td className="p-3 text-foreground max-w-xs">
                    {log.recommendation}
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-12 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${log.confidence}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-foreground">
                        {log.confidence}%
                      </span>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className={`flex items-center gap-1 ${config.color}`}>
                      <Icon className="h-4 w-4" />
                      <span className="font-semibold text-xs">
                        {config.label}
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="mt-6 pt-6 border-t border-border grid grid-cols-3 gap-4">
        <div>
          <p className="text-xs font-semibold text-muted-foreground">
            TOTAL DECISIONS
          </p>
          <p className="text-2xl font-bold text-foreground mt-1">{logs.length}</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-muted-foreground">
            ACCEPTANCE RATE
          </p>
          <p className="text-2xl font-bold text-success mt-1">
            {Math.round((logs.filter((l) => l.decision === 'accepted').length / logs.length) * 100)}%
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold text-muted-foreground">
            AVG CONFIDENCE
          </p>
          <p className="text-2xl font-bold text-primary mt-1">
            {Math.round(logs.reduce((sum, l) => sum + l.confidence, 0) / logs.length)}%
          </p>
        </div>
      </div>
    </Card>
  );
}
