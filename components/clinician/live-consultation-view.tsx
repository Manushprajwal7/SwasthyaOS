'use client';

import React, { useState } from 'react';
import {
  Mic,
  Stethoscope,
  AlertCircle,
  CheckCircle,
  Plus,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PatientInfoCard } from './patient-info-card';
import { VoiceCapturePanel } from './voice-capture-panel';
import { SOAPNoteBuilder } from './soap-note-builder';
import { AIRecommendations } from './ai-recommendations';

export function LiveConsultationView() {
  const [recordingActive, setRecordingActive] = useState(false);
  const [soapData, setSoapData] = useState({
    subjective: '',
    objective: '',
    assessment: '',
    plan: '',
  });

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Left Column: Patient Info & Voice */}
      <div className="lg:col-span-1 space-y-6">
        {/* Patient Information Card */}
        <PatientInfoCard
          patientId="P-2402"
          name="Ajay Kumar"
          age={28}
          gender="M"
          bloodType="A+"
          allergies={['Penicillin', 'NSAIDs']}
          chronicConditions={['Diabetes Type 2']}
          lastVisit="3 months ago"
        />

        {/* Voice Capture Panel */}
        <VoiceCapturePanel
          isRecording={recordingActive}
          onToggleRecording={() => setRecordingActive(!recordingActive)}
          transcribedText={soapData.subjective}
          onTranscriptionUpdate={(text) =>
            setSoapData({ ...soapData, subjective: text })
          }
        />

        {/* Quick Actions */}
        <Card className="p-4 space-y-2">
          <h4 className="font-semibold text-foreground text-sm">Quick Actions</h4>
          <div className="space-y-2">
            <Button
              className="w-full justify-start text-sm bg-transparent"
              variant="outline"
              size="sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Vitals
            </Button>
            <Button
              className="w-full justify-start text-sm bg-transparent"
              variant="outline"
              size="sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              Attach Image
            </Button>
          </div>
        </Card>
      </div>

      {/* Middle Column: SOAP Notes */}
      <div className="lg:col-span-1">
        <SOAPNoteBuilder
          data={soapData}
          onUpdate={setSoapData}
        />
      </div>

      {/* Right Column: AI Recommendations */}
      <div className="lg:col-span-1">
        <AIRecommendations soapData={soapData} />
      </div>
    </div>
  );
}
