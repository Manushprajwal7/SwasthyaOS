'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Download, FileText, BarChart3, LineChart, PieChart, Calendar } from 'lucide-react';
import { PatientReports } from './patient-reports';
import { EpidemiologicalReports } from './epidemiological-reports';
import { PerformanceReports } from './performance-reports';
import { ComplianceReports } from './compliance-reports';

export function ReportsContent() {
  const [dateRange, setDateRange] = useState({ start: '2024-01-01', end: '2024-12-31' });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground">Generate and export comprehensive healthcare reports</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Calendar className="h-4 w-4" />
            Date Range
          </Button>
          <Button className="gap-2 bg-primary hover:bg-primary-light">
            <Download className="h-4 w-4" />
            Export All
          </Button>
        </div>
      </div>

      {/* Main Reports */}
      <Tabs defaultValue="patient" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="patient" className="gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Patient</span>
          </TabsTrigger>
          <TabsTrigger value="epidemiological" className="gap-2">
            <LineChart className="h-4 w-4" />
            <span className="hidden sm:inline">Epidemiology</span>
          </TabsTrigger>
          <TabsTrigger value="performance" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Performance</span>
          </TabsTrigger>
          <TabsTrigger value="compliance" className="gap-2">
            <PieChart className="h-4 w-4" />
            <span className="hidden sm:inline">Compliance</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="patient" className="space-y-4">
          <PatientReports dateRange={dateRange} />
        </TabsContent>

        <TabsContent value="epidemiological" className="space-y-4">
          <EpidemiologicalReports dateRange={dateRange} />
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <PerformanceReports dateRange={dateRange} />
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <ComplianceReports dateRange={dateRange} />
        </TabsContent>
      </Tabs>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Consultations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-success">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2m</div>
            <p className="text-xs text-success">Within target</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Patient Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-success">+5% improvement</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Data Quality Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.5%</div>
            <p className="text-xs text-success">Excellent</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
