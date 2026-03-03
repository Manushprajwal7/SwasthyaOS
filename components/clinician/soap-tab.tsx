"use client";

import React from "react";
import { FileText } from "lucide-react";
import { AWSBadge } from "@/components/ui/aws-badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ConfidenceRing } from "@/components/ui/confidence-ring";
import { AIActionBar } from "@/components/ui/ai-action-bar";

const soapSections = [
  {
    key: "subjective" as const,
    label: "S",
    title: "Subjective",
    placeholder: "Patient complaints, symptoms, medical history...",
    color: "border-l-teal-500",
    aiSuggestion:
      "67-year-old male presents with 3-day history of fever (38.9°C), progressive cough, and new onset breathlessness. Reports decreased oral intake. Background history of Type 2 Diabetes Mellitus.",
    confidence: 0.91,
  },
  {
    key: "objective" as const,
    label: "O",
    title: "Objective",
    placeholder: "Vital signs, physical exam findings, lab results...",
    color: "border-l-blue-500",
    aiSuggestion:
      "SpO2: 93% (room air) | Temp: 38.9°C | BP: 142/88 mmHg\nHR: 104 bpm | RR: 22/min | Auscultation: Bilateral crackles",
    confidence: 0.88,
  },
  {
    key: "assessment" as const,
    label: "A",
    title: "Assessment",
    placeholder: "Clinical diagnosis, differential diagnoses...",
    color: "border-l-amber-500",
    aiSuggestion:
      "Probable community-acquired pneumonia in a diabetic patient.\nSeverity: Moderate (CURB-65 score: 2)",
    confidence: 0.84,
  },
  {
    key: "plan" as const,
    label: "P",
    title: "Plan",
    placeholder: "Treatment, medications, referrals, follow-up...",
    color: "border-l-green-500",
    aiSuggestion:
      "1. CXR PA view STAT\n2. CBC, CRP, Blood culture x2\n3. IV Amoxicillin-Clavulanate 1.2g Q8H pending culture\n4. SpO2 monitoring Q2H\n5. Diabetes management review",
    confidence: 0.87,
  },
];

export function SoapTab() {
  const [soapData, setSoapData] = React.useState({
    subjective: "",
    objective: "",
    assessment: "",
    plan: "",
  });

  const handleUpdate = (section: keyof typeof soapData, value: string) => {
    setSoapData({ ...soapData, [section]: value });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <FileText className="h-5 w-5 text-teal-600" />
          Comprehensive SOAP Note Builder
        </h3>
        <AWSBadge service="Amazon Bedrock" model="Claude 3 Sonnet" />
      </div>

      {/* SOAP Sections */}
      {soapSections.map((section) => (
        <Card
          key={section.key}
          className={`border-l-4 ${section.color} overflow-hidden hover-lift`}
        >
          <div className="px-4 py-3 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-sm text-slate-700">
                  {section.label}
                </span>
                <span className="font-semibold text-foreground">
                  {section.title}
                </span>
              </div>
              <ConfidenceRing score={section.confidence} size="sm" />
            </div>

            {/* AI Suggestion */}
            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3 border border-slate-200 dark:border-slate-700">
              <p className="text-xs font-semibold text-muted-foreground mb-2">
                AI-DRAFTED
              </p>
              <p className="text-sm text-foreground whitespace-pre-line">
                {section.aiSuggestion}
              </p>
            </div>

            {/* Manual Edit Area */}
            <textarea
              value={soapData[section.key]}
              onChange={(e) => handleUpdate(section.key, e.target.value)}
              placeholder={section.placeholder}
              className="w-full h-20 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-3 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            {soapData[section.key] && (
              <p className="text-xs text-muted-foreground">
                {soapData[section.key].length} characters
              </p>
            )}
          </div>
        </Card>
      ))}

      {/* Save Button */}
      <Button
        className="w-full"
        disabled={!Object.values(soapData).some((v) => v.length > 0)}
        onClick={() => {
          console.log("Saving SOAP note:", soapData);
        }}
      >
        <FileText className="h-4 w-4 mr-2" />
        Save SOAP Note to FHIR Record
      </Button>

      {/* Clinical Tip */}
      <Card className="bg-teal-50 dark:bg-teal-950/30 border-teal-200 dark:border-teal-800 p-3">
        <p className="text-xs text-teal-700 dark:text-teal-300 font-medium">
          💡 Tip: Voice transcription auto-fills the Subjective field. Edit as
          needed for accuracy.
        </p>
      </Card>
    </div>
  );
}
