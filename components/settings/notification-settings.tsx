'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, Check } from 'lucide-react';

export function NotificationSettings() {
  const [notifications, setNotifications] = useState({
    newConsultation: true,
    patientAlert: true,
    diseaseOutbreak: true,
    appointmentReminder: true,
    medicationRefill: true,
    systemMaintenance: false,
    reportGenerated: true,
    aiRecommendation: true,
    emergencyAlert: true,
    dataSync: false,
  });

  const [channels, setChannels] = useState({
    inApp: true,
    email: true,
    sms: false,
    push: true,
  });

  const toggleNotification = (key: string) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleChannel = (key: string) => {
    setChannels((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-4">
      {/* Alert Type Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Alert Types</CardTitle>
          <CardDescription>Choose which notifications you want to receive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries({
            newConsultation: 'New Consultation Request',
            patientAlert: 'Patient Alert / Critical Condition',
            diseaseOutbreak: 'Disease Outbreak Alert',
            appointmentReminder: 'Appointment Reminders',
            medicationRefill: 'Medication Refill Alerts',
            reportGenerated: 'Report Generated',
            aiRecommendation: 'AI Recommendations',
            emergencyAlert: 'Emergency Cases',
            systemMaintenance: 'System Maintenance Notices',
            dataSync: 'Data Synchronization',
          }).map(([key, label]) => (
            <div key={key} className="flex items-center justify-between py-2 border-b last:border-0">
              <label className="text-sm font-medium cursor-pointer">{label}</label>
              <button
                onClick={() => toggleNotification(key)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notifications[key as keyof typeof notifications]
                    ? 'bg-primary'
                    : 'bg-slate-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifications[key as keyof typeof notifications]
                      ? 'translate-x-6'
                      : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Notification Channels */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Channels</CardTitle>
          <CardDescription>Select how you want to receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries({
            inApp: 'In-App Notifications',
            email: 'Email Notifications',
            sms: 'SMS Alerts',
            push: 'Push Notifications',
          }).map(([key, label]) => (
            <div key={key} className="flex items-center justify-between py-2 border-b last:border-0">
              <label className="text-sm font-medium cursor-pointer">{label}</label>
              <button
                onClick={() => toggleChannel(key)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  channels[key as keyof typeof channels]
                    ? 'bg-primary'
                    : 'bg-slate-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    channels[key as keyof typeof channels]
                      ? 'translate-x-6'
                      : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Priority & Quiet Hours */}
      <Card>
        <CardHeader>
          <CardTitle>Priority Settings</CardTitle>
          <CardDescription>Manage notification priorities and quiet hours</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Quiet Hours */}
          <div className="border-b pb-4">
            <h3 className="font-medium mb-3">Quiet Hours</h3>
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium mb-1">Start Time</label>
                <input
                  type="time"
                  defaultValue="22:00"
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">End Time</label>
                <input
                  type="time"
                  defaultValue="07:00"
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Only critical alerts will be delivered during quiet hours
            </p>
          </div>

          {/* Critical Only */}
          <div>
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="rounded" />
              <span className="text-sm font-medium">
                Allow critical alerts to bypass quiet hours
              </span>
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button className="flex-1 bg-primary hover:bg-primary-light gap-2">
          <Check className="h-4 w-4" />
          Save Preferences
        </Button>
        <Button variant="outline" className="flex-1 bg-transparent">
          Reset to Default
        </Button>
      </div>
    </div>
  );
}
