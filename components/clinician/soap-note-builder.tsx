"use client";

import React, { useState } from "react";
import { FileText, Save, ChevronDown, ChevronUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ConfidenceRing } from "@/components/ui/confidence-ring";
import { AIActionBar } from "@/components/ui/ai-action-bar";
import { AWSBadge } from "@/components/ui/aws-badge";

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

export function SOAPNoteBuilder({ data, onUpdate }: SOAPNoteBuilderProps) {
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    subjective: true,
    objective: true,
    assessment: true,
    plan: true,
  });
  const [acceptedSections, setAcceptedSections] = useState<
    Record<string, boolean>
  >({});

  const handleUpdate = (section: keyof SOAPData, value: string) => {
    onUpdate({ ...data, [section]: value });
  };

  const toggleSection = (key: string) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAccept = (key: keyof SOAPData, suggestion: string) => {
    handleUpdate(key, suggestion);
    setAcceptedSections((prev) => ({ ...prev, [key]: true }));
  };

  const isFilled = Object.values(data).some((v) => v.length > 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-foreground flex items-center gap-2">
          <FileText className="h-5 w-5 text-teal-600" />
          SOAP Note
        </h4>
        <AWSBadge service="Amazon Bedrock" model="Claude 3 Sonnet" />
      </div>

      {/* SOAP Sections */}
      {soapSections.map((section) => (
        <Card
          key={section.key}
          className={`border-l-4 ${section.color} overflow-hidden`}
        >
          {/* Section Header */}
          <button
            onClick={() => toggleSection(section.key)}
            className="w-full px-4 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-sm text-slate-700">
                {section.label}
              </span>
              <span className="font-semibold text-foreground">
                {section.title}
              </span>
              {acceptedSections[section.key] && (
                <span className="text-xs text-green-600 font-medium">
                  ✓ AI Accepted
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <ConfidenceRing score={section.confidence} size="sm" />
              {expandedSections[section.key] ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
          </button>

          {/* Section Content */}
          {expandedSections[section.key] && (
            <div className="px-4 pb-4 space-y-3">
              {/* AI Suggestion */}
              <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                <p className="text-xs font-semibold text-muted-foreground mb-2">
                  AI-DRAFTED
                </p>
                <p className="text-sm text-foreground whitespace-pre-line">
                  {section.aiSuggestion}
                </p>
              </div>

              {/* AI Action Bar */}
              <AIActionBar
                confidence={section.confidence}
                onAccept={() => handleAccept(section.key, section.aiSuggestion)}
                onEdit={() => {}}
                onReject={() => {}}
                showBadge={false}
              />

              {/* Manual Edit Area */}
              <textarea
                value={data[section.key]}
                onChange={(e) => handleUpdate(section.key, e.target.value)}
                placeholder={section.placeholder}
                className="w-full h-20 rounded-lg border border-slate-200 bg-white p-3 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              {data[section.key] && (
                <p className="text-xs text-muted-foreground">
                  {data[section.key].length} characters
                </p>
              )}
            </div>
          )}
        </Card>
      ))}

      {/* Save Button */}
      <Button
        className="w-full"
        disabled={!isFilled}
        onClick={() => {
          console.log("Saving SOAP note:", data);
        }}
      >
        <Save className="h-4 w-4 mr-2" />
        Save SOAP Note
      </Button>

      {/* Clinical Tip */}
      <Card className="bg-teal-50 border-teal-200 p-3">
        <p className="text-xs text-teal-700 font-medium">
          💡 Tip: Voice transcription auto-fills the Subjective field. Edit as
          needed for accuracy.
        </p>
      </Card>
    </div>
  );
}
