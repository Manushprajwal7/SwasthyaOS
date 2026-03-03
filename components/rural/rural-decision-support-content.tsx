"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AWSBadge } from "@/components/ui/aws-badge";
import { ConfidenceRing } from "@/components/ui/confidence-ring";
import { LivePulse } from "@/components/ui/live-pulse";
import { useLanguage } from "@/contexts/language-context";
import {
  Mic,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  Phone,
  QrCode,
  Printer,
  Share2,
  Brain,
  Thermometer,
  Heart,
  Activity,
  Wind,
  Weight,
  Droplet,
} from "lucide-react";

type Step = 1 | 2 | 3 | 4 | 5 | 6;

interface PatientData {
  age: number;
  sex: "M" | "F" | "Other";
  village: string;
  district: string;
  abhaId: string;
}

interface VitalsData {
  temperature: number;
  spo2: number;
  heartRate: number;
  bpSystolic: number;
  bpDiastolic: number;
  respiratoryRate: number;
  weight: number;
}

interface CaseData {
  patient: PatientData;
  vitals: VitalsData;
  symptoms: string[];
  riskFactors: string[];
}

const symptoms = [
  { id: "fever", icon: "🤒", labelEn: "Fever", labelHi: "बुखार" },
  { id: "cough", icon: "🤧", labelEn: "Cough", labelHi: "खांसी" },
  { id: "vomiting", icon: "🤢", labelEn: "Vomiting", labelHi: "उल्टी" },
  { id: "diarrhea", icon: "💩", labelEn: "Diarrhea", labelHi: "दस्त" },
  {
    id: "breathlessness",
    icon: "😮‍💨",
    labelEn: "Breathlessness",
    labelHi: "सांस",
  },
  { id: "headache", icon: "🤕", labelEn: "Headache", labelHi: "सिरदर्द" },
  { id: "throat", icon: "🦷", labelEn: "Throat pain", labelHi: "गला दर्द" },
  {
    id: "pregnancy",
    icon: "🤰",
    labelEn: "Pregnancy concern",
    labelHi: "गर्भावस्था",
  },
  {
    id: "child",
    icon: "👶",
    labelEn: "Child feeding",
    labelHi: "बच्चा खिलाना",
  },
  {
    id: "medication",
    icon: "💊",
    labelEn: "Medication side effect",
    labelHi: "दवाई",
  },
];

const riskFactors = [
  { id: "pregnant", label: "Pregnant" },
  { id: "diabetes", label: "Diabetes" },
  { id: "hypertension", label: "Hypertension" },
  { id: "age60", label: "Age >60" },
  { id: "child5", label: "Child <5" },
  { id: "immunocompromised", label: "Immunocompromised" },
  { id: "hospitalization", label: "Recent hospitalization" },
  { id: "malnutrition", label: "Malnutrition" },
];

export function RuralDecisionSupportContent() {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [showReferralSlip, setShowReferralSlip] = useState(false);
  const [caseData, setCaseData] = useState<CaseData>({
    patient: { age: 0, sex: "M", village: "", district: "", abhaId: "" },
    vitals: {
      temperature: 0,
      spo2: 0,
      heartRate: 0,
      bpSystolic: 0,
      bpDiastolic: 0,
      respiratoryRate: 0,
      weight: 0,
    },
    symptoms: [],
    riskFactors: [],
  });

  const steps = [
    { num: 1, label: "Registration" },
    { num: 2, label: "Vitals" },
    { num: 3, label: "Symptoms" },
    { num: 4, label: "Risk Factors" },
    { num: 5, label: "AI Reasoning" },
    { num: 6, label: "Decision" },
  ];

  const updatePatient = (field: keyof PatientData, value: string | number) => {
    setCaseData((prev) => ({
      ...prev,
      patient: { ...prev.patient, [field]: value },
    }));
  };

  const updateVitals = (field: keyof VitalsData, value: number) => {
    setCaseData((prev) => ({
      ...prev,
      vitals: { ...prev.vitals, [field]: value },
    }));
  };

  const toggleSymptom = (id: string) => {
    setCaseData((prev) => ({
      ...prev,
      symptoms: prev.symptoms.includes(id)
        ? prev.symptoms.filter((s) => s !== id)
        : [...prev.symptoms, id],
    }));
  };

  const toggleRiskFactor = (id: string) => {
    setCaseData((prev) => ({
      ...prev,
      riskFactors: prev.riskFactors.includes(id)
        ? prev.riskFactors.filter((r) => r !== id)
        : [...prev.riskFactors, id],
    }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return caseData.patient.age > 0 && caseData.patient.village;
      case 2:
        return caseData.vitals.temperature > 0;
      case 3:
        return caseData.symptoms.length > 0;
      case 4:
        return true;
      case 5:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="space-y-6 p-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground font-heading">
          {t("rural.title")} (AarogyaPath)
        </h1>
        <p className="mt-2 text-muted-foreground">{t("rural.subtitle")}</p>
      </div>

      {/* Step Indicator - Horizontal Progress Bar */}
      <div className="relative">
        <div className="flex justify-between items-center">
          {steps.map((step, index) => (
            <React.Fragment key={step.num}>
              <div className="flex flex-col items-center z-10">
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center font-semibold text-sm ${
                    currentStep >= step.num
                      ? "bg-teal-600 text-white"
                      : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {currentStep > step.num ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    step.num
                  )}
                </div>
                <span
                  className={`text-xs mt-2 ${
                    currentStep >= step.num
                      ? "text-teal-600 font-medium"
                      : "text-muted-foreground"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 rounded ${
                    currentStep > step.num ? "bg-teal-600" : "bg-slate-200"
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left: Step Content */}
        <div className="lg:col-span-2">
          {/* STEP 1: Patient Registration */}
          {currentStep === 1 && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Patient Registration
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Age
                  </label>
                  <input
                    type="number"
                    value={caseData.patient.age || ""}
                    onChange={(e) =>
                      updatePatient("age", parseInt(e.target.value) || 0)
                    }
                    className="w-full h-14 rounded-lg border border-slate-200 px-4 text-lg focus:ring-2 focus:ring-teal-500"
                    placeholder="Years"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Sex
                  </label>
                  <div className="flex gap-2">
                    {(["M", "F", "Other"] as const).map((sex) => (
                      <button
                        key={sex}
                        onClick={() => updatePatient("sex", sex)}
                        className={`flex-1 h-14 rounded-lg font-semibold ${
                          caseData.patient.sex === sex
                            ? "bg-teal-600 text-white"
                            : "bg-slate-100 text-foreground hover:bg-slate-200"
                        }`}
                      >
                        {sex}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Village
                  </label>
                  <input
                    type="text"
                    value={caseData.patient.village}
                    onChange={(e) => updatePatient("village", e.target.value)}
                    className="w-full h-14 rounded-lg border border-slate-200 px-4 text-lg focus:ring-2 focus:ring-teal-500"
                    placeholder="Village name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    District
                  </label>
                  <select
                    value={caseData.patient.district}
                    onChange={(e) => updatePatient("district", e.target.value)}
                    className="w-full h-14 rounded-lg border border-slate-200 px-4 text-lg focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Select District</option>
                    <option value="Nagpur">Nagpur, Maharashtra</option>
                    <option value="Patna">Patna, Bihar</option>
                    <option value="Bhopal">Bhopal, Madhya Pradesh</option>
                    <option value="Lucknow">Lucknow, Uttar Pradesh</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    ABHA ID (Optional)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={caseData.patient.abhaId}
                      onChange={(e) => updatePatient("abhaId", e.target.value)}
                      className="w-full h-14 rounded-lg border border-slate-200 px-4 pr-12 text-lg font-mono focus:ring-2 focus:ring-teal-500"
                      placeholder="XX-XXXX-XXXX-XXXX"
                    />
                    <QrCode className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* STEP 2: Vitals Entry */}
          {currentStep === 2 && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Vitals Entry
              </h3>
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  {
                    key: "temperature",
                    icon: Thermometer,
                    label: "Temperature",
                    unit: "°C",
                    normal: "36.1-37.2",
                  },
                  {
                    key: "spo2",
                    icon: Droplet,
                    label: "SpO2",
                    unit: "%",
                    normal: "95-100",
                  },
                  {
                    key: "heartRate",
                    icon: Heart,
                    label: "Heart Rate",
                    unit: "bpm",
                    normal: "60-100",
                  },
                  {
                    key: "respiratoryRate",
                    icon: Wind,
                    label: "Respiratory Rate",
                    unit: "/min",
                    normal: "12-20",
                  },
                  {
                    key: "weight",
                    icon: Weight,
                    label: "Weight",
                    unit: "kg",
                    normal: "-",
                  },
                ].map((vital) => {
                  const Icon = vital.icon;
                  const value = caseData.vitals[vital.key as keyof VitalsData];
                  const isAbnormal =
                    vital.key === "spo2" && value > 0 && value < 94;
                  return (
                    <div
                      key={vital.key}
                      className={`p-4 rounded-lg border-2 ${
                        isAbnormal
                          ? "border-red-500 bg-red-50"
                          : "border-slate-200"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Icon
                          className={`h-5 w-5 ${
                            isAbnormal ? "text-red-600" : "text-teal-600"
                          }`}
                        />
                        <span className="text-sm font-medium text-foreground">
                          {vital.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={value || ""}
                          onChange={(e) =>
                            updateVitals(
                              vital.key as keyof VitalsData,
                              parseFloat(e.target.value) || 0
                            )
                          }
                          className="w-full h-12 rounded-lg border border-slate-200 px-3 text-xl font-semibold focus:ring-2 focus:ring-teal-500"
                        />
                        <span className="text-sm text-muted-foreground">
                          {vital.unit}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Normal: {vital.normal}
                      </p>
                      {isAbnormal && (
                        <p className="text-xs text-red-600 font-semibold mt-1">
                          ⚠️ Abnormal value
                        </p>
                      )}
                    </div>
                  );
                })}
                {/* BP Special Case */}
                <div className="p-4 rounded-lg border-2 border-slate-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-5 w-5 text-teal-600" />
                    <span className="text-sm font-medium text-foreground">
                      Blood Pressure
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={caseData.vitals.bpSystolic || ""}
                      onChange={(e) =>
                        updateVitals(
                          "bpSystolic",
                          parseInt(e.target.value) || 0
                        )
                      }
                      className="w-16 h-12 rounded-lg border border-slate-200 px-2 text-xl font-semibold focus:ring-2 focus:ring-teal-500"
                    />
                    <span className="text-xl">/</span>
                    <input
                      type="number"
                      value={caseData.vitals.bpDiastolic || ""}
                      onChange={(e) =>
                        updateVitals(
                          "bpDiastolic",
                          parseInt(e.target.value) || 0
                        )
                      }
                      className="w-16 h-12 rounded-lg border border-slate-200 px-2 text-xl font-semibold focus:ring-2 focus:ring-teal-500"
                    />
                    <span className="text-sm text-muted-foreground">mmHg</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Normal: 90-120 / 60-80
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* STEP 3: Symptom Selection */}
          {currentStep === 3 && (
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">
                  Symptom Selection
                </h3>
                <AWSBadge service="Amazon Transcribe" model="Translate" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {symptoms.map((symptom) => (
                  <button
                    key={symptom.id}
                    onClick={() => toggleSymptom(symptom.id)}
                    className={`p-4 rounded-xl text-center transition-all ${
                      caseData.symptoms.includes(symptom.id)
                        ? "bg-teal-100 border-2 border-teal-500"
                        : "bg-slate-50 border-2 border-transparent hover:border-slate-300"
                    }`}
                  >
                    <span className="text-3xl block mb-2">{symptom.icon}</span>
                    <p className="text-sm font-medium text-foreground">
                      {symptom.labelEn}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {symptom.labelHi}
                    </p>
                  </button>
                ))}
              </div>
              {/* Voice Input Button */}
              <div className="mt-6 text-center">
                <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-teal-600 text-white font-semibold hover:bg-teal-700">
                  <Mic className="h-5 w-5" />
                  बोलें / Speak
                </button>
              </div>
            </Card>
          )}

          {/* STEP 4: Risk Factors */}
          {currentStep === 4 && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Risk Factors
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {riskFactors.map((factor) => (
                  <button
                    key={factor.id}
                    onClick={() => toggleRiskFactor(factor.id)}
                    className={`p-4 rounded-xl text-center transition-all ${
                      caseData.riskFactors.includes(factor.id)
                        ? "bg-amber-100 border-2 border-amber-500"
                        : "bg-slate-50 border-2 border-transparent hover:border-slate-300"
                    }`}
                  >
                    <p className="text-sm font-medium text-foreground">
                      {factor.label}
                    </p>
                  </button>
                ))}
              </div>
            </Card>
          )}

          {/* STEP 5: AI Reasoning Trace */}
          {currentStep === 5 && (
            <Card className="bg-[#0F172A] text-white p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Brain className="h-6 w-6 text-teal-400" />
                  <h3 className="text-lg font-semibold">
                    AI Clinical Reasoning — Powered by Amazon Bedrock
                  </h3>
                </div>
                <LivePulse active color="teal" />
              </div>
              <div className="font-mono text-sm space-y-4">
                <div className="border border-slate-700 rounded-lg p-4">
                  <p className="text-slate-400 text-xs mb-2">
                    CLINICAL REASONING ENGINE — SwasthyaOS Bedrock v2.1
                  </p>
                  <p className="text-slate-400 text-xs">
                    Model: Claude 3 Sonnet | Temp: 0.1 | MOHFW Protocol
                  </p>
                </div>
                {[
                  {
                    step: 1,
                    title: "Comprehend Medical",
                    content: `Detected: ${
                      caseData.symptoms.length
                    } symptom(s)\nSeverity: ${
                      caseData.vitals.spo2 < 94 ? "HIGH" : "MODERATE"
                    }`,
                  },
                  {
                    step: 2,
                    title: "Bedrock Pattern Match",
                    content:
                      "Pattern: Fever + Respiratory → ARI/Pneumonia\nDifferential: CAP (72%), TB (15%), Other (13%)",
                  },
                  {
                    step: 3,
                    title: "Risk Stratification",
                    content: `${
                      caseData.riskFactors.length > 0
                        ? "HIGH RISK factors present"
                        : "LOW RISK"
                    }\nMOHFW ARI Protocol: Severity Class ${
                      caseData.vitals.spo2 < 94 ? "III" : "II"
                    }`,
                  },
                  {
                    step: 4,
                    title: "Guideline Lookup",
                    content:
                      "MOHFW IMNCI Protocol 4.2 matched\nASHA referral criteria evaluation...",
                  },
                  {
                    step: 5,
                    title: "Decision",
                    content:
                      caseData.vitals.spo2 < 94
                        ? "→ REFER TO PHC — URGENT\nConfidence: 91% | Override available"
                        : "→ TREAT LOCALLY\nConfidence: 84% | Monitor recommended",
                  },
                ].map((item, i) => (
                  <div
                    key={item.step}
                    className="animate-in slide-in-from-left"
                    style={{ animationDelay: `${i * 300}ms` }}
                  >
                    <div className="flex items-center gap-2 text-teal-400 mb-1">
                      <span>STEP {item.step}</span>
                      <span>[{item.title}]</span>
                      <CheckCircle className="h-4 w-4" />
                    </div>
                    <pre className="text-slate-300 whitespace-pre-line pl-4 border-l-2 border-slate-700">
                      {item.content}
                    </pre>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* STEP 6: Decision Output */}
          {currentStep === 6 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                Decision Output
              </h3>
              <div className="grid gap-4 md:grid-cols-3">
                {/* Treat Locally */}
                <Card
                  className={`p-6 cursor-pointer transition-all ${
                    caseData.vitals.spo2 >= 94
                      ? "ring-2 ring-green-500 bg-green-50"
                      : "opacity-60"
                  }`}
                >
                  <div className="text-center">
                    <span className="text-4xl mb-3 block">🟢</span>
                    <h4 className="font-bold text-green-700 text-lg">
                      TREAT LOCALLY
                    </h4>
                    <p className="text-sm text-green-600 mt-2">
                      Mild cases — protocol listed
                    </p>
                  </div>
                </Card>
                {/* Refer to PHC */}
                <Card
                  className={`p-6 cursor-pointer transition-all ${
                    caseData.vitals.spo2 < 94 && caseData.vitals.spo2 > 0
                      ? "ring-2 ring-amber-500 bg-amber-50 animate-pulse"
                      : "opacity-60"
                  }`}
                >
                  <div className="text-center">
                    <span className="text-4xl mb-3 block">🟡</span>
                    <h4 className="font-bold text-amber-700 text-lg">
                      REFER TO PHC
                    </h4>
                    <p className="text-sm text-amber-600 mt-2">
                      SpO2 &lt;94% + Elderly + Diabetes
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Target: PHC Nagpur Central (3.2 km)
                    </p>
                    {caseData.vitals.spo2 < 94 && caseData.vitals.spo2 > 0 && (
                      <Button
                        className="mt-4 w-full"
                        onClick={() => setShowReferralSlip(true)}
                      >
                        Generate Referral Slip
                      </Button>
                    )}
                  </div>
                </Card>
                {/* Emergency */}
                <Card className="p-6 cursor-pointer opacity-60">
                  <div className="text-center">
                    <span className="text-4xl mb-3 block">🔴</span>
                    <h4 className="font-bold text-red-700 text-lg">
                      EMERGENCY
                    </h4>
                    <p className="text-sm text-red-600 mt-2">
                      Life-threatening — call 108
                    </p>
                    <Button
                      variant="outline"
                      className="mt-4 w-full text-red-600 border-red-200"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call Ambulance
                    </Button>
                  </div>
                </Card>
              </div>
              <button className="text-sm text-muted-foreground hover:text-foreground">
                Doctor Override — Change Decision →
              </button>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={() =>
                setCurrentStep((prev) => Math.max(1, prev - 1) as Step)
              }
              disabled={currentStep === 1}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <Button
              onClick={() =>
                setCurrentStep((prev) => Math.min(6, prev + 1) as Step)
              }
              disabled={currentStep === 6 || !canProceed()}
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Right: AI Reasoning Summary */}
        <div className="space-y-4">
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="h-5 w-5 text-teal-600" />
              <h4 className="font-semibold text-foreground">
                AI Reasoning Trace
              </h4>
            </div>
            <div className="space-y-3">
              {["Symptom Analysis", "Vital Sign Check", "Decision Logic"].map(
                (step, i) => (
                  <div key={step} className="flex items-start gap-3">
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        currentStep > i + 3
                          ? "bg-teal-600 text-white"
                          : "bg-slate-200 text-slate-500"
                      }`}
                    >
                      {i + 1}
                    </div>
                    <div>
                      <p
                        className={`text-sm font-semibold ${
                          currentStep > i + 3
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {step}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {currentStep > i + 3 ? "Completed" : "Pending"}
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          </Card>

          {currentStep >= 5 && (
            <Card className="p-4 bg-teal-50 border-teal-200">
              <p className="text-xs font-semibold text-teal-700 mb-2">
                MODEL CONFIDENCE
              </p>
              <div className="flex items-center gap-3">
                <ConfidenceRing score={0.87} size="md" />
                <div>
                  <p className="text-sm font-semibold text-foreground">87%</p>
                  <p className="text-xs text-muted-foreground">
                    Decision confidence
                  </p>
                </div>
              </div>
            </Card>
          )}

          <Card className="p-4 bg-slate-50">
            <p className="text-xs font-semibold text-muted-foreground mb-2">
              DATA QUALITY
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Input Complete</span>
                <span
                  className={
                    currentStep >= 4
                      ? "text-green-600 font-semibold"
                      : "text-muted-foreground"
                  }
                >
                  {currentStep >= 4 ? "✓ Yes" : "Incomplete"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Vital Signs</span>
                <span
                  className={
                    caseData.vitals.temperature > 0
                      ? "text-green-600 font-semibold"
                      : "text-muted-foreground"
                  }
                >
                  {caseData.vitals.temperature > 0 ? "✓ Recorded" : "Pending"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Symptoms</span>
                <span
                  className={
                    caseData.symptoms.length > 0
                      ? "text-green-600 font-semibold"
                      : "text-muted-foreground"
                  }
                >
                  {caseData.symptoms.length > 0
                    ? `✓ ${caseData.symptoms.length}`
                    : "None"}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Referral Slip Modal */}
      {showReferralSlip && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-lg p-6 bg-white">
            <h3 className="text-lg font-bold text-foreground mb-4">
              Referral Slip Generated
            </h3>
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 mb-4">
              <div className="text-center mb-4">
                <p className="font-bold text-foreground">SwasthyaOS Referral</p>
                <p className="text-xs text-muted-foreground">
                  AarogyaPath Decision Support
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                <div>
                  <span className="text-muted-foreground">Age/Sex:</span>{" "}
                  {caseData.patient.age}/{caseData.patient.sex}
                </div>
                <div>
                  <span className="text-muted-foreground">Village:</span>{" "}
                  {caseData.patient.village}
                </div>
                <div>
                  <span className="text-muted-foreground">SpO2:</span>{" "}
                  {caseData.vitals.spo2}%
                </div>
                <div>
                  <span className="text-muted-foreground">Temp:</span>{" "}
                  {caseData.vitals.temperature}°C
                </div>
              </div>
              <div className="text-sm mb-4">
                <p className="font-semibold text-amber-700">
                  Reason: SpO2 &lt;94% + Risk Factors
                </p>
                <p className="text-muted-foreground">Triage: AMBER (Urgent)</p>
              </div>
              <div className="flex justify-center">
                <div className="h-24 w-24 bg-slate-200 rounded-lg flex items-center justify-center">
                  <QrCode className="h-12 w-12 text-slate-400" />
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowReferralSlip(false)}
              >
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Button variant="outline" className="flex-1">
                <Share2 className="h-4 w-4 mr-2" />
                WhatsApp
              </Button>
              <Button onClick={() => setShowReferralSlip(false)}>Close</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
