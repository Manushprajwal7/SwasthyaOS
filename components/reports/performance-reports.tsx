'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, TrendingUp, Users } from 'lucide-react';

interface PerformanceReportsProps {
  dateRange: { start: string; end: string };
}

export function PerformanceReports({ dateRange }: PerformanceReportsProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Performance & Operations Reports</h2>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Avg Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2m</div>
            <p className="text-xs text-success">↓ 12% improvement</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Case Resolution Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.3%</div>
            <p className="text-xs text-success">First contact resolution</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Clinician Productivity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.7</div>
            <p className="text-xs text-success">Patients per clinician/day</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">System Uptime</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.94%</div>
            <p className="text-xs text-success">SLA compliance</p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Clinician Performance</CardTitle>
            <CardDescription>Individual and team metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { name: 'Dr. Rajesh Kumar', consultations: 287, accuracy: '96%', resolution: '92%' },
              { name: 'Dr. Priya Sharma', consultations: 312, accuracy: '98%', resolution: '95%' },
              { name: 'Asha (Frontline)', consultations: 156, accuracy: '89%', resolution: '87%' },
              { name: 'Hari (Frontline)', consultations: 143, accuracy: '91%', resolution: '89%' },
            ].map((provider, idx) => (
              <div key={idx} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="text-sm font-medium">{provider.name}</p>
                  <p className="text-xs text-muted-foreground">{provider.consultations} consultations</p>
                </div>
                <div className="flex gap-3 text-right">
                  <div>
                    <p className="text-sm font-medium">{provider.accuracy}</p>
                    <p className="text-xs text-muted-foreground">Accuracy</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{provider.resolution}</p>
                    <p className="text-xs text-muted-foreground">Resolution</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Facility Performance</CardTitle>
            <CardDescription>Operational efficiency metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { facility: 'Central Hospital', patients: '1,247', beds: '92%', ot: '78%' },
              { facility: 'North PHC', patients: '345', beds: '45%', ot: '62%' },
              { facility: 'South Clinic', patients: '289', beds: '38%', ot: '55%' },
              { facility: 'Rural Sub-Center', patients: '156', beds: 'N/A', ot: 'N/A' },
            ].map((facility, idx) => (
              <div key={idx} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="text-sm font-medium">{facility.facility}</p>
                  <p className="text-xs text-muted-foreground">{facility.patients} patient visits</p>
                </div>
                <div className="flex gap-3 text-right">
                  <div>
                    <p className="text-sm font-medium">{facility.beds}</p>
                    <p className="text-xs text-muted-foreground">Bed Occ.</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{facility.ot}</p>
                    <p className="text-xs text-muted-foreground">OT Util.</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Service Analytics */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Service Utilization</CardTitle>
              <CardDescription>Volume and trends across services</CardDescription>
            </div>
            <BarChart3 className="h-5 w-5 text-primary" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { service: 'General Consultation', count: 1847, trend: '+15%', volume: 85 },
            { service: 'Emergency Cases', count: 432, trend: '+8%', volume: 62 },
            { service: 'Remote Consultation', count: 678, trend: '+32%', volume: 78 },
            { service: 'Preventive Care', count: 234, trend: '+5%', volume: 45 },
          ].map((service, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{service.service}</span>
                <span className="flex items-center gap-1">
                  <span className="text-muted-foreground">{service.count}</span>
                  <span className="text-success text-xs">{service.trend}</span>
                </span>
              </div>
              <div className="h-2 rounded-full bg-slate-100">
                <div className="h-2 rounded-full bg-primary" style={{ width: `${service.volume}%` }} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle>Generate Custom Reports</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-2 md:grid-cols-3">
            <Button className="bg-primary hover:bg-primary-light">Monthly Performance Report</Button>
            <Button variant="outline">Quarterly Analysis</Button>
            <Button variant="outline">Annual Summary</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
