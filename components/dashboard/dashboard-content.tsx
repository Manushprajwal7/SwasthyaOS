'use client';

import React from 'react';
import {
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Users,
  Activity,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { ConsultationCard } from './consultation-card';
import { AlertPanel } from './alert-panel';
import { HealthSignalsMap } from './health-signals-map';
import { SystemTrustStatus } from './system-trust-status';

export function DashboardContent() {
  return (
    <div className="space-y-6 p-8">
      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground">Dashboard</h1>
        <p className="mt-2 text-muted-foreground">
          Clinical situational overview & AI-powered health intelligence
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Today's Consultations */}
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Today's Consultations
              </p>
              <p className="mt-2 text-3xl font-bold text-foreground">24</p>
              <p className="mt-1 text-xs text-success">↑ 12% from yesterday</p>
            </div>
            <Activity className="h-8 w-8 text-primary/20" />
          </div>
        </Card>

        {/* Pending Documentation */}
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Pending Documentation
              </p>
              <p className="mt-2 text-3xl font-bold text-foreground">7</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Avg 4 min to complete
              </p>
            </div>
            <Clock className="h-8 w-8 text-accent/20" />
          </div>
        </Card>

        {/* AI Alerts Generated */}
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                AI Alerts Generated
              </p>
              <p className="mt-2 text-3xl font-bold text-foreground">3</p>
              <p className="mt-1 text-xs text-warning">
                2 high confidence
              </p>
            </div>
            <AlertCircle className="h-8 w-8 text-warning/20" />
          </div>
        </Card>

        {/* System Health */}
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                System Status
              </p>
              <p className="mt-2 text-3xl font-bold text-foreground">
                <span className="text-success">94%</span>
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                AI Model Accuracy
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-success/20" />
          </div>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column: Alerts & Consultations */}
        <div className="lg:col-span-2 space-y-6">
          {/* Critical Alerts */}
          <Card className="border-l-4 border-l-error p-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-6 w-6 text-error" />
              <div>
                <h3 className="font-semibold text-foreground">System Alerts</h3>
                <p className="text-sm text-muted-foreground">
                  3 alerts pending review
                </p>
              </div>
            </div>
            <div className="mt-4 space-y-3">
              <AlertPanel
                severity="high"
                title="Unusual Fever Cluster Detected"
                location="Gram Panchayat, Sehore District"
                description="16 cases reported in past 48 hours. Pattern suggests possible outbreak."
                confidence={92}
              />
              <AlertPanel
                severity="medium"
                title="Medication Stock Alert"
                location="PHC Jamkhandi"
                description="Paracetamol stock below 30%. Recommended reorder."
                confidence={78}
              />
            </div>
          </Card>

          {/* Recent Consultations */}
          <div>
            <h3 className="mb-4 font-semibold text-foreground">
              Recent Consultations
            </h3>
            <div className="space-y-3">
              <ConsultationCard
                patientId="P-2401"
                patientName="Meera Singh"
                age={34}
                reason="Chronic Hypertension Follow-up"
                status="completed"
                time="10:45 AM"
                confidence={88}
              />
              <ConsultationCard
                patientId="P-2402"
                patientName="Ajay Kumar"
                age={28}
                reason="Acute Respiratory Infection"
                status="in-progress"
                time="11:20 AM"
                confidence={91}
              />
              <ConsultationCard
                patientId="P-2403"
                patientName="Priya Sharma"
                age={45}
                reason="Post-Surgery Assessment"
                status="pending"
                time="Scheduled"
                confidence={0}
              />
            </div>
          </div>
        </div>

        {/* Right Column: Health Radar & Trust Status */}
        <div className="space-y-6">
          {/* Population Health Signals */}
          <Card className="p-6">
            <h3 className="mb-4 font-semibold text-foreground">
              Regional Health Signals
            </h3>
            <HealthSignalsMap />
          </Card>

          {/* System Trust Status */}
          <Card className="p-6">
            <h3 className="mb-4 font-semibold text-foreground">
              AI System Trust Score
            </h3>
            <SystemTrustStatus />
          </Card>

          {/* Quick Stats */}
          <Card className="p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Data Quality
              </span>
              <span className="font-semibold text-foreground">98%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Active Patients
              </span>
              <span className="font-semibold text-foreground">156</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                System Uptime
              </span>
              <span className="font-semibold text-foreground">99.8%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                AI Model Version
              </span>
              <span className="font-semibold text-foreground">v2.1.4</span>
            </div>
          </Card>
        </div>
      </div>

      {/* Empty State Info */}
      <Card className="border-l-4 border-l-success bg-success/5 p-6">
        <div className="flex items-start gap-3">
          <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-foreground">
              ✓ No critical incidents detected
            </h4>
            <p className="mt-1 text-sm text-muted-foreground">
              System monitoring continues. All healthcare workers are actively serving patients.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
