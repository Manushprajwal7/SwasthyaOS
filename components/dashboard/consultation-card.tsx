'use client';

import React from 'react';
import { Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface ConsultationCardProps {
  patientId: string;
  patientName: string;
  age: number;
  reason: string;
  status: 'completed' | 'in-progress' | 'pending';
  time: string;
  confidence: number;
}

export function ConsultationCard({
  patientId,
  patientName,
  age,
  reason,
  status,
  time,
  confidence,
}: ConsultationCardProps) {
  const statusConfig = {
    completed: {
      icon: CheckCircle,
      label: 'Completed',
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
    'in-progress': {
      icon: Clock,
      label: 'In Progress',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
    pending: {
      icon: AlertCircle,
      label: 'Pending',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
    },
  };

  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-baseline gap-2">
            <h4 className="font-semibold text-foreground">{patientName}</h4>
            <span className="text-xs text-muted-foreground">{age}y</span>
            <span className="text-xs font-mono text-muted-foreground">
              {patientId}
            </span>
          </div>
          <p className="mt-1 text-sm text-foreground">{reason}</p>
          <p className="mt-2 text-xs text-muted-foreground">{time}</p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className={`flex items-center gap-1 rounded-full px-2 py-1 ${config.bgColor}`}>
            <StatusIcon className={`h-3 w-3 ${config.color}`} />
            <span className={`text-xs font-medium ${config.color}`}>
              {config.label}
            </span>
          </div>

          {confidence > 0 && (
            <div className="text-right">
              <div className="text-xs font-semibold text-foreground">
                {confidence}% Conf.
              </div>
              <div className="mt-0.5 h-1 w-12 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-primary"
                  style={{ width: `${confidence}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
