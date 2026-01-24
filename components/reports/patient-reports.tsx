'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, Filter } from 'lucide-react';

interface PatientReportsProps {
  dateRange: { start: string; end: string };
}

export function PatientReports({ dateRange }: PatientReportsProps) {
  const reportTypes = [
    {
      id: 'individual',
      title: 'Individual Patient Reports',
      description: 'Detailed reports for specific patients including consultation history, SOAP notes, and discharge summaries',
      icon: '📋',
      metrics: { patients: 2847, consultations: 5124 },
    },
    {
      id: 'followup',
      title: 'Follow-up Status Reports',
      description: 'Track patient follow-ups, missed appointments, and compliance with treatment plans',
      icon: '✓',
      metrics: { completed: 1923, pending: 287, overdue: 45 },
    },
    {
      id: 'prescription',
      title: 'Prescription Reports',
      description: 'Medication prescriptions with adherence tracking and side-effect reports',
      icon: '💊',
      metrics: { prescriptions: 3421, adherence: '91%' },
    },
    {
      id: 'referral',
      title: 'Referral Reports',
      description: 'Referral patterns, acceptance rates, and specialist feedback integration',
      icon: '→',
      metrics: { referrals: 432, acceptance: '87%' },
    },
    {
      id: 'outcome',
      title: 'Patient Outcome Reports',
      description: 'Clinical outcomes, recovery rates, and treatment effectiveness analysis',
      icon: '📊',
      metrics: { recovered: '78%', improved: '18%', unchanged: '4%' },
    },
    {
      id: 'demographics',
      title: 'Demographics & Risk',
      description: 'Patient demographics, comorbidities, and risk stratification analysis',
      icon: '👥',
      metrics: { highrisk: 234, medium: 891, low: 1722 },
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Patient Reports</h2>
        <Button variant="outline" className="gap-2 bg-transparent" size="sm">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {reportTypes.map((report) => (
          <Card key={report.id} className="hover:border-primary transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{report.icon}</span>
                  <div>
                    <CardTitle className="text-base">{report.title}</CardTitle>
                    <CardDescription className="text-xs mt-1">{report.description}</CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Metrics Display */}
              <div className="flex flex-wrap gap-2">
                {Object.entries(report.metrics).map(([key, value]) => (
                  <div key={key} className="rounded-lg bg-slate-50 px-3 py-1">
                    <p className="text-xs font-medium text-primary">{value}</p>
                    <p className="text-xs text-muted-foreground capitalize">{key}</p>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button size="sm" className="flex-1 bg-primary hover:bg-primary-light gap-2">
                  <FileText className="h-4 w-4" />
                  Generate
                </Button>
                <Button size="sm" variant="outline" className="flex-1 gap-2 bg-transparent">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Report History */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
          <CardDescription>Your recently generated patient reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: 'Individual Patient Report - P123456', date: '2024-12-15', size: '2.4 MB' },
              { name: 'Follow-up Status Report - Q4 2024', date: '2024-12-14', size: '1.8 MB' },
              { name: 'Prescription Adherence Report', date: '2024-12-13', size: '945 KB' },
              { name: 'Referral Pattern Analysis', date: '2024-12-12', size: '1.2 MB' },
            ].map((report, idx) => (
              <div key={idx} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="text-sm font-medium">{report.name}</p>
                  <p className="text-xs text-muted-foreground">{report.date} • {report.size}</p>
                </div>
                <Button size="sm" variant="ghost">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
