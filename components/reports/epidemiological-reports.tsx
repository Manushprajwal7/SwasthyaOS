'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, TrendingUp, AlertCircle } from 'lucide-react';

interface EpidemiologicalReportsProps {
  dateRange: { start: string; end: string };
}

export function EpidemiologicalReports({ dateRange }: EpidemiologicalReportsProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Epidemiological Reports</h2>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Disease Surveillance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">156</span>
              <span className="text-xs text-warning">Active cases</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-error">
              <AlertCircle className="h-3 w-3" />
              3 new alerts this week
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Outbreak Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">2</span>
              <span className="text-xs text-success">Suspected outbreaks</span>
            </div>
            <div className="text-xs text-muted-foreground">Under monitoring</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Vaccination Coverage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">92.3%</span>
              <span className="text-xs text-success">Target population</span>
            </div>
            <div className="text-xs text-muted-foreground">4,287 vaccinations</div>
          </CardContent>
        </Card>
      </div>

      {/* Report Types Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {[
          {
            title: 'Syndrome Surveillance Report',
            description: 'Weekly/monthly trends for key syndromic indicators across regions',
            metrics: ['ILI Cases', 'Gastroenteritis', 'Respiratory'],
          },
          {
            title: 'Disease Incidence Analysis',
            description: 'Incidence rates, trends, and comparative analysis by region',
            metrics: ['Malaria', 'Dengue', 'Typhoid'],
          },
          {
            title: 'Outbreak Investigation Reports',
            description: 'Detailed outbreak investigation with timeline and intervention tracking',
            metrics: ['Cases', 'Deaths', 'Attack Rate'],
          },
          {
            title: 'Vaccination Campaign Reports',
            description: 'Immunization coverage, cold chain monitoring, and AEFI tracking',
            metrics: ['Coverage %', 'AEFI Cases', 'Stock Status'],
          },
          {
            title: 'Antimicrobial Resistance Surveillance',
            description: 'AMR patterns and emerging resistance strains',
            metrics: ['Susceptibility %', 'Resistance Rate', 'New Strains'],
          },
          {
            title: 'Environmental Health Reports',
            description: 'Water quality, sanitation, and environmental surveillance data',
            metrics: ['Water Quality', 'Air Quality', 'Sanitation'],
          },
        ].map((report, idx) => (
          <Card key={idx}>
            <CardHeader>
              <CardTitle className="text-base">{report.title}</CardTitle>
              <CardDescription className="text-xs">{report.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {report.metrics.map((metric, i) => (
                  <span key={i} className="rounded bg-teal-50 px-2 py-1 text-xs font-medium text-primary">
                    {metric}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="flex-1 bg-primary hover:bg-primary-light">
                  Generate
                </Button>
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Trend Analysis */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Disease Trends</CardTitle>
              <CardDescription>Weekly case trends and anomaly detection</CardDescription>
            </div>
            <TrendingUp className="h-5 w-5 text-success" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {['Malaria', 'Dengue', 'Typhoid', 'Respiratory ILI'].map((disease, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{disease}</span>
                <span className="text-muted-foreground">↑ {Math.floor(Math.random() * 30) + 5}% vs last week</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100">
                <div
                  className="h-2 rounded-full bg-primary"
                  style={{ width: `${Math.floor(Math.random() * 100) + 30}%` }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
