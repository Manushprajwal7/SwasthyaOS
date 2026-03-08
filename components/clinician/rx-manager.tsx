"use client";

import React, { useState } from "react";
import {
  Search,
  Plus,
  AlertTriangle,
  CheckCircle,
  Trash2,
  Info,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AWSBadge } from "@/components/ui/aws-badge";
import { ConfidenceRing } from "@/components/ui/confidence-ring";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/language-context";

interface Medication {
  id: string;
  drug: string;
  dose: string;
  frequency: string;
  duration: string;
  route: string;
  interaction: "clear" | "monitor" | "warning";
  pmjayCovered: boolean;
}

const mockMedications: Medication[] = [
  {
    id: "1",
    drug: "Amoxicillin-Clavulanate",
    dose: "625mg",
    frequency: "BD",
    duration: "7 days",
    route: "Oral",
    interaction: "clear",
    pmjayCovered: true,
  },
  {
    id: "2",
    drug: "Paracetamol",
    dose: "500mg",
    frequency: "TDS PRN",
    duration: "5 days",
    route: "Oral",
    interaction: "clear",
    pmjayCovered: true,
  },
  {
    id: "3",
    drug: "Metformin HCl",
    dose: "500mg",
    frequency: "BD",
    duration: "Continued",
    route: "Oral",
    interaction: "monitor",
    pmjayCovered: true,
  },
];

const drugSuggestions = [
  "Azithromycin 500mg",
  "Amlodipine 5mg",
  "Pantoprazole 40mg",
  "Salbutamol 100mcg inhaler",
  "ORS (WHO formula)",
];

export function RxManager() {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [medications, setMedications] = useState<Medication[]>(mockMedications);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleAddDrug = (drugName: string) => {
    const newMed: Medication = {
      id: Date.now().toString(),
      drug: drugName,
      dose: "Custom",
      frequency: "OD",
      duration: "5 days",
      route: "Oral",
      interaction: "clear",
      pmjayCovered: true,
    };
    setMedications([...medications, newMed]);
    setSearchQuery("");
    setShowSuggestions(false);
    toast({
      title: "Medication Added",
      description: `${drugName} added to the prescription.`,
    });
  };

  const handleRemoveDrug = (id: string, drugName: string) => {
    setMedications(medications.filter((m) => m.id !== id));
    toast({
      title: "Medication Removed",
      description: `${drugName} removed from the prescription.`,
      variant: "destructive",
    });
  };

  const interactionConfig = {
    clear: { icon: CheckCircle, color: "text-green-600", label: `✅ ${t("common.good")}` },
    monitor: {
      icon: AlertTriangle,
      color: "text-amber-600",
      label: `⚠️ ${t("common.fair")}`,
    },
    warning: {
      icon: AlertTriangle,
      color: "text-red-600",
      label: `❌ ${t("common.poor")}`,
    },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{t("clinician.rx.title")}</h3>
          <p className="text-sm text-muted-foreground">
            {t("clinician.rx.subtitle")}
          </p>
        </div>
        <AWSBadge service="Amazon Comprehend Medical" />
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left: Prescription Builder */}
        <div className="lg:col-span-8 space-y-4 min-w-0">
          {/* Search/Add Drug */}
          <Card className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder={t("clinician.rx.search")}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(e.target.value.length > 0);
                }}
                onFocus={() => setShowSuggestions(searchQuery.length > 0)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />

              {/* Auto-complete Dropdown */}
              {showSuggestions && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-10">
                  {drugSuggestions
                    .filter((d) =>
                      d.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((drug) => (
                      <button
                        key={drug}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50"
                        onClick={() => handleAddDrug(drug)}
                      >
                        <Plus className="inline h-3 w-3 mr-2 text-teal-600" />
                        {drug}
                      </button>
                    ))}
                </div>
              )}
            </div>
          </Card>

          {/* Active Prescriptions Table */}
          <Card className="p-4">
            <h4 className="font-semibold text-foreground mb-4">
              {t("clinician.rx.active")}
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-2 text-muted-foreground font-medium">
                      {t("clinician.rx.drug")}
                    </th>
                    <th className="text-left py-2 text-muted-foreground font-medium">
                      {t("clinician.rx.dose")}
                    </th>
                    <th className="text-left py-2 text-muted-foreground font-medium">
                      {t("clinician.rx.frequency")}
                    </th>
                    <th className="text-left py-2 text-muted-foreground font-medium">
                      {t("clinician.rx.duration")}
                    </th>
                    <th className="text-left py-2 text-muted-foreground font-medium">
                      {t("clinician.rx.route")}
                    </th>
                    <th className="text-left py-2 text-muted-foreground font-medium">
                      {t("clinician.rx.interaction")}
                    </th>
                    <th className="text-left py-2 text-muted-foreground font-medium">
                      {t("clinician.rx.pmjay")}
                    </th>
                    <th className="py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {medications.map((med) => {
                    const interaction = interactionConfig[med.interaction];
                    return (
                      <tr
                        key={med.id}
                        className="border-b border-slate-100 hover:bg-slate-50"
                      >
                        <td className="py-3 font-medium text-foreground">
                          {med.drug}
                        </td>
                        <td className="py-3 font-mono text-foreground">
                          {med.dose}
                        </td>
                        <td className="py-3 text-foreground">
                          {med.frequency}
                        </td>
                        <td className="py-3 text-foreground">{med.duration}</td>
                        <td className="py-3 text-foreground">{med.route}</td>
                        <td className="py-3">
                          <span className={interaction.color}>
                            {interaction.label}
                          </span>
                        </td>
                        <td className="py-3">
                          {med.pmjayCovered ? (
                            <span className="text-green-600">✅ {t("clinician.rx.covered")}</span>
                          ) : (
                            <span className="text-red-600">❌ {t("clinician.rx.not_covered")}</span>
                          )}
                        </td>
                        <td className="py-3">
                          <button 
                            className="text-slate-400 hover:text-red-600"
                            onClick={() => handleRemoveDrug(med.id, med.drug)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Generic Substitute Notice */}
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-blue-600 mt-0.5" />
                <p className="text-xs text-blue-700">
                  {t("clinician.rx.generic_notice")}
                </p>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
           <div className="flex gap-3">
            <Button className="flex-1" onClick={() => toast({ title: "Prescription Saved", description: "Rx has been signed and saved to patient record." })}>
              <CheckCircle className="h-4 w-4 mr-2" />
              {t("clinician.rx.save")}
            </Button>
            <Button variant="outline" onClick={() => window.print()}>{t("clinician.rx.print")}</Button>
          </div>
        </div>

        {/* Right: Drug Interaction Panel */}
        <div className="lg:col-span-4 space-y-4 min-w-0">
          <Card className="p-4">
             <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-foreground">
                {t("clinician.rx.interaction_check")}
              </h4>
              <AWSBadge service="Comprehend Medical" />
            </div>

            <div className="space-y-4">
              {/* Interaction Alert */}
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-amber-800">
                      Metformin + Amoxicillin
                    </p>
                    <p className="text-xs text-amber-700 mt-1">
                      Low interaction risk — monitor renal function
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <ConfidenceRing score={0.78} size="sm" />
                  <span className="text-xs text-muted-foreground">
                    Source: MOHFW Drug Interaction DB
                  </span>
                </div>
              </div>

              {/* All Clear */}
               <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <p className="text-sm font-medium text-green-800">
                    {t("clinician.rx.no_interaction")}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* PMJAY Formulary Status */}
           <Card className="p-4">
            <h4 className="font-semibold text-foreground mb-3">
              {t("clinician.rx.pmjay_status")}
            </h4>
            <div className="space-y-2">
               <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {t("clinician.rx.pmjay_covered_count")}
                </span>
                <span className="font-semibold text-green-600">3/3</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{t("clinician.rx.total_value")}</span>
                <span className="font-semibold text-foreground">₹245.00</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{t("clinician.rx.patient_pays")}</span>
                <span className="font-semibold text-green-600">₹0.00</span>
              </div>
            </div>
          </Card>

          {/* Pediatric Dose Calculator Toggle */}
           <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">
                  {t("clinician.rx.pediatric")}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t("clinician.rx.weight_based")}
                </p>
              </div>
              <button 
                className="px-3 py-1.5 text-xs font-medium text-teal-600 border border-teal-200 rounded-lg hover:bg-teal-50"
                onClick={() => toast({ title: "Calculator Enabled", description: "Pediatric dose calculator activated." })}
              >
                {t("clinician.rx.enable")}
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
