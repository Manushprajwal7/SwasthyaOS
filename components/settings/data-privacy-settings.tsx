'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Trash2, Eye, Lock, CheckCircle } from 'lucide-react';

export function DataPrivacySettings() {
  const [consents, setConsents] = useState({
    analytics: true,
    research: false,
    marketing: false,
    thirdParty: false,
  });

  const toggleConsent = (key: string) => {
    setConsents((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-4">
      {/* Data Usage & Consent */}
      <Card>
        <CardHeader>
          <CardTitle>Data Usage & Consent</CardTitle>
          <CardDescription>Control how your data is used and shared</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries({
            analytics: 'Improve SwasthyaOS with usage analytics',
            research: 'Participate in research studies',
            marketing: 'Marketing communications',
            thirdParty: 'Share data with research partners',
          }).map(([key, label]) => (
            <div key={key} className="flex items-center justify-between py-2 border-b last:border-0">
              <label className="text-sm font-medium cursor-pointer">{label}</label>
              <button
                onClick={() => toggleConsent(key)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  consents[key as keyof typeof consents]
                    ? 'bg-primary'
                    : 'bg-slate-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    consents[key as keyof typeof consents]
                      ? 'translate-x-6'
                      : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
          <Button className="w-full mt-4 bg-primary hover:bg-primary-light">
            Update Consent Preferences
          </Button>
        </CardContent>
      </Card>

      {/* Data Access & Download */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Data Access & Download
          </CardTitle>
          <CardDescription>Download a copy of your personal data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Download all your personal data in a portable, machine-readable format (GDPR & DPDP compliant)
          </p>
          <div className="space-y-2">
            {[
              { type: 'Profile Data', size: '45 KB', date: 'Ready' },
              { type: 'Consultation Records', size: '3.2 MB', date: 'Ready' },
              { type: 'Medical History', size: '1.8 MB', date: 'Ready' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium text-sm">{item.type}</p>
                  <p className="text-xs text-muted-foreground">{item.size}</p>
                </div>
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </div>
            ))}
          </div>
          <Button className="w-full bg-primary hover:bg-primary-light gap-2">
            <Download className="h-4 w-4" />
            Download All Data
          </Button>
        </CardContent>
      </Card>

      {/* Data Deletion */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-error">
            <Trash2 className="h-5 w-5" />
            Data Deletion (Right to be Forgotten)
          </CardTitle>
          <CardDescription>Permanently delete your account and associated data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-4 rounded-lg bg-error/5 border border-error/20">
            <p className="text-sm font-medium text-error mb-2">
              Warning: This action cannot be undone
            </p>
            <p className="text-xs text-muted-foreground">
              All your personal data, consultations, medical records, and account information will be permanently deleted
              after 30 days. During this period, you can restore your account.
            </p>
          </div>
          <Button variant="outline" className="w-full text-error border-error hover:bg-error/5 bg-transparent">
            Request Account Deletion
          </Button>
        </CardContent>
      </Card>

      {/* Privacy Policy & Terms */}
      <Card>
        <CardHeader>
          <CardTitle>Privacy & Legal</CardTitle>
          <CardDescription>Review our policies and compliance information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { title: 'Privacy Policy', desc: 'How we handle your data', icon: Eye },
            { title: 'Data Processing Agreement', desc: 'DPDP and HIPAA compliance', icon: Lock },
            { title: 'Terms of Service', desc: 'Usage terms and conditions', icon: CheckCircle },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-sm">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  View
                </Button>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Compliance Status */}
      <Card>
        <CardHeader>
          <CardTitle>Compliance & Certifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {[
            { name: 'DPDP Act Compliance', status: true },
            { name: 'HIPAA Compliant', status: true },
            { name: 'ISO 27001 Certified', status: true },
            { name: 'GDPR Article 25', status: true },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-2 text-sm">
              <span>{item.name}</span>
              <span className="text-success font-medium">✓ Compliant</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
