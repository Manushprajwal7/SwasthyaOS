'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { FileText } from 'lucide-react';

interface HistoryEntry {
  id: number;
  date: string;
  action: string;
  medication: string;
  quantity: string;
  reference: string;
  user: string;
  status: string;
}

interface InventoryHistoryProps {
  history: HistoryEntry[];
}

export function InventoryHistory({ history }: InventoryHistoryProps) {
  const { toast } = useToast();

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

                {/* Status & Actions */}
                <div className="text-right flex flex-col items-end gap-2">
                  <span className="rounded-full bg-success/10 px-2 py-0.5 text-xs font-medium text-success">
                    {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
                  </span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-7 text-[10px] uppercase font-bold text-muted-foreground hover:text-indigo-600 px-2"
                    onClick={() => toast({
                      title: "Transaction Details",
                      description: `Entry ID: ${entry.id} | Ref: ${entry.reference} | Ledger verified by ${entry.user}. Transaction confirmed via SupplyChain model.`,
                    })}
                  >
                    <FileText className="h-3 w-3 mr-1" />
                    Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
