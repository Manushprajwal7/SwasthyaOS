"use client";

import React, { useState } from "react";
import {
  Mic,
  Stethoscope,
  Plus,
  Calendar,
  FileText,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { VoiceCapturePanel } from "./voice-capture-panel";
import { SOAPNoteBuilder } from "./soap-note-builder";
import { AIRecommendations } from "./ai-recommendations";

export function ConsultationTab() {
  const [recordingActive, setRecordingActive] = useState(false);
  const [soapData, setSoapData] = useState({
    subjective: "",
    objective: "",
    assessment: "",
    plan: "",
  });

  return (
    <div className="space-y-6">
      {/* Quick Actions Bar */}
      <div className="flex items-center gap-3 flex-wrap">
        <Button variant="outline" size="sm" className="gap-2">
          <Stethoscope className="h-4 w-4" />
          Add Vitals
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <FileText className="h-4 w-4" />
          Attach Lab Report
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <Calendar className="h-4 w-4" />
          Schedule Follow-up
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <Mic className="h-4 w-4" />
          {recordingActive ? "Stop Recording" : "Voice Capture"}
        </Button>
      </div>

      {/* Main 2-Column Layout: SOAP Notes + AI Sidebar */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left: SOAP Notes (8 cols) */}
        <div className="lg:col-span-8 min-w-0">
          <SOAPNoteBuilder data={soapData} onUpdate={setSoapData} />
        </div>

        {/* Right: AI Recommendations + Recent Visits (4 cols) */}
        <div className="lg:col-span-4 space-y-4 min-w-0">
          <AIRecommendations soapData={soapData} />

          {/* Recent History */}
          <Card className="p-4">
            <h4 className="font-semibold text-foreground text-sm mb-3 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-teal-600" />
              Recent Visits
            </h4>
            <div className="space-y-2">
              <div className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                <div className="text-xs text-muted-foreground font-mono whitespace-nowrap">
                  Oct 15
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    Diabetes Review
                  </p>
                  <p className="text-xs text-muted-foreground">
                    HbA1c: 7.2% | Medication adjusted
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                <div className="text-xs text-muted-foreground font-mono whitespace-nowrap">
                  Jul 22
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    Annual Physical
                  </p>
                  <p className="text-xs text-muted-foreground">
                    All vitals normal
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Voice Capture Panel (compact) */}
          <VoiceCapturePanel
            isRecording={recordingActive}
            onToggleRecording={() => setRecordingActive(!recordingActive)}
            transcribedText={soapData.subjective}
            onTranscriptionUpdate={(text) =>
              setSoapData({ ...soapData, subjective: text })
            }
          />
        </div>
      </div>
    </div>
  );
}
