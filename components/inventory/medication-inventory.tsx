'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2, AlertCircle } from 'lucide-react';

interface MedicationInventoryProps {
  searchQuery: string;
}

export function MedicationInventory({ searchQuery }: MedicationInventoryProps) {
  const medications = [
    {
      id: 1,
      name: 'Paracetamol 500mg',
      batch: 'BATCH-001',
      quantity: 450,
      minStock: 100,
      maxStock: 500,
      expiryDate: '2025-12-31',
      unitCost: '₹2.50',
      status: 'optimal',
    },
    {
      id: 2,
      name: 'Amoxicillin 250mg',
      batch: 'BATCH-002',
      quantity: 45,
      minStock: 100,
      maxStock: 300,
      expiryDate: '2025-06-15',
      unitCost: '₹8.00',
      status: 'low',
    },
    {
      id: 3,
      name: 'Metformin 500mg',
      batch: 'BATCH-003',
      quantity: 280,
      minStock: 150,
      maxStock: 400,
      expiryDate: '2025-09-30',
      unitCost: '₹1.50',
      status: 'optimal',
    },
    {
      id: 4,
      name: 'Atorvastatin 20mg',
      batch: 'BATCH-004',
      quantity: 82,
      minStock: 100,
      maxStock: 250,
      expiryDate: '2025-03-20',
      unitCost: '₹15.00',
      status: 'critical',
    },
    {
      id: 5,
      name: 'Lisinopril 10mg',
      batch: 'BATCH-005',
      quantity: 320,
      minStock: 100,
      maxStock: 400,
      expiryDate: '2026-01-15',
      unitCost: '₹12.00',
      status: 'optimal',
    },
    {
      id: 6,
      name: 'Omeprazole 20mg',
      batch: 'BATCH-006',
      quantity: 95,
      minStock: 100,
      maxStock: 300,
      expiryDate: '2025-05-10',
      unitCost: '₹6.50',
      status: 'low',
    },
  ];

  const statusColors = {
    optimal: 'bg-success/10 text-success',
    low: 'bg-warning/10 text-warning',
    critical: 'bg-error/10 text-error',
  };

  const statusIcons = {
    optimal: null,
    low: <AlertCircle className="h-4 w-4 inline mr-1" />,
    critical: <AlertCircle className="h-4 w-4 inline mr-1" />,
  };

  const filteredMeds = medications.filter((med) =>
    med.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-3">
      {filteredMeds.map((med) => (
        <Card key={med.id} className="hover:border-primary transition-colors">
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-3">
                {/* Header */}
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold flex-1">{med.name}</h3>
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusColors[med.status as keyof typeof statusColors]}`}>
                    {statusIcons[med.status as keyof typeof statusIcons]}
                    {med.status.charAt(0).toUpperCase() + med.status.slice(1)}
                  </span>
                </div>

                {/* Details Grid */}
                <div className="grid gap-3 md:grid-cols-5 text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs">Quantity</p>
                    <p className="font-medium">{med.quantity} units</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Min/Max Stock</p>
                    <p className="font-medium">{med.minStock} / {med.maxStock}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Expiry Date</p>
                    <p className="font-medium">{med.expiryDate}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Unit Cost</p>
                    <p className="font-medium">{med.unitCost}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Batch Number</p>
                    <p className="font-medium">{med.batch}</p>
                  </div>
                </div>

                {/* Stock Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Stock Level</span>
                    <span className="font-medium">{Math.round((med.quantity / med.maxStock) * 100)}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100">
                    <div
                      className={`h-2 rounded-full ${
                        med.status === 'optimal'
                          ? 'bg-success'
                          : med.status === 'low'
                            ? 'bg-warning'
                            : 'bg-error'
                      }`}
                      style={{ width: `${Math.min((med.quantity / med.maxStock) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button size="sm" variant="ghost">
                  <Edit2 className="h-4 w-4 text-primary" />
                </Button>
                <Button size="sm" variant="ghost">
                  <Trash2 className="h-4 w-4 text-error" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
