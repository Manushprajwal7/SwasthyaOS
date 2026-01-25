"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LiveConsultationView } from "./live-consultation-view";
import { DischargeSummaryView } from "./discharge-summary-view";
import { AIDiagnosisAssistant } from "./ai-diagnosis-assistant";
import { useLanguage } from "@/contexts/language-context";

export function ClinicianWorkspaceContent() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("consultation");

  return (
    <div className="space-y-6 p-8">
      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground">
          {t("clinician.title")}
        </h1>
        <p className="mt-2 text-muted-foreground">{t("clinician.subtitle")}</p>
      </div>

      {/* Workspace Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-2xl grid-cols-3">
          <TabsTrigger value="consultation">
            {t("clinician.consultation.live")}
          </TabsTrigger>
          <TabsTrigger value="ai-assistant">AI Assistant</TabsTrigger>
          <TabsTrigger value="discharge">
            {t("clinician.discharge.summary")}
          </TabsTrigger>
        </TabsList>

        {/* Live Consultation Tab */}
        <TabsContent value="consultation" className="mt-6 space-y-6">
          <LiveConsultationView />
        </TabsContent>

        {/* AI Assistant Tab */}
        <TabsContent value="ai-assistant" className="mt-6 space-y-6">
          <AIDiagnosisAssistant />
        </TabsContent>

        {/* Discharge Summary Tab */}
        <TabsContent value="discharge" className="mt-6 space-y-6">
          <DischargeSummaryView />
        </TabsContent>
      </Tabs>
    </div>
  );
}
