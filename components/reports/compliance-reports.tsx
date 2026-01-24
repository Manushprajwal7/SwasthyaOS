'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertCircle, Shield } from 'lucide-react';

interface ComplianceReportsProps {
  dateRange: { start: string; end: string };
}

export function ComplianceReports({ dateRange }: ComplianceReportsProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Compliance & Regulatory Reports</h2>

      {/* Compliance Status */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">DPDP Act Compliance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-success" />
              <span className="font-semibold">100% Compliant</span>
            </div>
            <p className="text-xs text-muted-foreground">Data protection & privacy protocols</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">HIPAA Compliance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-success" />
              <span className="font-semibold">Certified</span>
            </div>
            <p className="text-xs text-muted-foreground">Protected Health Information standards</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">ISO 27001 Certification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-success" />
              <span className="font-semibold">Valid</span>
            </div>
            <p className="text-xs text-muted-foreground">Information security management</p>
          </CardContent>
        </Card>
      </div>

      {/* Compliance Reports */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Data Security Reports</CardTitle>
            <CardDescription>Encryption, access controls, and security audits</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Data Encryption Status</span>
                <span className="font-medium text-success">✓ 100%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100">
                <div className="h-2 rounded-full bg-success" style={{ width: '100%' }} />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Access Control Audits</span>
                <span className="font-medium text-success">✓ 98%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100">
                <div className="h-2 rounded-full bg-success" style={{ width: '98%' }} />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Intrusion Detection</span>
                <span className="font-medium text-success">✓ No threats</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100">
                <div className="h-2 rounded-full bg-success" style={{ width: '100%' }} />
              </div>
            </div>

            <Button variant="outline" className="w-full mt-4 bg-transparent">
              Download Security Report
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Audit Trail Reports</CardTitle>
            <CardDescription>System access logs and user activities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { event: 'Data Access Events', count: '2,847', status: 'All Logged' },
              { event: 'Unauthorized Access Attempts', count: '23', status: 'All Blocked' },
              { event: 'System Configuration Changes', count: '156', status: 'Approved' },
              { event: 'Data Export Events', count: '87', status: 'All Logged' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between rounded-lg border p-2">
                <div>
                  <p className="text-sm font-medium">{item.event}</p>
                  <p className="text-xs text-muted-foreground">{item.status}</p>
                </div>
                <p className="text-sm font-semibold">{item.count}</p>
              </div>
            ))}

            <Button variant="outline" className="w-full mt-4 bg-transparent">
              View Detailed Audit Trail
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Consent Management</CardTitle>
            <CardDescription>Patient consent tracking and documentation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Documented Consents</span>
                <span className="font-medium">2,847 / 2,847</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100">
                <div className="h-2 rounded-full bg-success" style={{ width: '100%' }} />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Withdrawal Requests</span>
                <span className="font-medium">34 processed</span>
              </div>
              <div className="text-xs text-muted-foreground">Average response: 2.3 hours</div>
            </div>

            <div className="rounded-lg bg-teal-50 p-3">
              <p className="text-sm font-medium text-primary mb-2">Consent Status</p>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Active</span>
                  <span className="font-semibold">2,813</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Withdrawn</span>
                  <span className="font-semibold">34</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quality Metrics</CardTitle>
            <CardDescription>Data quality and documentation standards</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { metric: 'Data Completeness', score: 98.5 },
              { metric: 'Documentation Accuracy', score: 97.2 },
              { metric: 'Timeliness of Records', score: 94.8 },
              { metric: 'Consistency Checks', score: 99.1 },
            ].map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{item.metric}</span>
                  <span className="font-medium text-primary">{item.score}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100">
                  <div className="h-2 rounded-full bg-primary" style={{ width: `${item.score}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Incident & Risk Management</CardTitle>
            <CardDescription>Security incidents and risk assessments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-lg border border-slate-200 p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Active Incidents</span>
                <span className="text-lg font-bold">2</span>
              </div>
              <p className="text-xs text-muted-foreground">All mitigated within 4 hours</p>
            </div>

            <div className="rounded-lg border border-slate-200 p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Risk Assessment</span>
                <span className="text-lg font-bold text-success">Low</span>
              </div>
              <p className="text-xs text-muted-foreground">Annual review completed</p>
            </div>

            <div className="rounded-lg bg-slate-50 p-3">
              <p className="text-xs font-medium text-primary mb-2">Vulnerability Scans</p>
              <p className="text-sm">Monthly • Last: Dec 15, 2024</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Regulatory Reports</CardTitle>
            <CardDescription>Submissions and certifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { name: 'DPDP Annual Report', status: 'Submitted', date: 'Dec 2024' },
              { name: 'NITI Aayog Certification', status: 'Valid', date: 'Exp: Jun 2025' },
              { name: 'Hospital Accreditation', status: 'Maintained', date: 'Exp: Mar 2025' },
              { name: 'Security Audit', status: 'Completed', date: 'Nov 2024' },
            ].map((report, idx) => (
              <div key={idx} className="flex items-center justify-between rounded-lg border p-2">
                <div>
                  <p className="text-sm font-medium">{report.name}</p>
                  <p className="text-xs text-muted-foreground">{report.date}</p>
                </div>
                <span className="rounded-full bg-success/10 px-2 py-1 text-xs font-medium text-success">
                  {report.status}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
