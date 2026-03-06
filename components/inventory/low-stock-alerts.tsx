"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, TrendingDown, Clock, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function LowStockAlerts() {
  const { toast } = useToast();
  
  const alerts = [
    {
      id: 1,
      severity: 'critical',
      medication: 'Atorvastatin 20mg',
      currentStock: 82,
      minimumStock: 100,
      expiryDays: 45,
      message: 'Stock below minimum threshold',
      reorderQuantity: 150,
    },
    {
      id: 2,
      severity: 'warning',
      medication: 'Amoxicillin 250mg',
      currentStock: 45,
      minimumStock: 100,
      expiryDays: 150,
      message: 'Approaching low stock levels',
      reorderQuantity: 200,
    },
    {
      id: 3,
      severity: 'warning',
      medication: 'Omeprazole 20mg',
      currentStock: 95,
      minimumStock: 100,
      expiryDays: 105,
      message: 'Below minimum stock',
      reorderQuantity: 150,
    },
    {
      id: 4,
      severity: 'expiry',
      medication: 'Aspirin 100mg',
      currentStock: 200,
      minimumStock: 50,
      expiryDays: 15,
      message: 'Expiring soon - prioritize usage',
      reorderQuantity: 0,
    },
    {
      id: 5,
      severity: 'critical',
      medication: 'Insulin Vial 10ml',
      currentStock: 8,
      minimumStock: 25,
      expiryDays: 60,
      message: 'Critical stock level - urgent reorder needed',
      reorderQuantity: 100,
    },
  ];

  const severityStyles = {
    critical: {
      bg: 'bg-error/5 hover:bg-error/10 border-error/20 hover:border-error/40',
      text: 'text-error',
      badge: 'bg-error/10 text-error',
      icon: AlertCircle,
    },
    warning: {
      bg: 'bg-warning/5 hover:bg-warning/10 border-warning/20 hover:border-warning/40',
      text: 'text-warning-dark',
      badge: 'bg-warning/10 text-warning-dark',
      icon: TrendingDown,
    },
    expiry: {
      bg: 'bg-indigo-50/50 hover:bg-indigo-50 border-indigo-200 hover:border-indigo-300 dark:bg-indigo-950/20 dark:hover:bg-indigo-950/40 dark:border-indigo-800/50',
      text: 'text-indigo-600 dark:text-indigo-400',
      badge: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300',
      icon: Clock,
    },
  };

  return (
    <div className="space-y-3">
      {alerts.map((alert) => {
        const style = severityStyles[alert.severity as keyof typeof severityStyles];
        const Icon = style.icon;

        return (
          <div key={alert.id} className={`p-3 rounded-xl border transition-colors group ${style.bg}`}>
            <div className="flex items-start justify-between">
              <div className="flex gap-2 items-start">
                <div className="mt-0.5">
                  <Icon className={`h-4 w-4 ${style.text}`} />
                </div>
                <div>
                  <h4 className={`font-bold text-sm tracking-tight transition-colors ${style.text}`}>
                    {alert.medication}
                  </h4>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${style.badge}`}>
                      {alert.currentStock} left (Min: {alert.minimumStock})
                    </span>
                    {alert.severity === 'expiry' && (
                      <span className="text-[10px] text-muted-foreground font-medium">
                        Expires: {alert.expiryDays}d
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {alert.reorderQuantity > 0 && (
              <div className="mt-3 flex gap-2">
                <Button 
                  size="sm" 
                  className={`w-full text-xs font-semibold shadow-sm ${
                    alert.severity === 'critical' ? 'bg-error hover:bg-red-700 text-white' : 
                    alert.severity === 'warning' ? 'bg-amber-500 hover:bg-amber-600 text-white' : 
                    'bg-indigo-600 hover:bg-indigo-700 text-white'
                  }`}
                  onClick={() => {
                    toast({
                      title: "Purchase Order Initiated",
                      description: `Generating PO for ${alert.reorderQuantity} units of ${alert.medication}...`,
                    });
                  }}
                >
                  <Zap className="h-3 w-3 mr-1" />
                  Express Reorder
                </Button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
