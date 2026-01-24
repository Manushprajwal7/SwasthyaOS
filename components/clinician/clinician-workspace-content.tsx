'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LiveConsultationView } from './live-consultation-view';
import { DischargeSummaryView } from './discharge-summary-view';

export function ClinicianWorkspaceContent() {
  const [activeTab, setActiveTab] = useState('consultation');

  return (
    <div className="space-y-6 p-8">
      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground">Clinician Workspace</h1>
        <p className="mt-2 text-muted-foreground">
          Unified clinical documentation with AI-powered decision support
        </p>
      </div>

      {/* Workspace Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="consultation">Live Consultation</TabsTrigger>
          <TabsTrigger value="discharge">Discharge Summary</TabsTrigger>
        </TabsList>

        {/* Live Consultation Tab */}
        <TabsContent value="consultation" className="mt-6 space-y-6">
          <LiveConsultationView />
        </TabsContent>

        {/* Discharge Summary Tab */}
        <TabsContent value="discharge" className="mt-6 space-y-6">
          <DischargeSummaryView />
        </TabsContent>
      </Tabs>
    </div>
  );
}
