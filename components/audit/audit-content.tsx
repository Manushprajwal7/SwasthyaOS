"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { AIDecisionLogs } from "./ai-decision-logs";
import { ConfidenceDistribution } from "./confidence-distribution";
import { OverrideHistory } from "./override-history";
import { DataAnonymization } from "./data-anonymization";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AWSBadge } from "@/components/ui/aws-badge";
import { ConfidenceRing } from "@/components/ui/confidence-ring";
import { LivePulse } from "@/components/ui/live-pulse";
import {
  Shield,
  FileText,
  Lock,
  Hash,
  Database,
  Eye,
  Clock,
  CheckCircle,
} from "lucide-react";

export function AuditContent() {
  const [activeTab, setActiveTab] = useState("decisions");

  // Mock SHA-256 hash for current audit state
  const currentAuditHash =
    "e3b0c44298fc1c149afbf4c8996fb924...27ae41e4649b934ca495991b7852b855";
  const lastBlockTimestamp = "2024-01-24T14:32:18Z";

  return (
    <div className="space-y-6 p-8">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-bold text-foreground">
              Audit & Responsible AI Panel
            </h1>
            <LivePulse size="sm" color="green" />
            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
              Recording
            </span>
          </div>
          <p className="text-muted-foreground">
            Immutable transparency dashboard for healthcare governance · DPDP
            Act 2023 Compliant
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <AWSBadge service="CloudTrail" latency={45} status="active" />
          <AWSBadge service="HealthLake" model="FHIR R4" status="active" />
        </div>
      </div>

      {/* Immutable Audit Trail Hash */}
      <Card className="p-4 bg-slate-900 border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-teal-600/20">
              <Hash className="h-5 w-5 text-teal-400" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                Current Audit Block Hash (SHA-256)
              </p>
              <p className="font-mono text-sm text-teal-400 mt-1">
                {currentAuditHash}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500">Last block</p>
            <p className="text-xs font-mono text-slate-400">
              {lastBlockTimestamp}
            </p>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-slate-700 flex items-center gap-4 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <Lock className="h-3 w-3" /> KMS Encrypted
          </span>
          <span className="flex items-center gap-1">
            <Database className="h-3 w-3" /> ap-south-1 (Mumbai)
          </span>
          <span className="flex items-center gap-1">
            <FileText className="h-3 w-3" /> 847 decisions logged
          </span>
        </div>
      </Card>

      {/* System Health Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-muted-foreground">
              TOTAL RECOMMENDATIONS
            </p>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-3xl font-bold text-foreground">847</p>
          <p className="text-xs text-muted-foreground mt-1">This month</p>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-muted-foreground">
              ACCEPTED
            </p>
            <CheckCircle className="h-4 w-4 text-emerald-500" />
          </div>
          <p className="text-3xl font-bold text-emerald-500">742</p>
          <p className="text-xs text-muted-foreground mt-1">
            87.6% acceptance rate
          </p>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-muted-foreground">
              OVERRIDDEN
            </p>
            <Clock className="h-4 w-4 text-amber-500" />
          </div>
          <p className="text-3xl font-bold text-amber-500">105</p>
          <p className="text-xs text-muted-foreground mt-1">
            12.4% override rate
          </p>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-muted-foreground">
              AVG CONFIDENCE
            </p>
            <ConfidenceRing score={89} size="sm" showLabel={false} />
          </div>
          <p className="text-3xl font-bold text-teal-600">89.2%</p>
          <p className="text-xs text-muted-foreground mt-1">Claude 3 Sonnet</p>
        </Card>
      </div>

      {/* Model Card */}
      <Card className="p-6 border-slate-200 dark:border-slate-700">
        <div className="flex items-start justify-between mb-4">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <Shield className="h-5 w-5 text-teal-600" />
            Model Card · SwasthyaOS Clinical AI
          </h3>
          <AWSBadge service="Bedrock" model="Claude 3 Sonnet" status="active" />
        </div>
        <div className="grid md:grid-cols-3 gap-6 text-sm">
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-2">
              MODEL DETAILS
            </p>
            <ul className="space-y-1 text-foreground">
              <li>
                <span className="text-muted-foreground">Base:</span> Claude 3
                Sonnet
              </li>
              <li>
                <span className="text-muted-foreground">Version:</span>{" "}
                2024.01.15
              </li>
              <li>
                <span className="text-muted-foreground">Context:</span> 200K
                tokens
              </li>
              <li>
                <span className="text-muted-foreground">Training:</span> Medical
                literature + MOHFW guidelines
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-2">
              INTENDED USE
            </p>
            <ul className="space-y-1 text-foreground">
              <li>• Clinical decision support</li>
              <li>• Differential diagnosis assistance</li>
              <li>• Drug interaction screening</li>
              <li>• ASHA/ANM triage guidance</li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-2">
              LIMITATIONS
            </p>
            <ul className="space-y-1 text-foreground">
              <li>• Not for standalone diagnosis</li>
              <li>• Requires clinician oversight</li>
              <li>• Rare disease gaps</li>
              <li>• Regional language variations</li>
            </ul>
          </div>
        </div>
      </Card>

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

      {/* Compliance Statement - Updated for DPDP Act 2023 */}
      <Card className="bg-teal-50 dark:bg-teal-950/30 border-teal-200 dark:border-teal-800 p-8 border-l-4 border-l-teal-600">
        <div className="flex items-start justify-between mb-4">
          <h3 className="font-bold text-foreground text-lg">
            Regulatory Compliance Status
          </h3>
          <AWSBadge service="KMS" latency={12} status="active" />
        </div>
        <div className="grid md:grid-cols-2 gap-6 text-sm text-foreground leading-relaxed">
          <div className="space-y-3">
            <p className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-teal-600 flex-shrink-0" />
              <span>
                <strong>DPDP Act 2023:</strong> Full compliance with India's
                Digital Personal Data Protection Act
              </span>
            </p>
            <p className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-teal-600 flex-shrink-0" />
              <span>
                <strong>ISO 13485:</strong> Medical device quality management
                certified
              </span>
            </p>
            <p className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-teal-600 flex-shrink-0" />
              <span>
                <strong>ABDM Integration:</strong> Ayushman Bharat Digital
                Mission standards
              </span>
            </p>
          </div>
          <div className="space-y-3">
            <p className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-teal-600 flex-shrink-0" />
              <span>
                <strong>MOHFW Guidelines:</strong> Aligned with Ministry of
                Health protocols
              </span>
            </p>
            <p className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-teal-600 flex-shrink-0" />
              <span>
                <strong>Data Residency:</strong> All data stored in AWS
                ap-south-1 (Mumbai)
              </span>
            </p>
            <p className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-teal-600 flex-shrink-0" />
              <span>
                <strong>WHO AI Ethics:</strong> Human-in-the-loop decision
                framework
              </span>
            </p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-teal-200 dark:border-teal-800 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Last audit: 2024-01-15 | Certificate valid through 2025-01-15 |
            Auditor: STQC
          </p>
          <p className="text-xs font-mono text-teal-600">
            Audit ID: STQC-MED-2024-00847
          </p>
        </div>
      </Card>
    </div>
  );
}
