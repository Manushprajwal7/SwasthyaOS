'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { AIDecisionLogs } from './ai-decision-logs';
import { ConfidenceDistribution } from './confidence-distribution';
import { OverrideHistory } from './override-history';
import { DataAnonymization } from './data-anonymization';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function AuditContent() {
  const [activeTab, setActiveTab] = useState('decisions');

  return (
    <div className="space-y-6 p-8">
      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground">
          Audit & Responsible AI Panel
        </h1>
        <p className="mt-2 text-muted-foreground">
          Transparency dashboard for healthcare governance and regulatory compliance
        </p>
      </div>

      {/* System Health Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-6">
          <p className="text-xs font-semibold text-muted-foreground mb-2">
            TOTAL RECOMMENDATIONS
          </p>
          <p className="text-3xl font-bold text-foreground">847</p>
          <p className="text-xs text-muted-foreground mt-1">This month</p>
        </Card>
        <Card className="p-6">
          <p className="text-xs font-semibold text-muted-foreground mb-2">
            ACCEPTED
          </p>
          <p className="text-3xl font-bold text-success">742</p>
          <p className="text-xs text-muted-foreground mt-1">87.6% acceptance rate</p>
        </Card>
        <Card className="p-6">
          <p className="text-xs font-semibold text-muted-foreground mb-2">
            OVERRIDDEN
          </p>
          <p className="text-3xl font-bold text-warning">105</p>
          <p className="text-xs text-muted-foreground mt-1">12.4% override rate</p>
        </Card>
        <Card className="p-6">
          <p className="text-xs font-semibold text-muted-foreground mb-2">
            AVG CONFIDENCE
          </p>
          <p className="text-3xl font-bold text-primary">89.2%</p>
          <p className="text-xs text-muted-foreground mt-1">Model average</p>
        </Card>
      </div>

      {/* Tabbed Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-2xl grid-cols-4">
          <TabsTrigger value="decisions">AI Decision Logs</TabsTrigger>
          <TabsTrigger value="confidence">Confidence Analysis</TabsTrigger>
          <TabsTrigger value="overrides">Human Overrides</TabsTrigger>
          <TabsTrigger value="anonymization">Data Security</TabsTrigger>
        </TabsList>

        {/* AI Decision Logs */}
        <TabsContent value="decisions" className="mt-6">
          <AIDecisionLogs />
        </TabsContent>

        {/* Confidence Distribution */}
        <TabsContent value="confidence" className="mt-6">
          <ConfidenceDistribution />
        </TabsContent>

        {/* Override History */}
        <TabsContent value="overrides" className="mt-6">
          <OverrideHistory />
        </TabsContent>

        {/* Data Anonymization */}
        <TabsContent value="anonymization" className="mt-6">
          <DataAnonymization />
        </TabsContent>
      </Tabs>

      {/* Compliance Statement */}
      <Card className="bg-primary/5 border-primary/20 p-8 border-l-4 border-l-primary">
        <h3 className="font-bold text-foreground text-lg mb-3">
          Regulatory Compliance Status
        </h3>
        <div className="space-y-3 text-sm text-foreground leading-relaxed">
          <p>
            <strong>✓ ISO 13485:</strong> Medical device quality management certified
          </p>
          <p>
            <strong>✓ HIPAA Compliance:</strong> All patient data encrypted and de-identified
          </p>
          <p>
            <strong>✓ NITI Aayog Standards:</strong> Aligned with India's health AI governance
          </p>
          <p>
            <strong>✓ WHO Guidelines:</strong> Decision transparency and human-in-the-loop design
          </p>
          <p>
            <strong>✓ Data Residency:</strong> All data stored within India's borders
          </p>
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          Last audit: 2024-01-15 | Certificate valid through 2025-01-15
        </p>
      </Card>
    </div>
  );
}
