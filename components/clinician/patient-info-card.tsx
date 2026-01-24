'use client';

import React from 'react';
import { AlertCircle, User } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface PatientInfoCardProps {
  patientId: string;
  name: string;
  age: number;
  gender: string;
  bloodType: string;
  allergies: string[];
  chronicConditions: string[];
  lastVisit: string;
}

export function PatientInfoCard({
  patientId,
  name,
  age,
  gender,
  bloodType,
  allergies,
  chronicConditions,
  lastVisit,
}: PatientInfoCardProps) {
  return (
    <Card className="p-6">
      {/* FHIR-Style Header */}
      <div className="flex items-start gap-4 mb-6 pb-6 border-b border-border">
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
          <User className="h-6 w-6 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-lg text-foreground">{name}</h3>
          <p className="text-xs font-mono text-muted-foreground">{patientId}</p>
        </div>
      </div>

      {/* Demographics */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Age</span>
          <span className="font-semibold text-foreground">{age}y</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Gender</span>
          <span className="font-semibold text-foreground">{gender}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Blood Type</span>
          <span className="font-semibold text-foreground">{bloodType}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Last Visit</span>
          <span className="font-semibold text-foreground">{lastVisit}</span>
        </div>
      </div>

      {/* Allergies - Alert if present */}
      {allergies.length > 0 && (
        <div className="mb-4 rounded-lg bg-error/10 border border-error/20 p-3">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-error flex-shrink-0 mt-0.5" />
            <div className="text-xs">
              <p className="font-semibold text-error">Allergies</p>
              <p className="text-error/80 mt-1">{allergies.join(', ')}</p>
            </div>
          </div>
        </div>
      )}

      {/* Chronic Conditions */}
      {chronicConditions.length > 0 && (
        <div className="rounded-lg bg-warning/10 border border-warning/20 p-3">
          <p className="text-xs font-semibold text-warning mb-1">
            Chronic Conditions
          </p>
          <div className="space-y-1">
            {chronicConditions.map((condition) => (
              <p key={condition} className="text-xs text-warning/80">
                • {condition}
              </p>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
