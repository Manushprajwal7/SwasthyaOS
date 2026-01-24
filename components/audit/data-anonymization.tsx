'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { CheckCircle, Lock, AlertCircle } from 'lucide-react';

export function DataAnonymization() {
  const securityMeasures = [
    {
      title: 'Patient Data Encryption',
      description: 'All personally identifiable information (PII) encrypted with AES-256',
      status: 'active',
      icon: Lock,
    },
    {
      title: 'De-identification Protocol',
      description: 'Clinical data separated from identifying information using relational database architecture',
      status: 'active',
      icon: CheckCircle,
    },
    {
      title: 'Access Control & RBAC',
      description: 'Role-based access control ensures clinicians see only necessary data',
      status: 'active',
      icon: CheckCircle,
    },
    {
      title: 'Audit Logging',
      description: 'All database queries logged with user attribution for accountability',
      status: 'active',
      icon: CheckCircle,
    },
    {
      title: 'Secure Data Deletion',
      description: 'Patient records deleted per retention policy with cryptographic erasure',
      status: 'active',
      icon: CheckCircle,
    },
    {
      title: 'Data Residency',
      description: 'All data stored on servers physically located within India',
      status: 'active',
      icon: CheckCircle,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Security Status Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6">
          <p className="text-xs font-semibold text-muted-foreground mb-2">
            ENCRYPTION STATUS
          </p>
          <p className="text-3xl font-bold text-success">100%</p>
          <p className="text-xs text-muted-foreground mt-1">Patient data encrypted</p>
        </Card>
        <Card className="p-6">
          <p className="text-xs font-semibold text-muted-foreground mb-2">
            ACCESS CONTROLS
          </p>
          <p className="text-3xl font-bold text-success">Active</p>
          <p className="text-xs text-muted-foreground mt-1">RBAC enforced</p>
        </Card>
        <Card className="p-6">
          <p className="text-xs font-semibold text-muted-foreground mb-2">
            AUDIT TRAIL
          </p>
          <p className="text-3xl font-bold text-success">Complete</p>
          <p className="text-xs text-muted-foreground mt-1">All queries logged</p>
        </Card>
      </div>

      {/* Security Measures */}
      <Card className="p-6">
        <h3 className="font-semibold text-foreground mb-4">
          Data Protection Measures
        </h3>

        <div className="space-y-3">
          {securityMeasures.map((measure) => {
            const Icon = measure.icon;
            return (
              <div
                key={measure.title}
                className="flex gap-4 p-4 rounded-lg bg-muted/50 border border-border"
              >
                <Icon className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold text-foreground text-sm">
                    {measure.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {measure.description}
                  </p>
                </div>
                <div className="text-xs font-bold text-success px-2 py-1 rounded-full bg-success/10 h-fit">
                  {measure.status.toUpperCase()}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Compliance Certifications */}
      <Card className="bg-primary/5 border-primary/20 p-6">
        <h3 className="font-semibold text-foreground mb-4">
          Security Certifications
        </h3>

        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
            <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground text-sm">ISO 27001</p>
              <p className="text-xs text-muted-foreground mt-1">
                Information security management system certified
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
            <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground text-sm">HIPAA Compliant</p>
              <p className="text-xs text-muted-foreground mt-1">
                Health Insurance Portability and Accountability Act standards met
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
            <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground text-sm">
                India Data Protection Act (DPDP)
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Fully compliant with digital personal data protection regulations
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Incident Response */}
      <Card className="border-l-4 border-l-warning bg-warning/5 p-6">
        <div className="flex gap-3">
          <AlertCircle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-warning text-sm mb-2">
              Incident Response Protocol
            </p>
            <p className="text-xs text-warning/90 leading-relaxed mb-3">
              Any suspected data breach is immediately escalated to the security team. Users are notified within 24 hours per DPDP requirements. A full forensic audit is conducted.
            </p>
            <p className="text-xs font-semibold text-warning">
              Last incident: None reported (System uptime: 99.8%)
            </p>
          </div>
        </div>
      </Card>

      {/* Data Retention */}
      <Card className="p-6">
        <h3 className="font-semibold text-foreground mb-4">Data Retention Policy</h3>
        <div className="space-y-3 text-sm text-foreground leading-relaxed">
          <p>
            <strong>Active Patient Records:</strong> Retained for duration of treatment
            + 7 years per medical records standards
          </p>
          <p>
            <strong>Inactive Patient Records:</strong> Retained for 5 years, then
            securely deleted
          </p>
          <p>
            <strong>Audit Logs:</strong> Retained for 3 years for compliance audit trails
          </p>
          <p>
            <strong>Research Data:</strong> De-identified data retained indefinitely for
            public health surveillance
          </p>
        </div>
      </Card>
    </div>
  );
}
