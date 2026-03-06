"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";

import { useLanguage } from "@/contexts/language-context";
import { FHIRBadge } from "@/components/ui/fhir-badge";
import { AWSBadge } from "@/components/ui/aws-badge";
import { LivePulse } from "@/components/ui/live-pulse";
import {
  AlertCircle,
  Stethoscope,
  FileText,
  ClipboardList,
  Pill,
  User,
  Heart,
  Shield,
  Mic,
  Plus,
  Calendar
} from "lucide-react";

import { VoiceCapturePanel } from "./voice-capture-panel";
import { SOAPNoteBuilder } from "./soap-note-builder";
import { AIRecommendations } from "./ai-recommendations";
import { RxManager } from "./rx-manager";
import { DischargeTab } from "./discharge-tab";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Current patient data with proper UHID and ABHA ID formats
const currentPatient = {
  uhid: "UHID-MH-2024-008821",
  abhaId: "1234-5678-9012-0001",
  name: "Ramesh Kumar",
  age: 67,
  gender: "M",
  bloodGroup: "B+",
  district: "Nagpur",
  state: "MH",
  allergies: ["Penicillin", "Sulfa"],
  initials: "RK",
  status: "in-consultation",
};

export function ClinicianWorkspaceContent() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [recordingActive, setRecordingActive] = useState(false);
  const [soapData, setSoapData] = useState({
    subjective: "",
    objective: "",
    assessment: "",
    plan: "",
  });

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-full">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fade-in-up">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground font-heading">
            {t("clinician.title")}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Command Center
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-emerald-50 dark:bg-emerald-950/30 px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800">
            <LivePulse active color="green" size="sm" />
            <span>Session active</span>
          </div>
          <AWSBadge service="Transcribe" model="Medical" status="active" />
        </div>
      </div>

      {/* ===== Patient Header Bar ===== */}
      <Card className="p-0 overflow-hidden border-teal-200 dark:border-teal-800 animate-fade-in-up">
        {/* Gradient top accent */}
        <div className="h-1 bg-gradient-to-r from-teal-500 via-teal-400 to-emerald-500" />

        <div className="p-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Patient identity section */}
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center shadow-lg shadow-teal-500/20">
                <span className="text-lg font-bold text-white">
                  {currentPatient.initials}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-lg font-semibold text-foreground">
                    {currentPatient.name}
                  </span>
                  <span className="font-mono text-sm text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/50 px-2 py-0.5 rounded-md">
                    {currentPatient.uhid}
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-1.5 text-sm">
                  <span className="text-foreground font-medium">
                    {currentPatient.age}
                    <span className="text-muted-foreground font-normal">
                      y/{currentPatient.gender}
                    </span>
                  </span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">
                    {currentPatient.district}, {currentPatient.state}
                  </span>
                  <span className="text-muted-foreground">•</span>
                  <span className="flex items-center gap-1">
                    <Heart className="h-3.5 w-3.5 text-red-400" />
                    <span className="font-medium text-foreground">
                      {currentPatient.bloodGroup}
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* Right side badges */}
            <div className="flex flex-col items-end gap-2">
              <FHIRBadge resourceType="Patient" validated />
              <span className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-1 rounded-full">
                <LivePulse active color="green" size="sm" />
                ABDM Linked
              </span>
            </div>
          </div>

          {/* Bottom info row */}
          <div className="flex items-center gap-4 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex-wrap">
            {/* Allergies */}
            <div className="flex items-center gap-2">
              <AlertCircle className="h-3.5 w-3.5 text-red-500" />
              <span className="text-xs text-muted-foreground font-medium">
                Allergies:
              </span>
              {currentPatient.allergies.map((allergy, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 text-xs rounded-full font-medium"
                >
                  {allergy}
                </span>
              ))}
            </div>
            <span className="text-slate-200 dark:text-slate-700">|</span>
            {/* ABHA ID */}
            <span className="text-xs text-muted-foreground">
              ABHA:{" "}
              <span className="font-mono text-teal-600 dark:text-teal-400 font-medium">
                {currentPatient.abhaId}
              </span>
            </span>
          </div>
        </div>
      </Card>

      {/* ===== 3-Column Command Center Workspace ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-6 animate-fade-in-up md:h-[calc(100vh-16rem)]" style={{ animationDelay: "0.1s" }}>
        
        {/* ========================================================
            LEFT PILLAR (Col Span 3): Context & History
            ======================================================== */}
        <div className="lg:col-span-3 space-y-4 flex flex-col h-full overflow-y-auto custom-scrollbar pr-1">
          {/* Quick Actions Bar */}
          <Card className="p-4 flex flex-col gap-3">
             <h4 className="font-semibold text-foreground text-sm">Quick Actions</h4>
             <Button variant="outline" size="sm" className="gap-2 justify-start" onClick={() => toast({ title: "Add Vitals", description: "Opening Vitals entry module..." })}>
               <Stethoscope className="h-4 w-4" />
               Add Vitals
             </Button>
             <Button variant="outline" size="sm" className="gap-2 justify-start" onClick={() => toast({ title: "Attach Lab Report", description: "Opening file uploader..." })}>
               <FileText className="h-4 w-4" />
               Attach Lab Report
             </Button>
             <Button variant="outline" size="sm" className="gap-2 justify-start" onClick={() => toast({ title: "Schedule Follow-up", description: "Opening calendar scheduler..." })}>
               <Calendar className="h-4 w-4" />
               Schedule Follow-up
             </Button>
             <Button variant={recordingActive ? "destructive" : "default"} size="sm" className="gap-2 justify-start" onClick={() => setRecordingActive(!recordingActive)}>
               <Mic className="h-4 w-4" />
               {recordingActive ? "Stop Recording" : "Voice Capture"}
             </Button>
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

          {/* Recent History */}
          <Card className="p-4 flex-1">
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
        </div>

        {/* ========================================================
            CENTER PILLAR (Col Span 6): Clinical Documentation
            ======================================================== */}
        <div className="lg:col-span-6 space-y-4 flex flex-col h-full overflow-y-auto custom-scrollbar px-1">
          <div className="flex flex-col gap-6 flex-1">
            <SOAPNoteBuilder data={soapData} onUpdate={setSoapData} />
            
            <Card className="p-0 overflow-hidden shrink-0 mt-auto border border-border shadow-sm">
              <div className="bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-950/30 dark:to-emerald-950/30 px-4 py-3 border-b border-border">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <span className="p-1 rounded bg-teal-100 dark:bg-teal-900 text-teal-600">
                     <Pill className="h-4 w-4" />
                  </span>
                  Prescriptions (Rx)
                </h3>
              </div>
              <div className="p-4 bg-white dark:bg-slate-900">
                <RxManager />
              </div>
            </Card>
          </div>
        </div>

        {/* ========================================================
            RIGHT PILLAR (Col Span 3): AI Intelligence & Output
            ======================================================== */}
        <div className="lg:col-span-3 space-y-4 flex flex-col h-full overflow-y-auto custom-scrollbar pl-1">
          <AIRecommendations soapData={soapData} />
          
          <Card className="p-0 overflow-hidden mt-auto border border-border shadow-sm shrink-0">
             <div className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/80 dark:to-slate-900 px-4 py-3 border-b border-border">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <span className="p-1 rounded bg-slate-200 dark:bg-slate-800 text-slate-600">
                     <FileText className="h-4 w-4" />
                  </span>
                  Discharge Summary
                </h3>
             </div>
             <div className="p-4 text-sm text-foreground space-y-4">
                <p className="text-xs text-muted-foreground mb-4">
                  Review the auto-generated patient discharge summary below based on current SOAP notes.
                </p>
                <div className="transition-opacity duration-300">
                  <DischargeTab />
                </div>
             </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
