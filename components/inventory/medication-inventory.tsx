"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Edit2, ExternalLink, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Medication {
  id: number;
  name: string;
  batch: string;
  quantity: number;
  minStock: number;
  maxStock: number;
  expiryDate: string;
  unitCost: string;
  status: string;
}

interface MedicationInventoryProps {
  searchQuery: string;
  medications: Medication[];
}

export function MedicationInventory({
  searchQuery,
  medications,
}: MedicationInventoryProps) {
  const { toast } = useToast();

  const statusColors = {
    optimal: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800",
    low: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800",
    critical: "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800",
  };

  const statusIcons = {
    optimal: null,
    low: <AlertCircle className="h-3 w-3 mr-1" />,
    critical: <AlertCircle className="h-3 w-3 mr-1" />,
  };

  const filteredMeds = medications.filter(
    (med) =>
      med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.batch.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-3">
      {filteredMeds.map((med) => (
        <div
          key={med.id}
          className="group relative flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl border border-border bg-white dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all hover:shadow-md"
        >
          {/* Left: Med Details */}
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-3">
              <h3 className="font-bold text-foreground tracking-tight text-base group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {med.name}
              </h3>
              <span
                className={`flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border ${
                  statusColors[med.status as keyof typeof statusColors]
                }`}
              >
                {statusIcons[med.status as keyof typeof statusIcons]}
                {med.status}
              </span>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm mt-2">
              <div>
                <p className="text-[10px] text-muted-foreground uppercase font-semibold tracking-wider">
                  Current Stock
                </p>
                <p className="font-medium text-slate-700 dark:text-slate-300">
                  {med.quantity} <span className="text-xs text-muted-foreground font-normal">units</span>
                </p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase font-semibold tracking-wider">
                  Min / Max Target
                </p>
                <p className="font-medium text-slate-700 dark:text-slate-300">
                  {med.minStock} / {med.maxStock}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase font-semibold tracking-wider">
                  Expiry
                </p>
                <p className="font-medium text-slate-700 dark:text-slate-300">
                  {new Date(med.expiryDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase font-semibold tracking-wider">
                  Batch ID
                </p>
                <p className="font-mono text-xs mt-0.5 font-medium text-slate-600 dark:text-slate-400">
                  {med.batch}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 pt-3 md:pt-0 border-t md:border-0 border-border">
             <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs font-medium border-slate-200 dark:border-slate-700"
                onClick={() => {
                  toast({
                    title: "Edit Medication",
                    description: `Opening edit form for ${med.name} (${med.batch})`,
                  });
                }}
              >
                <Edit2 className="h-3 w-3 mr-1.5 text-muted-foreground" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 border-slate-200 dark:border-slate-700"
                onClick={() => {
                  toast({
                    title: "Supplier Details",
                    description: `Fetching origin data for Batch ${med.batch}...`,
                  });
                }}
              >
                <ExternalLink className="h-3 w-3 text-muted-foreground" />
              </Button>
          </div>
          
          {/* Subtle accent line for critical meds */}
          {med.status === "critical" && (
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500 rounded-l-xl opacity-80" />
          )}
        </div>
      ))}
    </div>
  );
}
