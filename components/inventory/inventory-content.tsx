"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Package, AlertTriangle, TrendingUp, History, Plus, Search, Calendar, Clock } from "lucide-react";
import { MedicationInventory } from "./medication-inventory";
import { LowStockAlerts } from "./low-stock-alerts";
import { InventoryHistory } from "./inventory-history";
import { LivePulse } from "@/components/ui/live-pulse";
import { AWSBadge } from "@/components/ui/aws-badge";
import { useToast } from "@/hooks/use-toast";

export function InventoryContent() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [dateStr, setDateStr] = useState("");
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const now = new Date();
    setDateStr(
      now.toLocaleDateString("en-IN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
    setTimeStr(
      now.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  }, []);

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-full">
      {/* ===== Welcome Banner ===== */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fade-in-up">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground font-heading">
            Medication Inventory
          </h1>
          <p className="mt-1 text-sm text-muted-foreground flex items-center gap-2">
            <Calendar className="h-3.5 w-3.5" />
            {dateStr}
            <span className="text-slate-300 dark:text-slate-600">|</span>
            <Clock className="h-3.5 w-3.5" />
            {timeStr}
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-teal-50 dark:bg-teal-950/30 px-3 py-1.5 rounded-full border border-teal-200 dark:border-teal-800">
            <LivePulse active color="green" size="sm" />
            <span>Supply Chain Sync</span>
          </div>
          <AWSBadge service="SupplyChain" status="active" />
        </div>
      </div>

      {/* ===== Layout Wrapper: 12-Column Grid ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-6">
        
        {/* ========================================================
            TOP ROW (Col Span 12): System Metrics
            ======================================================== */}
        <div className="lg:col-span-12 grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in-up" style={{ animationDelay: "0.05s" }}>
          <Card className="bg-slate-50 dark:bg-slate-900 border-border shadow-sm">
            <CardHeader className="pb-2 p-4">
              <CardTitle className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-2">
                Total Items
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-2xl font-bold font-heading text-slate-800 dark:text-slate-100">156</div>
              <p className="text-[11px] font-medium text-emerald-600 dark:text-emerald-500 mt-1 flex items-center gap-1">
                <span>Medication Types Active</span>
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-50 dark:bg-slate-900 border-border shadow-sm">
            <CardHeader className="pb-2 p-4">
              <CardTitle className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-2">
                Low Stock Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-2xl font-bold font-heading text-slate-800 dark:text-slate-100">12</div>
              <p className="text-[11px] font-medium text-amber-600 dark:text-amber-500 mt-1">
                Items below critical threshold
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-50 dark:bg-slate-900 border-border shadow-sm">
            <CardHeader className="pb-2 p-4">
              <CardTitle className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-2">
                Expiring Soon
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-2xl font-bold font-heading text-slate-800 dark:text-slate-100">5</div>
              <p className="text-[11px] font-medium text-red-600 dark:text-red-500 mt-1">
                Items expire within 30 days
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-50 dark:bg-slate-900 border-border shadow-sm">
            <CardHeader className="pb-2 p-4">
              <CardTitle className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-2">
                Total Value
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-2xl font-bold font-heading text-slate-800 dark:text-slate-100">₹2.34L</div>
              <p className="text-[11px] font-medium text-emerald-600 dark:text-emerald-500 mt-1">
                Estimated current inventory
              </p>
            </CardContent>
          </Card>
        </div>

        {/* ========================================================
            LEFT PILLAR (Col Span 8): Inventory Workspace
            ======================================================== */}
        <div className="lg:col-span-8 flex flex-col h-[calc(100vh-20rem)] animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <Tabs defaultValue="inventory" className="flex flex-col h-full space-y-4" onValueChange={(v) => {
            toast({
              title: "Inventory Database",
              description: `Viewing ${v} data.`,
            });
          }}>
            <div className="flex items-center justify-between pr-2">
               <div className="flex-1 flex gap-2">
                <TabsList className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <TabsTrigger value="inventory" className="gap-2 text-xs font-semibold data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    <Package className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Active Database</span>
                  </TabsTrigger>
                  <TabsTrigger value="history" className="gap-2 text-xs font-semibold data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    <History className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Audit History</span>
                  </TabsTrigger>
                </TabsList>
              </div>

               {/* Quick Search */}
               <div className="hidden sm:flex flex-1 max-w-xs items-center gap-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg p-2 border border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                  <Search className="h-4 w-4 text-muted-foreground ml-1" />
                  <input
                    type="text"
                    placeholder="Search medication..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 text-sm bg-transparent outline-none placeholder-muted-foreground"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery("")}
                      className="text-xs text-muted-foreground hover:text-foreground mr-1"
                    >
                      Clear
                    </button>
                  )}
               </div>
            </div>

            <Card className="flex-1 overflow-hidden shadow-sm border border-border bg-white dark:bg-slate-900 relative">
               <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-teal-400 via-emerald-400 to-indigo-400 opacity-90 z-10" />
               <div className="h-full overflow-y-auto custom-scrollbar p-6">
                <TabsContent value="inventory" className="mt-0 h-full">
                  {/* Mobile Search - Visible only on small screens */}
                  <div className="sm:hidden flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg p-2 border border-slate-200 dark:border-slate-700 mb-4">
                    <Search className="h-4 w-4 text-muted-foreground ml-1" />
                    <input
                      type="text"
                      placeholder="Search medication..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 text-sm bg-transparent outline-none placeholder-muted-foreground"
                    />
                  </div>
                  <MedicationInventory searchQuery={searchQuery} />
                </TabsContent>

                <TabsContent value="history" className="mt-0 h-full">
                  <InventoryHistory />
                </TabsContent>
               </div>
            </Card>
          </Tabs>
        </div>

        {/* ========================================================
            RIGHT PILLAR (Col Span 4): Alerts & Actions
            ======================================================== */}
        <div className="lg:col-span-4 space-y-6 flex flex-col h-[calc(100vh-20rem)] overflow-y-auto custom-scrollbar pl-1 animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
          
          {/* Action Header */}
          <Button
            onClick={() => {
              toast({
                title: "Scanner Initialized",
                description: "Opening barcode scanner and manual entry form...",
              });
            }}
            className="w-full gap-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm h-12 text-sm font-bold tracking-wide"
          >
            <Plus className="h-4 w-4" />
            RECEIVE NEW SHIPMENT
          </Button>

          {/* Low Stock Alerts Container */}
          <Card className="flex flex-col shadow-sm border border-border bg-white dark:bg-slate-900 relative flex-1">
             <div className="p-4 border-b border-error/20 flex items-center justify-between bg-error/5">
               <div className="flex items-center gap-2">
                 <AlertTriangle className="h-4 w-4 text-error" />
                 <h4 className="font-semibold text-error text-sm tracking-tight">
                   Low Stock Alerts
                 </h4>
               </div>
             </div>

             <div className="p-4 space-y-4 overflow-y-auto custom-scrollbar flex-1">
                <LowStockAlerts />
             </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
