'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, TrendingDown, Clock, Zap } from 'lucide-react';

export function LowStockAlerts() {
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
      bg: 'bg-error/10 border-error/50',
      text: 'text-error',
      badge: 'bg-error/20 text-error',
      icon: AlertCircle,
    },
    warning: {
      bg: 'bg-warning/10 border-warning/50',
      text: 'text-warning',
      badge: 'bg-warning/20 text-warning',
      icon: TrendingDown,
    },
    expiry: {
      bg: 'bg-error/10 border-error/50',
      text: 'text-error',
      badge: 'bg-error/20 text-error',
      icon: Clock,
    },
  };

  return (
    <div className="space-y-4">
      {/* Alert Summary */}
      <div className="grid gap-3 md:grid-cols-3">
        <Card className="border-error/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Critical Alerts</p>
                <p className="text-2xl font-bold text-error">2</p>
              </div>
              <AlertCircle className="h-8 w-8 text-error/30" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-warning/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Warning Alerts</p>
                <p className="text-2xl font-bold text-warning">2</p>
              </div>
              <TrendingDown className="h-8 w-8 text-warning/30" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-error/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Expiry Alerts</p>
                <p className="text-2xl font-bold text-error">1</p>
              </div>
              <Clock className="h-8 w-8 text-error/30" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {alerts.map((alert) => {
          const style = severityStyles[alert.severity as keyof typeof severityStyles];
          const Icon = style.icon;

          return (
            <Card key={alert.id} className={`border-2 ${style.bg}`}>
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <Icon className={`h-6 w-6 ${style.text} flex-shrink-0 mt-1`} />

                  {/* Content */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{alert.medication}</h3>
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${style.badge}`}>
                        {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground">{alert.message}</p>

                    {/* Stats */}
                    <div className="grid gap-2 md:grid-cols-4 text-sm">
                      <div>
                        <p className="text-muted-foreground text-xs">Current Stock</p>
                        <p className="font-medium">{alert.currentStock} units</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">Minimum Required</p>
                        <p className="font-medium">{alert.minimumStock} units</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">Expiry in</p>
                        <p className="font-medium">{alert.expiryDays} days</p>
                      </div>
                      {alert.reorderQuantity > 0 && (
                        <div>
                          <p className="text-muted-foreground text-xs">Suggested Reorder</p>
                          <p className="font-medium">{alert.reorderQuantity} units</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  {alert.reorderQuantity > 0 && (
                    <Button size="sm" className="bg-primary hover:bg-primary-light gap-1">
                      <Zap className="h-3 w-3" />
                      Reorder
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
