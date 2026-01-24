'use client';

import React from 'react';
import {
  FileText,
  Pill,
  Heart,
  Ambulance,
  CheckCircle,
  AlertCircle,
  Calendar,
} from 'lucide-react';
import { Card } from '@/components/ui/card';

interface TimelineEvent {
  id: string;
  date: string;
  type: 'note' | 'medication' | 'vitals' | 'referral' | 'outcome';
  title: string;
  description: string;
  icon: React.ReactNode;
  confidence?: number;
}

interface PatientTimelineProps {
  patientId: string;
}

export function PatientTimeline({ patientId }: PatientTimelineProps) {
  // Mock timeline data
  const events: TimelineEvent[] = [
    {
      id: '1',
      date: '2024-01-24 14:30',
      type: 'note',
      title: 'Discharge Summary',
      description:
        'Patient discharged after 24hr observation. Pneumonia resolved. Follow-up in 1 week.',
      icon: <FileText className="h-5 w-5" />,
      confidence: 95,
    },
    {
      id: '2',
      date: '2024-01-24 10:15',
      type: 'vitals',
      title: 'Vital Signs Update',
      description: 'Temp: 37.2°C | HR: 82 | BP: 118/76 | RR: 16',
      icon: <Heart className="h-5 w-5" />,
    },
    {
      id: '3',
      date: '2024-01-24 08:00',
      type: 'medication',
      title: 'Medication Dispensed',
      description: 'Azithromycin 500mg | Paracetamol 500mg | Cough syrup',
      icon: <Pill className="h-5 w-5" />,
    },
    {
      id: '4',
      date: '2024-01-23 18:45',
      type: 'note',
      title: 'Clinical Assessment',
      description:
        'Patient presents with fever, cough, bilateral lung crackles. Chest X-ray shows mild consolidation. Diagnosed: Acute Respiratory Infection.',
      icon: <FileText className="h-5 w-5" />,
      confidence: 88,
    },
    {
      id: '5',
      date: '2024-01-23 16:30',
      type: 'referral',
      title: 'Admitted to Hospital',
      description: 'Referred from PHC Jamkhandi for higher-level care',
      icon: <Ambulance className="h-5 w-5" />,
    },
    {
      id: '6',
      date: '2024-01-23 14:00',
      type: 'note',
      title: 'Initial Consultation',
      description: 'Patient first seen at PHC with symptoms of fever and cough',
      icon: <FileText className="h-5 w-5" />,
    },
  ];

  const typeConfig: Record<string, { color: string; bgColor: string; label: string }> = {
    note: { color: 'text-primary', bgColor: 'bg-primary/10', label: 'Clinical Note' },
    medication: { color: 'text-secondary', bgColor: 'bg-secondary/10', label: 'Medication' },
    vitals: { color: 'text-accent', bgColor: 'bg-accent/10', label: 'Vitals' },
    referral: { color: 'text-warning', bgColor: 'bg-warning/10', label: 'Referral' },
    outcome: { color: 'text-success', bgColor: 'bg-success/10', label: 'Outcome' },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6">
        <div className="flex items-start gap-3">
          <Calendar className="h-6 w-6 text-primary flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-foreground">Patient Clinical Timeline</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Complete record of clinical events, encounters, and AI recommendations
            </p>
          </div>
        </div>
      </Card>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-transparent" />

        {/* Events */}
        <div className="space-y-4">
          {events.map((event, index) => {
            const config = typeConfig[event.type];

            return (
              <div key={event.id} className="relative ml-16">
                {/* Timeline Dot */}
                <div
                  className={`absolute -left-12 mt-2 h-10 w-10 rounded-full flex items-center justify-center ${config.bgColor} border-4 border-background`}
                >
                  <div className={config.color}>{event.icon}</div>
                </div>

                {/* Content Card */}
                <Card className={`p-4 hover:shadow-md transition-shadow border-l-4 ${
                  config.color.replace('text-', 'border-l-')
                }`}>
                  <div className="space-y-2">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-foreground">
                            {event.title}
                          </h4>
                          <span
                            className={`text-xs font-bold px-2 py-0.5 rounded-full ${config.bgColor} ${config.color}`}
                          >
                            {config.label}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {event.date}
                        </p>
                      </div>

                      {/* Confidence Badge */}
                      {event.confidence && (
                        <div className="flex items-center gap-1">
                          <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                          <span className="text-xs font-bold text-success">
                            {event.confidence}%
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-sm text-foreground leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </div>

      {/* Audit Trail Notice */}
      <Card className="bg-primary/5 border-primary/20 p-4">
        <div className="flex gap-2">
          <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-primary mb-1">
              AUDIT TRAIL NOTICE
            </p>
            <p className="text-xs text-primary/80 leading-relaxed">
              All clinical events are logged with timestamps and clinician attribution for regulatory compliance. This timeline is legally binding medical evidence.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
