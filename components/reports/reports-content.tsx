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
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateRangeClick = () => {
    setShowDatePicker(!showDatePicker);
    console.log('Date range picker toggled');
  };

  const handleExportAll = async () => {
    try {
      console.log('Exporting all reports...');
      // Simulate API call for exporting all reports
      const response = await fetch('/api/reports/export-all', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dateRange })
      });
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `all-reports-${dateRange.start}-to-${dateRange.end}.zip`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground">Generate and export comprehensive healthcare reports</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 bg-transparent" onClick={handleDateRangeClick}>
            <Calendar className="h-4 w-4" />
            Date Range
          </Button>
          <Button className="gap-2 bg-primary hover:bg-primary-light" onClick={handleExportAll}>
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

      {/* Date Range Picker Modal */}
      {showDatePicker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h3 className="text-lg font-semibold mb-4">Select Date Range</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Start Date</label>
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">End Date</label>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setShowDatePicker(false)}>Cancel</Button>
                <Button onClick={() => setShowDatePicker(false)}>Apply</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
