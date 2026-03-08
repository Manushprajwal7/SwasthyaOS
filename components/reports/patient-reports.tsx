'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, Filter, Users, Activity, Pill, ArrowRight, TrendingUp, Users2 } from 'lucide-react';

interface PatientReportsProps {
  dateRange: { start: string; end: string };
}

export function PatientReports({ dateRange }: PatientReportsProps) {
  const [showFilter, setShowFilter] = useState(false);
  const [generatingReport, setGeneratingReport] = useState<string | null>(null);
  const [exportingReport, setExportingReport] = useState<string | null>(null);

  const handleFilterClick = () => {
    setShowFilter(!showFilter);
    console.log('Filter panel toggled');
  };

  const handleGenerateReport = async (reportId: string, reportTitle: string) => {
    setGeneratingReport(reportId);
    try {
      console.log(`Generating ${reportTitle}...`);
      // Simulate API call for generating report
      const response = await fetch('/api/reports/patient/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          reportId, 
          reportTitle,
          dateRange 
        })
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log('Report generated:', result);
        // Could show a success notification here
      }
    } catch (error) {
      console.error('Report generation failed:', error);
    } finally {
      setGeneratingReport(null);
    }
  };

  const handleExportReport = async (reportId: string, reportTitle: string) => {
    setExportingReport(reportId);
    try {
      console.log(`Exporting ${reportTitle}...`);
      // Simulate API call for exporting report
      const response = await fetch('/api/reports/patient/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          reportId, 
          reportTitle,
          dateRange 
        })
      });
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${reportTitle.toLowerCase().replace(/\s+/g, '-')}-${dateRange.start}-to-${dateRange.end}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setExportingReport(null);
    }
  };

  const handleDownloadRecentReport = async (reportName: string) => {
    try {
      console.log(`Downloading ${reportName}...`);
      // Simulate API call for downloading recent report
      const response = await fetch(`/api/reports/patient/download/${encodeURIComponent(reportName)}`);
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = reportName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error('Download failed:', error);
    }
  };
  const reportTypes = [
    {
      id: 'individual',
      title: 'Individual Patient Reports',
      description: 'Detailed reports for specific patients including consultation history, SOAP notes, and discharge summaries',
      icon: <Users className="h-6 w-6 text-primary" />,
      metrics: { patients: 2847, consultations: 5124 },
    },
    {
      id: 'followup',
      title: 'Follow-up Status Reports',
      description: 'Track patient follow-ups, missed appointments, and compliance with treatment plans',
      icon: <Activity className="h-6 w-6 text-success" />,
      metrics: { completed: 1923, pending: 287, overdue: 45 },
    },
    {
      id: 'prescription',
      title: 'Prescription Reports',
      description: 'Medication prescriptions with adherence tracking and side-effect reports',
      icon: <Pill className="h-6 w-6 text-warning" />,
      metrics: { prescriptions: 3421, adherence: '91%' },
    },
    {
      id: 'referral',
      title: 'Referral Reports',
      description: 'Referral patterns, acceptance rates, and specialist feedback integration',
      icon: <ArrowRight className="h-6 w-6 text-info" />,
      metrics: { referrals: 432, acceptance: '87%' },
    },
    {
      id: 'outcome',
      title: 'Patient Outcome Reports',
      description: 'Clinical outcomes, recovery rates, and treatment effectiveness analysis',
      icon: <TrendingUp className="h-6 w-6 text-success" />,
      metrics: { recovered: '78%', improved: '18%', unchanged: '4%' },
    },
    {
      id: 'demographics',
      title: 'Demographics & Risk',
      description: 'Patient demographics, comorbidities, and risk stratification analysis',
      icon: <Users2 className="h-6 w-6 text-primary" />,
      metrics: { highrisk: 234, medium: 891, low: 1722 },
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Patient Reports</h2>
        <Button variant="outline" className="gap-2 bg-transparent" size="sm" onClick={handleFilterClick}>
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
                  <div className="flex-shrink-0">
                    {report.icon}
                  </div>
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
                <Button 
                  size="sm" 
                  className="flex-1 bg-primary hover:bg-primary-light gap-2"
                  onClick={() => handleGenerateReport(report.id, report.title)}
                  disabled={generatingReport === report.id}
                >
                  <FileText className="h-4 w-4" />
                  {generatingReport === report.id ? 'Generating...' : 'Generate'}
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1 gap-2 bg-transparent"
                  onClick={() => handleExportReport(report.id, report.title)}
                  disabled={exportingReport === report.id}
                >
                  <Download className="h-4 w-4" />
                  {exportingReport === report.id ? 'Exporting...' : 'Export'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filter Panel */}
      {showFilter && (
        <Card>
          <CardHeader>
            <CardTitle>Filter Reports</CardTitle>
            <CardDescription>Apply filters to narrow down report results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="block text-sm font-medium mb-2">Report Type</label>
                <select className="w-full p-2 border rounded">
                  <option value="">All Types</option>
                  <option value="individual">Individual Patient</option>
                  <option value="followup">Follow-up Status</option>
                  <option value="prescription">Prescription</option>
                  <option value="referral">Referral</option>
                  <option value="outcome">Patient Outcome</option>
                  <option value="demographics">Demographics</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Status</label>
                <select className="w-full p-2 border rounded">
                  <option value="">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Priority</label>
                <select className="w-full p-2 border rounded">
                  <option value="">All Priorities</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button variant="outline" onClick={() => setShowFilter(false)}>Cancel</Button>
              <Button onClick={() => setShowFilter(false)}>Apply Filters</Button>
            </div>
          </CardContent>
        </Card>
      )}

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
                <Button size="sm" variant="ghost" onClick={() => handleDownloadRecentReport(report.name)}>
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
