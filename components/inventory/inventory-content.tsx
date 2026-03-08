"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { MedicationInventory } from "./medication-inventory";
import { LowStockAlerts } from "./low-stock-alerts";
import { InventoryHistory } from "./inventory-history";
import { LivePulse } from "@/components/ui/live-pulse";
import { AWSBadge } from "@/components/ui/aws-badge";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/language-context";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Zap, Package, AlertTriangle, TrendingUp, History, Plus, Search, Calendar, Clock, Check } from "lucide-react";

export function InventoryContent() {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [dateStr, setDateStr] = useState("");
  const [timeStr, setTimeStr] = useState("");
  const [isAddingShipment, setIsAddingShipment] = useState(false);

  // Lifted State
  const [medications, setMedications] = useState([
    {
      id: 1,
      name: "Paracetamol 500mg",
      batch: "BATCH-001",
      quantity: 450,
      minStock: 100,
      maxStock: 500,
      expiryDate: "2025-12-31",
      unitCost: "₹2.50",
      status: "optimal",
    },
    {
      id: 2,
      name: "Amoxicillin 250mg",
      batch: "BATCH-002",
      quantity: 45,
      minStock: 100,
      maxStock: 300,
      expiryDate: "2025-06-15",
      unitCost: "₹8.00",
      status: "low",
    },
    {
      id: 3,
      name: "Metformin 500mg",
      batch: "BATCH-003",
      quantity: 280,
      minStock: 150,
      maxStock: 400,
      expiryDate: "2025-09-30",
      unitCost: "₹1.50",
      status: "optimal",
    },
    {
      id: 4,
      name: "Atorvastatin 20mg",
      batch: "BATCH-004",
      quantity: 82,
      minStock: 100,
      maxStock: 250,
      expiryDate: "2025-03-20",
      unitCost: "₹15.00",
      status: "critical",
    },
    {
      id: 5,
      name: "Lisinopril 10mg",
      batch: "BATCH-005",
      quantity: 320,
      minStock: 100,
      maxStock: 400,
      expiryDate: "2026-01-15",
      unitCost: "₹12.00",
      status: "optimal",
    },
    {
      id: 6,
      name: "Omeprazole 20mg",
      batch: "BATCH-006",
      quantity: 95,
      minStock: 100,
      maxStock: 300,
      expiryDate: "2025-05-10",
      unitCost: "₹6.50",
      status: "low",
    },
  ]);

  const [history, setHistory] = useState([
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
  ]);

  const [newShipment, setNewShipment] = useState({
    name: "",
    batch: "",
    quantity: "",
    expiryDate: "",
    unitCost: "",
  });

  const handleAddShipment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newShipment.name || !newShipment.batch || !newShipment.quantity) return;

    const qty = parseInt(newShipment.quantity);
    
    // Update Medications
    setMedications(prev => {
      const existingIdx = prev.findIndex(m => m.name === newShipment.name);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: updated[existingIdx].quantity + qty,
          batch: newShipment.batch,
          expiryDate: newShipment.expiryDate || updated[existingIdx].expiryDate,
        };
        return updated;
      }
      return [{
        id: prev.length + 1,
        name: newShipment.name,
        batch: newShipment.batch,
        quantity: qty,
        minStock: 100,
        maxStock: 500,
        expiryDate: newShipment.expiryDate || "2026-01-01",
        unitCost: `₹${newShipment.unitCost || "0.00"}`,
        status: "optimal",
      }, ...prev];
    });

    // Update History
    setHistory(prev => [{
      id: prev.length + 1,
      date: new Date().toLocaleString("en-IN", { 
        day: 'numeric', month: 'short', year: 'numeric', 
        hour: '2-digit', minute: '2-digit' 
      }),
      action: 'Stock In',
      medication: newShipment.name,
      quantity: `+${qty} units`,
      reference: `REC-${Math.floor(Math.random() * 9000) + 1000}`,
      user: 'Admin User',
      status: 'completed',
    }, ...prev]);

    setIsAddingShipment(false);
    setNewShipment({ name: "", batch: "", quantity: "", expiryDate: "", unitCost: "" });

    toast({
      title: "Shipment Received",
      description: `Successfully added ${qty} units of ${newShipment.name} to inventory.`,
    });
  };

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
            {t("inventory.title")}
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
            <span>{t("inventory.sync")}</span>
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
          <button 
            onClick={() => toast({
              title: "Stock Assets Overview",
              description: "Currently tracking 156 unique SKU items across all categories. Next full audit scheduled for month-end.",
            })}
            className="text-left w-full transition-all hover:ring-2 hover:ring-teal-400/30 rounded-xl"
          >
            <Card className="bg-slate-50 dark:bg-slate-900 border-border shadow-sm h-full">
              <CardHeader className="pb-2 p-4">
                <CardTitle className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-2">
                  {t("inventory.metric.items")}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold font-heading text-slate-800 dark:text-slate-100">156</div>
                <p className="text-[11px] font-medium text-emerald-600 dark:text-emerald-500 mt-1 flex items-center gap-1">
                  <span>{t("inventory.metric.active")}</span>
                </p>
              </CardContent>
            </Card>
          </button>

          <button 
            onClick={() => toast({
              title: "Low Stock Priority",
              description: "12 items have fallen below safety thresholds. Urgent purchase requisitions pending for 3 items.",
            })}
            className="text-left w-full transition-all hover:ring-2 hover:ring-amber-400/30 rounded-xl"
          >
            <Card className="bg-slate-50 dark:bg-slate-900 border-border shadow-sm h-full">
              <CardHeader className="pb-2 p-4">
                <CardTitle className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-2">
                  {t("inventory.metric.low")}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold font-heading text-slate-800 dark:text-slate-100">12</div>
                <p className="text-[11px] font-medium text-amber-600 dark:text-amber-500 mt-1">
                  {t("inventory.metric.below_threshold")}
                </p>
              </CardContent>
            </Card>
          </button>

          <button 
            onClick={() => toast({
              title: "Quality Assurance: Expiry",
              description: "5 batches expiring within 30 days. Priority dispatch activated for short-expiry stock.",
            })}
            className="text-left w-full transition-all hover:ring-2 hover:ring-red-400/30 rounded-xl"
          >
            <Card className="bg-slate-50 dark:bg-slate-900 border-border shadow-sm h-full">
              <CardHeader className="pb-2 p-4">
                <CardTitle className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-2">
                  {t("inventory.metric.expiring")}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold font-heading text-slate-800 dark:text-slate-100">5</div>
                <p className="text-[11px] font-medium text-red-600 dark:text-red-500 mt-1">
                  {t("inventory.metric.days_30")}
                </p>
              </CardContent>
            </Card>
          </button>

          <button 
            onClick={() => toast({
              title: "Valuation Insight",
              description: "Total inventory value is ₹2.34L based on current landing costs. 8.4% monthly turnover rate.",
            })}
            className="text-left w-full transition-all hover:ring-2 hover:ring-indigo-400/30 rounded-xl"
          >
            <Card className="bg-slate-50 dark:bg-slate-900 border-border shadow-sm h-full">
              <CardHeader className="pb-2 p-4">
                <CardTitle className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-2">
                  {t("inventory.metric.value")}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold font-heading text-slate-800 dark:text-slate-100">₹2.34L</div>
                <p className="text-[11px] font-medium text-emerald-600 dark:text-emerald-500 mt-1">
                  {t("inventory.metric.estimated")}
                </p>
              </CardContent>
            </Card>
          </button>
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
                    <span className="hidden sm:inline">{t("inventory.tabs.active")}</span>
                  </TabsTrigger>
                  <TabsTrigger value="history" className="gap-2 text-xs font-semibold data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    <History className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">{t("inventory.tabs.audit")}</span>
                  </TabsTrigger>
                </TabsList>
              </div>

               {/* Quick Search */}
               <div className="hidden sm:flex flex-1 max-w-xs items-center gap-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg p-2 border border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                  <Search className="h-4 w-4 text-muted-foreground ml-1" />
                  <input
                    type="text"
                    placeholder={t("inventory.search")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 text-sm bg-transparent outline-none placeholder-muted-foreground"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery("")}
                      className="text-xs text-muted-foreground hover:text-foreground mr-1"
                    >
                      {t("inventory.clear")}
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
                      placeholder={t("inventory.search")}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 text-sm bg-transparent outline-none placeholder-muted-foreground"
                    />
                  </div>
                  <MedicationInventory medications={medications} searchQuery={searchQuery} />
                </TabsContent>

                <TabsContent value="history" className="mt-0 h-full">
                  <InventoryHistory history={history} />
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
          <Dialog open={isAddingShipment} onOpenChange={setIsAddingShipment}>
            <DialogTrigger asChild>
              <Button
                className="w-full gap-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm h-12 text-sm font-bold tracking-wide"
              >
                <Plus className="h-4 w-4" />
                {t("inventory.receive")}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] border-border bg-white dark:bg-slate-900">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-emerald-600" />
                  Receive New Shipment
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddShipment} className="space-y-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="med-name" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Medication Name</Label>
                  <Input 
                    id="med-name" 
                    placeholder="e.g. Paracetamol 500mg" 
                    value={newShipment.name}
                    onChange={(e) => setNewShipment({...newShipment, name: e.target.value})}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="batch" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Batch ID</Label>
                    <Input 
                      id="batch" 
                      placeholder="BATCH-XXX" 
                      value={newShipment.batch}
                      onChange={(e) => setNewShipment({...newShipment, batch: e.target.value})}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="qty" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Quantity</Label>
                    <Input 
                      id="qty" 
                      type="number" 
                      placeholder="0" 
                      value={newShipment.quantity}
                      onChange={(e) => setNewShipment({...newShipment, quantity: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="expiry" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Expiry Date</Label>
                    <Input 
                      id="expiry" 
                      type="date" 
                      value={newShipment.expiryDate}
                      onChange={(e) => setNewShipment({...newShipment, expiryDate: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="cost" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Unit Cost (₹)</Label>
                    <Input 
                      id="cost" 
                      placeholder="0.00" 
                      value={newShipment.unitCost}
                      onChange={(e) => setNewShipment({...newShipment, unitCost: e.target.value})}
                    />
                  </div>
                </div>
                <DialogFooter className="pt-4">
                  <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
                    <Check className="h-4 w-4" />
                    Confirm Reception
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          {/* Low Stock Alerts Container */}
          <Card className="flex flex-col shadow-sm border border-border bg-white dark:bg-slate-900 relative flex-1">
             <div className="p-4 border-b border-error/20 flex items-center justify-between bg-error/5">
               <div className="flex items-center gap-2">
                 <AlertTriangle className="h-4 w-4 text-error" />
                  <h4 className="font-semibold text-error text-sm tracking-tight">
                    {t("inventory.alerts")}
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
