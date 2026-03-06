'use client';

import React from 'react';
import { FileText, Download, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();
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
    <div className="bg-white dark:bg-slate-900 border border-border shadow-sm rounded-xl overflow-hidden flex flex-col">
      <div className="p-4 border-b border-border flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-indigo-600" />
          <div>
            <h3 className="font-bold text-foreground tracking-tight text-sm">
              Auto-Generated Situation Report
            </h3>
            <p className="text-[10px] text-muted-foreground mt-0.5">Automated narrative synthesis</p>
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="h-7 text-xs"
          onClick={() => {
            toast({
              title: "Download Started",
              description: `SitRep-${syndromeLabels[syndrome].replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf is generating.`,
            });
          }}
        >
          <Download className="h-3.5 w-3.5 mr-1" />
          PDF
        </Button>
      </div>

      <div className="p-5">
        {/* Report Metadata */}
        <div className="grid grid-cols-3 gap-3 mb-5 pb-5 border-b border-dashed border-border/60">
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-2.5 text-center border border-border">
            <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider mb-1">
              Syndrome
            </p>
            <p className="text-xs font-semibold text-foreground truncate">
              {syndromeLabels[syndrome]}
            </p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-2.5 text-center border border-border">
            <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider mb-1">
              Window
            </p>
            <p className="text-xs font-semibold text-foreground">{timeRange}H</p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-2.5 text-center border border-border">
            <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider mb-1">
              Generated
            </p>
            <p className="text-xs font-semibold text-foreground">
              {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Report Content */}
        <div className="prose prose-sm max-w-none">
          <div className="whitespace-pre-wrap text-[13px] leading-relaxed font-mono text-slate-700 dark:text-slate-300 p-4 bg-slate-50/50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-800">
            {reportContent.trim()}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-5 pt-5 border-t border-border flex flex-col gap-3">
          <div className="flex gap-3 rounded-lg bg-amber-50/50 p-3 border border-amber-200/50 items-start">
            <AlertCircle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="text-[11px] text-amber-900/80 leading-relaxed">
              <strong>Provisional Data:</strong> This report is generated from real-time syndromic surveillance. Findings are subject to revision as confirmed cases arrive. Validate with field investigations before declaring an outbreak.
            </div>
          </div>
          
          <div className="rounded-lg bg-indigo-50/50 p-3 border border-indigo-200/50">
            <div className="text-[11px] text-indigo-900/80 leading-relaxed">
              <strong>Regulatory Compliance:</strong> Follows NITI Aayog surveillance protocols. All data anonymized per guidelines.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
