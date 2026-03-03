"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  User,
  Bell,
  Lock,
  Eye,
  Database,
  Monitor,
  HelpCircle,
  Network,
} from "lucide-react";
import { UserSettings } from "./user-settings";
import { NotificationSettings } from "./notification-settings";
import { SecuritySettings } from "./security-settings";
import { DataPrivacySettings } from "./data-privacy-settings";
import { SystemSettings } from "./system-settings";
import { AWSArchitectureViewer } from "@/components/ui/aws-architecture-viewer";
import { AWSBadge } from "@/components/ui/aws-badge";

export function SettingsContent() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account, preferences, and system configuration
        </p>
      </div>

      {/* Settings Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
          <TabsTrigger value="profile" className="gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Alerts</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Lock className="h-4 w-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger value="privacy" className="gap-2">
            <Eye className="h-4 w-4" />
            <span className="hidden sm:inline">Privacy</span>
          </TabsTrigger>
          <TabsTrigger value="system" className="gap-2">
            <Monitor className="h-4 w-4" />
            <span className="hidden sm:inline">System</span>
          </TabsTrigger>
          <TabsTrigger value="architecture" className="gap-2">
            <Network className="h-4 w-4" />
            <span className="hidden sm:inline">Architecture</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <UserSettings />
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <NotificationSettings />
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <SecuritySettings />
        </TabsContent>

        <TabsContent value="privacy" className="space-y-4">
          <DataPrivacySettings />
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <SystemSettings />
        </TabsContent>

        <TabsContent value="architecture" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Network className="h-5 w-5 text-teal-600" />
                    AWS Architecture Overview
                  </CardTitle>
                  <CardDescription>
                    SwasthyaOS data pipeline and AI processing architecture
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <AWSBadge
                    service="Bedrock"
                    model="Claude 3 Sonnet"
                    status="active"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <AWSArchitectureViewer />
            </CardContent>
          </Card>

          {/* AWS Services Summary */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">AI/ML Services</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Amazon Bedrock</span>
                  <span className="text-emerald-500 font-medium">Active</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Amazon SageMaker
                  </span>
                  <span className="text-emerald-500 font-medium">Active</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Comprehend Medical
                  </span>
                  <span className="text-emerald-500 font-medium">Active</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Data Services</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    HealthLake (FHIR)
                  </span>
                  <span className="text-emerald-500 font-medium">Active</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Amazon Kinesis</span>
                  <span className="text-emerald-500 font-medium">Active</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Transcribe Medical
                  </span>
                  <span className="text-emerald-500 font-medium">Active</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Security & Compliance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">AWS KMS</span>
                  <span className="text-emerald-500 font-medium">Active</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">CloudTrail</span>
                  <span className="text-emerald-500 font-medium">Active</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Region</span>
                  <span className="font-mono text-teal-600">ap-south-1</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Help & Support */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-primary" />
            <CardTitle>Need Help?</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 md:flex-row">
          <Button variant="outline" className="flex-1 bg-transparent">
            Documentation
          </Button>
          <Button variant="outline" className="flex-1 bg-transparent">
            Contact Support
          </Button>
          <Button variant="outline" className="flex-1 bg-transparent">
            Report Issue
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
