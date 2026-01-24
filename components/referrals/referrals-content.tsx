'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Send, Clock, CheckCircle, AlertCircle, Plus } from 'lucide-react';

export function ReferralsContent() {
  const [referrals, setReferrals] = useState([
    {
      id: 1,
      patientName: 'John Doe',
      patientId: 'P12345',
      referredFrom: 'Rural PHC - Village Center',
      referredTo: 'District Hospital - Cardiology',
      referralDate: 'Dec 14, 2024',
      reason: 'Suspected cardiac condition - Requires ECG & Specialist consultation',
      status: 'accepted',
      priority: 'high',
      acceptedDate: 'Dec 14, 2024 - 11:30 AM',
    },
    {
      id: 2,
      patientName: 'Jane Smith',
      patientId: 'P12346',
      referredFrom: 'Central Hospital - ER',
      referredTo: 'Specialized Trauma Center',
      referralDate: 'Dec 15, 2024',
      reason: 'Multiple trauma injuries - Requires surgical intervention',
      status: 'pending',
      priority: 'critical',
      acceptedDate: null,
    },
    {
      id: 3,
      patientName: 'Robert Johnson',
      patientId: 'P12347',
      referredFrom: 'Community Clinic',
      referredTo: 'District Hospital - Orthopedics',
      referralDate: 'Dec 13, 2024',
      reason: 'Fracture management - Specialist orthopedic care',
      status: 'completed',
      priority: 'medium',
      acceptedDate: 'Dec 13, 2024 - 2:15 PM',
    },
  ]);

  const statusColors = {
    pending: 'bg-warning/10 text-warning border-warning/30',
    accepted: 'bg-success/10 text-success border-success/30',
    completed: 'bg-primary/10 text-primary border-primary/30',
    rejected: 'bg-error/10 text-error border-error/30',
  };

  const priorityBadges = {
    critical: 'bg-error/20 text-error',
    high: 'bg-warning/20 text-warning',
    medium: 'bg-primary/20 text-primary',
    low: 'bg-slate-200 text-slate-700',
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Referral & Transfer Tracking</h1>
          <p className="text-muted-foreground">Manage patient referrals and inter-facility transfers</p>
        </div>
        <Button className="gap-2 bg-primary hover:bg-primary-light md:w-auto w-full">
          <Plus className="h-4 w-4" />
          New Referral
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Pending Referrals</p>
            <p className="text-2xl font-bold text-warning">8</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Accepted</p>
            <p className="text-2xl font-bold text-success">142</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Completed</p>
            <p className="text-2xl font-bold">387</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Acceptance Rate</p>
            <p className="text-2xl font-bold">94.2%</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active" className="gap-2">
            <Clock className="h-4 w-4" />
            Active
          </TabsTrigger>
          <TabsTrigger value="history" className="gap-2">
            <CheckCircle className="h-4 w-4" />
            History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <div className="space-y-3">
            {referrals.filter((r) => r.status !== 'completed').map((referral) => (
              <Card key={referral.id} className={`border-2 ${statusColors[referral.status as keyof typeof statusColors]}`}>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold">{referral.patientName}</h3>
                        <p className="text-xs text-muted-foreground">ID: {referral.patientId}</p>
                      </div>
                      <div className="flex gap-2">
                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${priorityBadges[referral.priority as keyof typeof priorityBadges]}`}>
                          {referral.priority.charAt(0).toUpperCase() + referral.priority.slice(1)}
                        </span>
                        <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs font-medium text-slate-700">
                          {referral.status.charAt(0).toUpperCase() + referral.status.slice(1)}
                        </span>
                      </div>
                    </div>

                    <div className="grid gap-2 text-sm md:grid-cols-2">
                      <div>
                        <p className="text-muted-foreground text-xs">From</p>
                        <p className="font-medium">{referral.referredFrom}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">To</p>
                        <p className="font-medium">{referral.referredTo}</p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-muted-foreground text-xs">Reason</p>
                        <p className="font-medium">{referral.reason}</p>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2 border-t">
                      <p className="text-xs text-muted-foreground flex-1">Referred: {referral.referralDate}</p>
                      {referral.status === 'pending' && (
                        <div className="flex gap-1">
                          <Button size="sm" className="bg-success hover:bg-success-dark gap-1">
                            <CheckCircle className="h-3 w-3" />
                            Accept
                          </Button>
                          <Button size="sm" variant="outline">
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history">
          <div className="space-y-3">
            {referrals.filter((r) => r.status === 'completed').map((referral) => (
              <Card key={referral.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{referral.patientName}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{referral.reason}</p>
                      <p className="text-xs text-muted-foreground mt-2">Completed: {referral.acceptedDate}</p>
                    </div>
                    <CheckCircle className="h-5 w-5 text-success" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
