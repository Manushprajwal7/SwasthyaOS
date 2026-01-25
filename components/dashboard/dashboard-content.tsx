"use client";

import React from "react";
import {
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Users,
  Activity,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { ConsultationCard } from "./consultation-card";
import { AlertPanel } from "./alert-panel";
import { HealthSignalsMap } from "./health-signals-map";
import { SystemTrustStatus } from "./system-trust-status";
import { useLanguage } from "@/contexts/language-context";

export function DashboardContent() {
  const { t } = useLanguage();

  return (
    <div className="space-y-6 p-8">
      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground">
          {t("dashboard.title")}
        </h1>
        <p className="mt-2 text-muted-foreground">{t("dashboard.subtitle")}</p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Today's Consultations */}
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {t("dashboard.consultations.today")}
              </p>
              <p className="mt-2 text-3xl font-bold text-foreground">24</p>
              <p className="mt-1 text-xs text-success">
                ↑ 12% from {t("time.yesterday")}
              </p>
            </div>
            <Activity className="h-8 w-8 text-primary/20" />
          </div>
        </Card>

        {/* Pending Documentation */}
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {t("dashboard.consultations.pending")}
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
                {t("dashboard.alerts.generated")}
              </p>
              <p className="mt-2 text-3xl font-bold text-foreground">3</p>
              <p className="mt-1 text-xs text-warning">
                2 {t("common.high")} {t("common.confidence")}
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
                {t("dashboard.system.status")}
              </p>
              <p className="mt-2 text-3xl font-bold text-foreground">
                <span className="text-success">94%</span>
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {t("dashboard.system.accuracy")}
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
                <h3 className="font-semibold text-foreground">
                  {t("dashboard.alerts.title")}
                </h3>
                <p className="text-sm text-muted-foreground">
                  3 {t("dashboard.alerts.pending")}
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
              {t("dashboard.consultations.recent")}
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
                time={t("time.scheduled")}
                confidence={0}
              />
            </div>
          </div>

          {/* System Trust Status - Rectangular Layout */}
          <Card className="p-6">
            <h3 className="mb-4 font-semibold text-foreground">
              {t("dashboard.trust.score")}
            </h3>
            <SystemTrustStatus />
          </Card>
        </div>

        {/* Right Column: Health Radar */}
        <div className="space-y-6">
          {/* Population Health Signals */}
          <Card className="p-6">
            <h3 className="mb-4 font-semibold text-foreground">
              {t("dashboard.health.signals")}
            </h3>
            <HealthSignalsMap />
          </Card>
        </div>
      </div>

      {/* Empty State Info */}
    </div>
  );
}
