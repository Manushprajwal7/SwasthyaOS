"use client";

import React, { useState } from "react";
import {
  FileText,
  Pill,
  Heart,
  Ambulance,
  CheckCircle,
  AlertCircle,
  Calendar,
  ChevronDown,
  ChevronUp,
  Code,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FHIRBadge } from "@/components/ui/fhir-badge";
import { AWSBadge } from "@/components/ui/aws-badge";
import { ConfidenceRing } from "@/components/ui/confidence-ring";

interface TimelineEvent {
  id: string;
  date: string;
  type: "note" | "medication" | "vitals" | "referral" | "outcome";
  title: string;
  description: string;
  icon: React.ReactNode;
  confidence?: number;
  fhirResource?: object;
}

interface PatientTimelineProps {
  patientId: string;
}

export function PatientTimeline({ patientId }: PatientTimelineProps) {
  const [expandedFhir, setExpandedFhir] = useState<string | null>(null);

  // Mock timeline data with FHIR resources
  const events: TimelineEvent[] = [
    {
      id: "1",
      date: "2024-03-14 14:30",
      type: "note",
      title: "Consultation — Dr. Sharma, AIIMS Delhi",
      description:
        "Chief: Fever + Cough + Breathlessness\nAssessment: Probable CAP (J18.9)",
      icon: <FileText className="h-5 w-5" />,
      confidence: 0.84,
      fhirResource: {
        resourceType: "Encounter",
        id: "enc-MH-20240314-001",
        status: "finished",
        class: { code: "AMB", display: "ambulatory" },
        subject: { reference: "Patient/pt-MH-20240312-8821" },
        participant: [{ individual: { display: "Dr. Arun Sharma" } }],
        reasonCode: [
          {
            coding: [
              {
                system: "http://hl7.org/fhir/sid/icd-10",
                code: "J18.9",
                display: "Pneumonia, unspecified",
              },
            ],
          },
        ],
        period: { start: "2024-03-14T14:30:00+05:30" },
      },
    },
    {
      id: "2",
      date: "2024-03-12",
      type: "vitals",
      title: "Lab Result — CBC, CXR",
      description:
        "Hb: 11.2 | WBC: 14,800 (HIGH) | CXR: Right basal opacity\nAI interpretation: Consistent with bacterial pneumonia",
      icon: <Heart className="h-5 w-5" />,
      fhirResource: {
        resourceType: "DiagnosticReport",
        id: "dr-MH-20240312-001",
        status: "final",
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: "58410-2",
              display: "CBC panel",
            },
          ],
        },
        subject: { reference: "Patient/pt-MH-20240312-8821" },
        effectiveDateTime: "2024-03-12T10:15:00+05:30",
        result: [
          {
            reference: "Observation/obs-hb-001",
            display: "Hemoglobin 11.2 g/dL",
          },
          {
            reference: "Observation/obs-wbc-001",
            display: "WBC 14,800 /uL (HIGH)",
          },
        ],
      },
    },
    {
      id: "3",
      date: "2024-03-01",
      type: "medication",
      title: "Medication — Ongoing",
      description:
        "Metformin 500mg BD (DM management)\nAmlodipine 5mg OD (Hypertension)",
      icon: <Pill className="h-5 w-5" />,
      fhirResource: {
        resourceType: "MedicationRequest",
        id: "mr-MH-20240301-001",
        status: "active",
        intent: "order",
        medicationCodeableConcept: {
          coding: [
            {
              system: "http://www.nlm.nih.gov/research/umls/rxnorm",
              code: "860975",
              display: "Metformin 500mg",
            },
          ],
        },
        subject: { reference: "Patient/pt-MH-20240312-8821" },
        dosageInstruction: [
          {
            text: "500mg twice daily",
            timing: { repeat: { frequency: 2, period: 1, periodUnit: "d" } },
          },
        ],
      },
    },
    {
      id: "4",
      date: "2024-01-15",
      type: "note",
      title: "Consultation — PHC Nagpur",
      description: "Chief: DM follow-up | HbA1c: 8.1% (suboptimal)",
      icon: <FileText className="h-5 w-5" />,
      confidence: 0.91,
      fhirResource: {
        resourceType: "Observation",
        id: "obs-hba1c-001",
        status: "final",
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: "4548-4",
              display: "Hemoglobin A1c",
            },
          ],
        },
        subject: { reference: "Patient/pt-MH-20240312-8821" },
        effectiveDateTime: "2024-01-15",
        valueQuantity: { value: 8.1, unit: "%" },
      },
    },
    {
      id: "5",
      date: "2023-11-02",
      type: "referral",
      title: "Referral — ASHA Worker (AarogyaPath)",
      description:
        "Referred: Chest pain evaluation\nTriage level: AMBER | Referral slip QR attached",
      icon: <Ambulance className="h-5 w-5" />,
      fhirResource: {
        resourceType: "ServiceRequest",
        id: "sr-MH-20231102-001",
        status: "completed",
        intent: "order",
        code: { coding: [{ display: "Cardiac evaluation" }] },
        subject: { reference: "Patient/pt-MH-20240312-8821" },
        requester: { display: "ASHA Worker - Savitri Devi" },
        priority: "urgent",
      },
    },
  ];

  const typeConfig: Record<
    string,
    { color: string; bgColor: string; label: string }
  > = {
    note: {
      color: "text-teal-600",
      bgColor: "bg-teal-100",
      label: "Clinical Note",
    },
    medication: {
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      label: "Medication",
    },
    vitals: {
      color: "text-amber-600",
      bgColor: "bg-amber-100",
      label: "Lab/Vitals",
    },
    referral: {
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      label: "Referral",
    },
    outcome: {
      color: "text-green-600",
      bgColor: "bg-green-100",
      label: "Outcome",
    },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-teal-600" />
            <div>
              <h3 className="font-semibold text-foreground">
                Patient Clinical Timeline
              </h3>
              <p className="text-sm text-muted-foreground">
                Complete record of clinical events, encounters, and AI
                recommendations
              </p>
            </div>
          </div>
          <AWSBadge service="AWS HealthLake" />
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Timeline - 2/3 width */}
        <div className="lg:col-span-2">
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-500 to-transparent" />

            {/* Events */}
            <div className="space-y-4">
              {events.map((event) => {
                const config = typeConfig[event.type];
                const showFhir = expandedFhir === event.id;

                return (
                  <div key={event.id} className="relative ml-16">
                    {/* Timeline Dot */}
                    <div
                      className={`absolute -left-12 mt-2 h-10 w-10 rounded-full flex items-center justify-center ${config.bgColor} border-4 border-white shadow-sm`}
                    >
                      <div className={config.color}>{event.icon}</div>
                    </div>

                    {/* Content Card */}
                    <Card
                      className={`p-4 border-l-4 ${config.color.replace(
                        "text-",
                        "border-l-"
                      )}`}
                    >
                      <div className="space-y-2">
                        {/* Header */}
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-foreground">
                                {event.title}
                              </h4>
                              <span
                                className={`text-xs font-semibold px-2 py-0.5 rounded-full ${config.bgColor} ${config.color}`}
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
                            <ConfidenceRing
                              score={event.confidence}
                              size="sm"
                            />
                          )}
                        </div>

                        {/* Description */}
                        <p className="text-sm text-foreground whitespace-pre-line">
                          {event.description}
                        </p>

                        {/* FHIR Toggle */}
                        {event.fhirResource && (
                          <div className="pt-2 border-t border-slate-100">
                            <button
                              onClick={() =>
                                setExpandedFhir(showFhir ? null : event.id)
                              }
                              className="flex items-center gap-2 text-xs text-teal-600 hover:text-teal-700 font-medium"
                            >
                              <Code className="h-3.5 w-3.5" />
                              {showFhir ? "Hide" : "View"} FHIR JSON
                              {showFhir ? (
                                <ChevronUp className="h-3.5 w-3.5" />
                              ) : (
                                <ChevronDown className="h-3.5 w-3.5" />
                              )}
                            </button>

                            {showFhir && (
                              <div className="mt-3 p-3 bg-slate-900 rounded-lg overflow-x-auto">
                                <div className="flex items-center justify-between mb-2">
                                  <FHIRBadge
                                    resourceType={
                                      (event.fhirResource as any).resourceType
                                    }
                                    validated
                                  />
                                </div>
                                <pre className="text-xs text-slate-300 font-mono">
                                  {JSON.stringify(event.fhirResource, null, 2)}
                                </pre>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Risk Intelligence Panel - 1/3 width */}
        <div className="space-y-4">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-foreground">
                Risk Intelligence
              </h4>
              <AWSBadge service="Amazon SageMaker" />
            </div>

            <div className="space-y-4">
              {/* 30-Day Readmission Risk */}
              <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-amber-800">
                    30-Day Readmission Risk
                  </span>
                  <span className="text-lg font-bold text-amber-700">34%</span>
                </div>
                <div className="h-2 bg-amber-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500"
                    style={{ width: "34%" }}
                  />
                </div>
                <p className="text-xs text-amber-600 mt-1">
                  AMBER - Monitor closely
                </p>
              </div>

              {/* Medication Adherence */}
              <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-red-800">
                    Medication Adherence
                  </span>
                  <span className="text-lg font-bold text-red-700">67%</span>
                </div>
                <div className="h-2 bg-red-200 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500" style={{ width: "67%" }} />
                </div>
                <p className="text-xs text-red-600 mt-1">
                  LOW - Intervention needed
                </p>
              </div>

              {/* Chronic Conditions */}
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-2">
                  CHRONIC CONDITIONS
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-full">
                    Type 2 DM
                  </span>
                  <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-full">
                    Hypertension
                  </span>
                  <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-full">
                    Recurrent ARI
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* Risk Factors */}
          <Card className="p-4">
            <h4 className="font-semibold text-foreground mb-3">
              Risk Factor Analysis
            </h4>
            <div className="space-y-2">
              {[
                { factor: "Age >65", level: "HIGH", width: "90%" },
                { factor: "DM uncontrolled", level: "HIGH", width: "85%" },
                { factor: "Low SpO2 history", level: "MEDIUM", width: "60%" },
                { factor: "Medication gaps", level: "MEDIUM", width: "50%" },
                { factor: "Social isolation", level: "LOW", width: "20%" },
              ].map((item) => (
                <div key={item.factor} className="text-sm">
                  <div className="flex justify-between mb-1">
                    <span className="text-muted-foreground">{item.factor}</span>
                    <span
                      className={`text-xs font-semibold ${
                        item.level === "HIGH"
                          ? "text-red-600"
                          : item.level === "MEDIUM"
                          ? "text-amber-600"
                          : "text-green-600"
                      }`}
                    >
                      {item.level}
                    </span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        item.level === "HIGH"
                          ? "bg-red-500"
                          : item.level === "MEDIUM"
                          ? "bg-amber-500"
                          : "bg-green-500"
                      }`}
                      style={{ width: item.width }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Upcoming Follow-ups */}
          <Card className="p-4">
            <h4 className="font-semibold text-foreground mb-3">
              Upcoming Follow-ups
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-teal-600" />
                <span className="text-foreground">Mar 21: HbA1c review</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-teal-600" />
                <span className="text-foreground">
                  Mar 28: Post-pneumonia CXR
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Audit Trail Notice */}
      <Card className="bg-teal-50 border-teal-200 p-4">
        <div className="flex gap-2">
          <AlertCircle className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-teal-700 mb-1">
              AUDIT TRAIL NOTICE
            </p>
            <p className="text-xs text-teal-600 leading-relaxed">
              All clinical events are logged with timestamps and clinician
              attribution for regulatory compliance. This timeline is legally
              binding medical evidence. FHIR R4 resources are stored in AWS
              HealthLake.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
