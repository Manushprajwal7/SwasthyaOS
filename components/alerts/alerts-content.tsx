'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, AlertTriangle, Info, CheckCircle, Bell, Trash2, Archive } from 'lucide-react';

export function AlertsContent() {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      severity: 'critical',
      type: 'Emergency',
      title: 'Critical Vitals - Patient Alert',
      description: 'Patient John Doe (ID: P12345) - BP: 180/110, HR: 120 bpm - Immediate intervention required',
      timestamp: '2 minutes ago',
      read: false,
    },
    {
      id: 2,
      severity: 'warning',
      type: 'Patient Alert',
      title: 'Medication Allergy Warning',
      description: 'Patient Jane Smith scheduled for Penicillin has documented allergy. Check consultation before dispensing.',
      timestamp: '15 minutes ago',
      read: false,
    },
    {
      id: 3,
      severity: 'info',
      type: 'System',
      title: 'Data Sync Completed',
      description: 'Successfully synced 1,247 patient records with central database',
      timestamp: '1 hour ago',
      read: false,
    },
    {
      id: 4,
      severity: 'critical',
      type: 'Disease Outbreak',
      title: 'Dengue Outbreak Alert - District Level',
      description: 'Suspected dengue outbreak in North region with 47 confirmed cases in last 7 days',
      timestamp: '3 hours ago',
      read: true,
    },
    {
      id: 5,
      severity: 'warning',
      type: 'Low Stock',
      title: 'Critical Medication Stock Low',
      description: 'Insulin vials stock below minimum threshold - immediate reorder recommended',
      timestamp: '4 hours ago',
      read: true,
    },
    {
      id: 6,
      severity: 'info',
      type: 'Appointment',
      title: 'Appointment Reminder',
      description: 'Reminder: Consultation with Dr. Priya Sharma at 2:00 PM today',
      timestamp: 'Yesterday',
      read: true,
    },
  ]);

  const severityIcons = {
    critical: <AlertCircle className="h-5 w-5 text-error" />,
    warning: <AlertTriangle className="h-5 w-5 text-warning" />,
    info: <Info className="h-5 w-5 text-primary" />,
  };

  const severityColors = {
    critical: 'border-error/30 bg-error/5',
    warning: 'border-warning/30 bg-warning/5',
    info: 'border-primary/30 bg-primary/5',
  };

  const unreadCount = alerts.filter((a) => !a.read).length;
  const criticalCount = alerts.filter((a) => a.severity === 'critical' && !a.read).length;

  const handleMarkAsRead = (id: number) => {
    setAlerts((prev) =>
      prev.map((alert) => (alert.id === id ? { ...alert, read: true } : alert))
    );
  };

  const handleDelete = (id: number) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  const handleClearAll = () => {
    setAlerts((prev) => prev.map((alert) => ({ ...alert, read: true })));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Emergency Alerts & Notifications</h1>
          <p className="text-muted-foreground">Real-time critical alerts and system notifications</p>
        </div>
        <Button variant="outline" onClick={handleClearAll} className="gap-2 md:w-auto w-full bg-transparent">
          <CheckCircle className="h-4 w-4" />
          Mark All as Read
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-error/30">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Critical Alerts</p>
            <p className="text-2xl font-bold text-error">{criticalCount}</p>
            <p className="text-xs text-error">Requires immediate action</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Unread Messages</p>
            <p className="text-2xl font-bold">{unreadCount}</p>
            <p className="text-xs text-muted-foreground">New notifications</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Alerts</p>
            <p className="text-2xl font-bold">{alerts.length}</p>
            <p className="text-xs text-muted-foreground">All-time notifications</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Response Time</p>
            <p className="text-2xl font-bold">2.3m</p>
            <p className="text-xs text-success">Average response time</p>
          </CardContent>
        </Card>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {alerts.map((alert) => (
          <Card
            key={alert.id}
            className={`border-2 transition-all ${severityColors[alert.severity as keyof typeof severityColors]} ${!alert.read ? 'ring-1 ring-offset-1 ring-primary' : ''}`}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="mt-1">{severityIcons[alert.severity as keyof typeof severityIcons]}</div>

                {/* Content */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className={`font-semibold ${!alert.read ? 'font-bold' : ''}`}>{alert.title}</h3>
                    <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs font-medium text-muted-foreground">
                      {alert.type}
                    </span>
                    {!alert.read && (
                      <span className="h-2 w-2 rounded-full bg-primary" />
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground">{alert.description}</p>

                  <p className="text-xs text-muted-foreground">{alert.timestamp}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-1">
                  {!alert.read && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleMarkAsRead(alert.id)}
                      title="Mark as read"
                    >
                      <CheckCircle className="h-4 w-4 text-success" />
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(alert.id)}
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4 text-error" />
                  </Button>
                </div>
              </div>

              {/* Action Buttons for Critical */}
              {alert.severity === 'critical' && !alert.read && (
                <div className="mt-4 flex gap-2 border-t pt-4">
                  <Button size="sm" className="flex-1 bg-error hover:bg-red-700">
                    Take Action
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    View Details
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Alert History */}
      <Card>
        <CardHeader>
          <CardTitle>Alert Statistics</CardTitle>
          <CardDescription>Alert trends over the last 30 days</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { type: 'Critical Alerts', count: 23, trend: '+8%', color: 'bg-error' },
            { type: 'Warning Alerts', count: 67, trend: '+12%', color: 'bg-warning' },
            { type: 'Information', count: 142, trend: '-3%', color: 'bg-primary' },
          ].map((stat, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{stat.type}</span>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">{stat.count}</span>
                  <span className="text-xs text-success">{stat.trend}</span>
                </div>
              </div>
              <div className="h-2 rounded-full bg-slate-100">
                <div
                  className={`h-2 rounded-full ${stat.color}`}
                  style={{ width: `${Math.min(stat.count / 2, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
