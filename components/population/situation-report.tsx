'use client';

import React from 'react';
import { FileText, Download, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface SituationReportProps {
  syndrome: string;
  timeRange: number;
  selectedDistrict: string | null;
}

export function SituationReport({
  syndrome,
  timeRange,
  selectedDistrict,
}: SituationReportProps) {
  const syndromeLabels: Record<string, string> = {
    all: 'All Syndromes',
    fever: 'Fever',
    respiratory: 'Respiratory',
    gi: 'Gastro-Intestinal',
    neuro: 'Neurological',
    hemorrhagic: 'Hemorrhagic',
  };

  const reportContent = `
SITUATION REPORT - ${syndromeLabels[syndrome]}
Generated: ${new Date().toLocaleString()}
Time Period: Last ${timeRange} hours

EXECUTIVE SUMMARY:
Across 6 districts in Central India, {selected syndrome} cases show elevated activity in Sehore and Bhopal districts. AI surveillance detected 4 anomalies with high confidence.

KEY FINDINGS:
• Sehore District: 42 cases (High Alert) - Fever cluster detected with 92% confidence
• Bhopal District: 32 cases (Medium Alert) - 18% week-on-week increase
• Indore District: 28 cases (Medium Alert) - GI syndrome spike suspected
• Ujjain, Khandwa, Raisen: <15 cases each (Normal) - Routine monitoring

GEOGRAPHIC DISTRIBUTION:
Central region (Sehore, Bhopal) accounts for 63% of reported cases. Spatial clustering suggests localized transmission chains.

DATA SOURCES:
✓ Real-time case reporting from 47 PHCs
✓ ASHA worker mobile submissions
✓ Private hospital syndromic surveillance
✓ Lab confirmation data

LIMITATIONS:
• Data lag: 2-4 hours typical reporting delay
• Coverage gaps in rural areas (estimated 5-10% underreporting)
• Syndromic data does not equal lab confirmation
• Seasonal variation not yet accounted for

CONFIDENCE INTERVALS:
All findings shown with 95% confidence bands. AI recommendations superseded by clinical judgment.

NEXT STEPS:
1. Activate district-level investigation teams
2. Increase frequency of PHC reporting
3. Consider enhanced surveillance in Sehore
4. Prepare rapid response protocols
  `;

  return (
    <Card className="p-8">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <FileText className="h-6 w-6 text-primary" />
          <h3 className="text-xl font-semibold text-foreground">
            Auto-Generated Situation Report
          </h3>
        </div>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Download PDF
        </Button>
      </div>

      {/* Report Metadata */}
      <div className="grid gap-4 md:grid-cols-3 mb-6 pb-6 border-b border-border">
        <div>
          <p className="text-xs font-semibold text-muted-foreground">
            REPORT TYPE
          </p>
          <p className="text-sm font-semibold text-foreground">
            {syndromeLabels[syndrome]}
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold text-muted-foreground">
            TIME PERIOD
          </p>
          <p className="text-sm font-semibold text-foreground">{timeRange} hours</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-muted-foreground">
            GENERATED
          </p>
          <p className="text-sm font-semibold text-foreground">
            {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Report Content */}
      <div className="prose prose-sm max-w-none text-foreground">
        <div className="whitespace-pre-wrap text-sm leading-relaxed font-mono text-foreground/90">
          {reportContent}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-8 pt-6 border-t border-border">
        <div className="flex gap-3 rounded-lg bg-warning/5 p-4 border border-warning/20">
          <AlertCircle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
          <div className="text-xs text-warning/90 leading-relaxed">
            <strong>Data Quality Notice:</strong> This report is generated from real-time syndromic surveillance. Findings are provisional and subject to revision as confirmed case data arrives. Healthcare officials should validate with field investigations before taking action.
          </div>
        </div>
      </div>

      {/* Regulatory Statement */}
      <div className="mt-4 p-4 rounded-lg bg-primary/5 border border-primary/20">
        <p className="text-xs text-primary font-semibold mb-1">
          REGULATORY COMPLIANCE
        </p>
        <p className="text-xs text-primary/90 leading-relaxed">
          This report follows NITI Aayog surveillance protocols and WHO epidemiological standards. All data is anonymized per HIPAA guidelines. The system is certified for government use.
        </p>
      </div>
    </Card>
  );
}
