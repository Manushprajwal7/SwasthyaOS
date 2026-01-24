'use client';

import React from 'react';
import { FileText, Save } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface SOAPData {
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
}

interface SOAPNoteBuilderProps {
  data: SOAPData;
  onUpdate: (data: SOAPData) => void;
}

const soapSections = [
  {
    key: 'subjective' as const,
    label: 'Subjective',
    placeholder: 'Patient complaints, symptoms, medical history...',
    color: 'border-l-primary',
  },
  {
    key: 'objective' as const,
    label: 'Objective',
    placeholder: 'Vital signs, physical exam findings, lab results...',
    color: 'border-l-secondary',
  },
  {
    key: 'assessment' as const,
    label: 'Assessment',
    placeholder: 'Clinical diagnosis, differential diagnoses...',
    color: 'border-l-accent',
  },
  {
    key: 'plan' as const,
    label: 'Plan',
    placeholder: 'Treatment, medications, referrals, follow-up...',
    color: 'border-l-success',
  },
];

export function SOAPNoteBuilder({ data, onUpdate }: SOAPNoteBuilderProps) {
  const handleUpdate = (section: keyof SOAPData, value: string) => {
    onUpdate({ ...data, [section]: value });
  };

  const isFilled = Object.values(data).some((v) => v.length > 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-foreground flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          SOAP Note
        </h4>
      </div>

      {/* SOAP Sections */}
      {soapSections.map((section) => (
        <Card key={section.key} className={`border-l-4 ${section.color} p-4`}>
          <label className="block mb-2">
            <span className="text-sm font-semibold text-foreground block mb-2">
              {section.label}
            </span>
            <textarea
              value={data[section.key]}
              onChange={(e) => handleUpdate(section.key, e.target.value)}
              placeholder={section.placeholder}
              className="w-full h-24 rounded-lg border border-border bg-card p-3 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </label>
          {data[section.key] && (
            <p className="text-xs text-muted-foreground mt-1">
              {data[section.key].length} characters
            </p>
          )}
        </Card>
      ))}

      {/* Save Button */}
      <Button
        className="w-full"
        disabled={!isFilled}
        onClick={() => {
          // API call would go here
          console.log('Saving SOAP note:', data);
        }}
      >
        <Save className="h-4 w-4 mr-2" />
        Save SOAP Note
      </Button>

      {/* Clinical Tip */}
      <Card className="bg-primary/5 border-primary/20 p-3">
        <p className="text-xs text-primary font-medium">
          💡 Tip: Voice transcription auto-fills the Subjective field. Edit as needed for accuracy.
        </p>
      </Card>
    </div>
  );
}
