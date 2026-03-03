"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  CheckCircle,
  X,
  Clock,
  Hash,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from "lucide-react";
import { AWSBadge } from "@/components/ui/aws-badge";
import { ConfidenceRing } from "@/components/ui/confidence-ring";
import { Button } from "@/components/ui/button";

interface DecisionLog {
  id: string;
  timestamp: string;
  clinician: string;
  recommendation: string;
  confidence: number;
  decision: "accepted" | "rejected" | "modified";
  patientId: string;
  patientUhid: string;
  modelVersion: string;
  latencyMs: number;
  sha256Hash: string;
  inputTokens: number;
  outputTokens: number;
}

export function AIDecisionLogs() {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const logs: DecisionLog[] = [
    {
      id: "D-2401",
      timestamp: "2024-01-24 14:23:45",
      clinician: "Dr. Rajesh Kumar",
      recommendation:
        "Azithromycin 500mg OD x 3 days for acute respiratory infection",
      confidence: 92,
      decision: "accepted",
      patientId: "P-2402",
      patientUhid: "UHID-MH-2024-004521",
      modelVersion: "claude-3-sonnet-20240229",
      latencyMs: 847,
      sha256Hash:
        "a7ffc6f8bf1ed76651c14756a061d662f580ff4de43b49fa82d80a4b80f8434a",
      inputTokens: 2341,
      outputTokens: 456,
    },
    {
      id: "D-2402",
      timestamp: "2024-01-24 12:45:12",
      clinician: "ASHA Priya",
      recommendation:
        "Refer to PHC for elevated fever (39.2°C) with dehydration signs",
      confidence: 88,
      decision: "accepted",
      patientId: "P-2405",
      patientUhid: "UHID-RJ-2024-008934",
      modelVersion: "claude-3-sonnet-20240229",
      latencyMs: 623,
      sha256Hash:
        "b9a7c8d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2",
      inputTokens: 1892,
      outputTokens: 312,
    },
    {
      id: "D-2403",
      timestamp: "2024-01-24 11:12:33",
      clinician: "Dr. Priya Sharma",
      recommendation: "CT scan for suspected pneumonia with consolidation",
      confidence: 75,
      decision: "modified",
      patientId: "P-2403",
      patientUhid: "UHID-DL-2024-002145",
      modelVersion: "claude-3-sonnet-20240229",
      latencyMs: 1023,
      sha256Hash:
        "c8d9e0f1g2h3i4j5k6l7m8n9o0p1q2r3s4t5u6v7w8x9y0z1a2b3c4d5e6f7g8h9",
      inputTokens: 3124,
      outputTokens: 534,
    },
    {
      id: "D-2404",
      timestamp: "2024-01-24 09:30:18",
      clinician: "Dr. Ajit Singh",
      recommendation: "Paracetamol 500mg SOS for fever management",
      confidence: 85,
      decision: "accepted",
      patientId: "P-2401",
      patientUhid: "UHID-KA-2024-006723",
      modelVersion: "claude-3-sonnet-20240229",
      latencyMs: 534,
      sha256Hash:
        "d9e0f1g2h3i4j5k6l7m8n9o0p1q2r3s4t5u6v7w8x9y0z1a2b3c4d5e6f7g8h9i0",
      inputTokens: 1567,
      outputTokens: 289,
    },
    {
      id: "D-2405",
      timestamp: "2024-01-24 08:15:02",
      clinician: "ANM Rajini",
      recommendation: "Emergency ambulance dispatch - suspected eclampsia",
      confidence: 95,
      decision: "accepted",
      patientId: "P-2404",
      patientUhid: "UHID-TN-2024-009876",
      modelVersion: "claude-3-sonnet-20240229",
      latencyMs: 412,
      sha256Hash:
        "e0f1g2h3i4j5k6l7m8n9o0p1q2r3s4t5u6v7w8x9y0z1a2b3c4d5e6f7g8h9i0j1",
      inputTokens: 2089,
      outputTokens: 378,
    },
  ];

  const decisionConfig = {
    accepted: {
      icon: CheckCircle,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
      label: "Accepted",
    },
    rejected: {
      icon: X,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      label: "Rejected",
    },
    modified: {
      icon: Clock,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
      label: "Modified",
    },
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">
          AI Recommendation History
        </h3>
        <AWSBadge service="Bedrock" model="Claude 3 Sonnet" status="active" />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left font-semibold text-muted-foreground p-3 w-8"></th>
              <th className="text-left font-semibold text-muted-foreground p-3">
                Timestamp
              </th>
              <th className="text-left font-semibold text-muted-foreground p-3">
                Clinician / Patient
              </th>
              <th className="text-left font-semibold text-muted-foreground p-3">
                Recommendation
              </th>
              <th className="text-left font-semibold text-muted-foreground p-3">
                Confidence
              </th>
              <th className="text-left font-semibold text-muted-foreground p-3">
                Decision
              </th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => {
              const config = decisionConfig[log.decision];
              const Icon = config.icon;
              const isExpanded = expandedRow === log.id;

              return (
                <React.Fragment key={log.id}>
                  <tr
                    className={`border-b border-border hover:bg-muted/50 cursor-pointer ${
                      isExpanded ? "bg-muted/30" : ""
                    }`}
                    onClick={() => setExpandedRow(isExpanded ? null : log.id)}
                  >
                    <td className="p-3">
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      )}
                    </td>
                    <td className="p-3 text-xs text-muted-foreground font-mono">
                      {log.timestamp}
                    </td>
                    <td className="p-3">
                      <div>
                        <p className="font-medium text-foreground">
                          {log.clinician}
                        </p>
                        <p className="text-xs text-muted-foreground font-mono">
                          {log.patientUhid}
                        </p>
                      </div>
                    </td>
                    <td className="p-3 text-foreground max-w-xs">
                      {log.recommendation}
                    </td>
                    <td className="p-3">
                      <ConfidenceRing score={log.confidence} size="sm" />
                    </td>
                    <td className="p-3">
                      <div
                        className={`flex items-center gap-1 ${config.color}`}
                      >
                        <Icon className="h-4 w-4" />
                        <span className="font-semibold text-xs">
                          {config.label}
                        </span>
                      </div>
                    </td>
                  </tr>

                  {/* Expanded Row - Audit Details */}
                  {isExpanded && (
                    <tr className="bg-slate-50 dark:bg-slate-900/50">
                      <td colSpan={6} className="p-4">
                        <div className="space-y-4">
                          {/* SHA-256 Hash */}
                          <div className="flex items-center gap-3 p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
                            <Hash className="h-4 w-4 text-teal-600 flex-shrink-0" />
                            <div className="flex-1">
                              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                                Immutable Record Hash (SHA-256)
                              </p>
                              <p className="font-mono text-xs text-teal-600 mt-1 break-all">
                                {log.sha256Hash}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 text-xs"
                            >
                              <ExternalLink className="h-3 w-3 mr-1" /> Verify
                            </Button>
                          </div>

                          {/* Model Details Grid */}
                          <div className="grid grid-cols-4 gap-4">
                            <div className="p-3 bg-muted/50 rounded-lg">
                              <p className="text-xs font-semibold text-muted-foreground">
                                MODEL VERSION
                              </p>
                              <p className="text-xs font-mono text-foreground mt-1">
                                {log.modelVersion}
                              </p>
                            </div>
                            <div className="p-3 bg-muted/50 rounded-lg">
                              <p className="text-xs font-semibold text-muted-foreground">
                                LATENCY
                              </p>
                              <p className="text-sm font-bold text-foreground mt-1">
                                {log.latencyMs}ms
                              </p>
                            </div>
                            <div className="p-3 bg-muted/50 rounded-lg">
                              <p className="text-xs font-semibold text-muted-foreground">
                                INPUT TOKENS
                              </p>
                              <p className="text-sm font-bold text-foreground mt-1">
                                {log.inputTokens.toLocaleString()}
                              </p>
                            </div>
                            <div className="p-3 bg-muted/50 rounded-lg">
                              <p className="text-xs font-semibold text-muted-foreground">
                                OUTPUT TOKENS
                              </p>
                              <p className="text-sm font-bold text-foreground mt-1">
                                {log.outputTokens.toLocaleString()}
                              </p>
                            </div>
                          </div>

                          {/* AWS Services Used */}
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">
                              Services:
                            </span>
                            <AWSBadge
                              service="Bedrock"
                              latency={log.latencyMs}
                              status="active"
                            />
                            <AWSBadge service="HealthLake" status="active" />
                            <AWSBadge service="CloudTrail" status="active" />
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="mt-6 pt-6 border-t border-border grid grid-cols-4 gap-4">
        <div>
          <p className="text-xs font-semibold text-muted-foreground">
            TOTAL DECISIONS
          </p>
          <p className="text-2xl font-bold text-foreground mt-1">
            {logs.length}
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold text-muted-foreground">
            ACCEPTANCE RATE
          </p>
          <p className="text-2xl font-bold text-emerald-500 mt-1">
            {Math.round(
              (logs.filter((l) => l.decision === "accepted").length /
                logs.length) *
                100
            )}
            %
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold text-muted-foreground">
            AVG CONFIDENCE
          </p>
          <p className="text-2xl font-bold text-teal-600 mt-1">
            {Math.round(
              logs.reduce((sum, l) => sum + l.confidence, 0) / logs.length
            )}
            %
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold text-muted-foreground">
            AVG LATENCY
          </p>
          <p className="text-2xl font-bold text-foreground mt-1">
            {Math.round(
              logs.reduce((sum, l) => sum + l.latencyMs, 0) / logs.length
            )}
            ms
          </p>
        </div>
      </div>
    </Card>
  );
}
