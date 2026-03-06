'use client';

import React from 'react';
import { Users, AlertCircle, Check } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  lastVisit: string;
  status: 'active' | 'inactive' | 'critical';
}

interface PatientListProps {
  patients: Patient[];
  selectedPatientId: string | null;
  onSelectPatient: (id: string) => void;
}

export function PatientList({
  patients,
  selectedPatientId,
  onSelectPatient,
}: PatientListProps) {
  const statusConfig = {
    active: { color: 'text-success', bg: 'bg-success/10', icon: Check, label: 'Active' },
    inactive: { color: 'text-muted-foreground', bg: 'bg-muted', icon: Check, label: 'Inactive' },
    critical: {
      color: 'text-error',
      bg: 'bg-error/10',
      icon: AlertCircle,
      label: 'Critical',
    },
  };

  return (
    <div className="h-fit">
      <div className="flex items-center gap-2 mb-4 px-1">
        <Users className="h-5 w-5 text-indigo-600" />
        <h3 className="font-semibold text-foreground tracking-tight text-sm">
          Patients
        </h3>
        <span className="text-xs bg-slate-100 dark:bg-slate-800 text-muted-foreground px-2 py-0.5 rounded-full ml-auto">
          {patients.length} Total
        </span>
      </div>

      <div className="space-y-2">
        {patients.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No patients found
          </p>
        ) : (
          patients.map((patient) => {
            const config = statusConfig[patient.status];
            const isSelected = selectedPatientId === patient.id;

            return (
              <button
                key={patient.id}
                onClick={() => onSelectPatient(patient.id)}
                className={cn(
                  'w-full rounded-lg p-3 text-left transition-all border-2',
                  isSelected
                    ? 'bg-primary/5 border-primary shadow-md'
                    : 'border-border hover:border-primary/50'
                )}
              >
                <div className="space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground text-sm truncate">
                        {patient.name}
                      </p>
                      <p className="text-xs font-mono text-muted-foreground">
                        {patient.id}
                      </p>
                    </div>
                    <div
                      className={`flex items-center gap-1 rounded-full px-1.5 py-0.5 text-xs font-semibold whitespace-nowrap ${config.bg} ${config.color}`}
                    >
                      {React.createElement(config.icon, {
                        className: 'h-2.5 w-2.5',
                      })}
                      {config.label}
                    </div>
                  </div>

                  <div className="flex gap-2 text-xs text-muted-foreground">
                    <span>{patient.age}y</span>
                    <span>•</span>
                    <span>{patient.gender}</span>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    Last visit: {patient.lastVisit}
                  </p>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
