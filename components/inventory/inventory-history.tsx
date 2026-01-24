'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function InventoryHistory() {
  const history = [
    {
      id: 1,
      date: 'Dec 15, 2024 - 2:30 PM',
      action: 'Stock In',
      medication: 'Paracetamol 500mg',
      quantity: '+200 units',
      reference: 'PO-2024-001',
      user: 'Admin User',
      status: 'completed',
    },
    {
      id: 2,
      date: 'Dec 15, 2024 - 10:15 AM',
      action: 'Stock Out',
      medication: 'Amoxicillin 250mg',
      quantity: '-50 units',
      reference: 'CONS-2024-0847',
      user: 'Dr. Rajesh Kumar',
      status: 'completed',
    },
    {
      id: 3,
      date: 'Dec 14, 2024 - 4:45 PM',
      action: 'Expiry Mark',
      medication: 'Aspirin 100mg',
      quantity: '-30 units',
      reference: 'EXP-2024-012',
      user: 'Pharmacy Tech',
      status: 'completed',
    },
    {
      id: 4,
      date: 'Dec 14, 2024 - 1:20 PM',
      action: 'Adjustment',
      medication: 'Metformin 500mg',
      quantity: '+5 units',
      reference: 'ADJ-2024-0156',
      user: 'Inventory Manager',
      status: 'completed',
    },
    {
      id: 5,
      date: 'Dec 13, 2024 - 9:30 AM',
      action: 'Stock In',
      medication: 'Lisinopril 10mg',
      quantity: '+150 units',
      reference: 'PO-2024-000',
      user: 'Admin User',
      status: 'completed',
    },
    {
      id: 6,
      date: 'Dec 12, 2024 - 3:15 PM',
      action: 'Stock Out',
      medication: 'Omeprazole 20mg',
      quantity: '-35 units',
      reference: 'CONS-2024-0823',
      user: 'Dr. Priya Sharma',
      status: 'completed',
    },
  ];

  const actionColors = {
    'Stock In': 'bg-success/10 text-success',
    'Stock Out': 'bg-error/10 text-error',
    'Adjustment': 'bg-warning/10 text-warning',
    'Expiry Mark': 'bg-error/10 text-error',
  };

  return (
    <div className="space-y-4">
      {/* Summary Stats */}
      <div className="grid gap-3 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Stock In Transactions</p>
            <p className="text-2xl font-bold">3</p>
            <p className="text-xs text-success">+455 units</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Stock Out Transactions</p>
            <p className="text-2xl font-bold">2</p>
            <p className="text-xs text-error">-85 units</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Adjustments</p>
            <p className="text-2xl font-bold">1</p>
            <p className="text-xs text-warning">+5 units</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Expiry Markoffs</p>
            <p className="text-2xl font-bold">1</p>
            <p className="text-xs text-error">-30 units</p>
          </CardContent>
        </Card>
      </div>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>Recent inventory transactions and adjustments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {history.map((entry) => (
              <div key={entry.id} className="flex items-start gap-4 pb-4 border-b last:border-0">
                {/* Timeline Dot */}
                <div className="mt-1.5">
                  <div className={`h-3 w-3 rounded-full ${
                    entry.action === 'Stock In'
                      ? 'bg-success'
                      : entry.action === 'Stock Out'
                        ? 'bg-error'
                        : entry.action === 'Expiry Mark'
                          ? 'bg-error'
                          : 'bg-warning'
                  }`} />
                </div>

                {/* Content */}
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${actionColors[entry.action as keyof typeof actionColors]}`}>
                      {entry.action}
                    </span>
                    <span className="text-sm font-medium">{entry.medication}</span>
                    <span className="text-sm font-semibold text-primary">{entry.quantity}</span>
                  </div>
                  <div className="grid gap-2 md:grid-cols-3 text-xs text-muted-foreground">
                    <div>{entry.date}</div>
                    <div>By: {entry.user}</div>
                    <div>Ref: {entry.reference}</div>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="text-right">
                  <span className="rounded-full bg-success/10 px-2 py-0.5 text-xs font-medium text-success">
                    {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
