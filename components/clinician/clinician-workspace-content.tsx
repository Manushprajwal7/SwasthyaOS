"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ConsultationTab } from "./consultation-tab";
import { SoapTab } from "./soap-tab";
import { DischargeTab } from "./discharge-tab";
import { RxTab } from "./rx-tab";
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
} from "lucide-react";

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
  const [activeTab, setActiveTab] = useState("consultation");

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-full">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fade-in-up">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground font-heading">
            {t("clinician.title")}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("clinician.subtitle")}
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

      {/* ===== Workspace Tabs ===== */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full animate-fade-in-up"
        style={{ animationDelay: "0.1s" }}
      >
        <TabsList className="inline-flex h-11 items-center justify-start gap-1 rounded-xl bg-slate-100 dark:bg-slate-800/50 p-1">
          <TabsTrigger
            value="consultation"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-teal-700 dark:data-[state=active]:text-teal-400 data-[state=active]:shadow-sm transition-all"
          >
            <Stethoscope className="h-4 w-4" />
            {t("clinician.consultation.live")}
          </TabsTrigger>
          <TabsTrigger
            value="soap"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-teal-700 dark:data-[state=active]:text-teal-400 data-[state=active]:shadow-sm transition-all"
          >
            <ClipboardList className="h-4 w-4" />
            SOAP Builder
          </TabsTrigger>
          <TabsTrigger
            value="discharge"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-teal-700 dark:data-[state=active]:text-teal-400 data-[state=active]:shadow-sm transition-all"
          >
            <FileText className="h-4 w-4" />
            {t("clinician.discharge.summary")}
          </TabsTrigger>
          <TabsTrigger
            value="rx"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-teal-700 dark:data-[state=active]:text-teal-400 data-[state=active]:shadow-sm transition-all"
          >
            <Pill className="h-4 w-4" />
            Rx Manager
          </TabsTrigger>
        </TabsList>

        {/* Live Consultation Tab */}
        <TabsContent value="consultation" className="mt-6 space-y-6">
          <ConsultationTab />
        </TabsContent>

        {/* SOAP Builder Tab */}
        <TabsContent value="soap" className="mt-6 space-y-6">
          <SoapTab />
        </TabsContent>

        {/* Discharge Summary Tab */}
        <TabsContent value="discharge" className="mt-6 space-y-6">
          <DischargeTab />
        </TabsContent>

        {/* Rx Manager Tab */}
        <TabsContent value="rx" className="mt-6 space-y-6">
          <RxTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
