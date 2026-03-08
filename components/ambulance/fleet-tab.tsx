"use client";

import React, { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { 
  mockAmbulances, 
  getStatusColor 
} from "@/lib/mock/ambulance-data";
import { 
  Search, 
  MapPin, 
  Filter, 
  MoreVertical, 
  Zap, 
  Wrench, 
  Navigation,
  Fuel,
  ShieldCheck,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function FleetTab() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [fleet, setFleet] = useState(mockAmbulances);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  // New unit form state
  const [newUnit, setNewUnit] = useState({
    vehicleId: "",
    driver: "",
    paramedic: "",
    fuelLevel: 100,
  });

  const filteredAmbulances = useMemo(() => {
    return fleet.filter(amb => {
      const matchesSearch = 
        amb.vehicleId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        amb.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
        amb.paramedic.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || amb.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter, fleet]);

  const handleAddAmbulance = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newUnit.vehicleId || !newUnit.driver || !newUnit.paramedic) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const unitToAdd = {
      id: `AMB-${Math.floor(Math.random() * 9000) + 1000}`,
      ...newUnit,
      status: "available" as const,
      equipmentStatus: "ready" as const,
      location: { lat: 12.9716, lng: 77.5946 }, // Default Bangalore center
      lastSync: new Date().toISOString(),
      lastMaintenance: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
    };

    setFleet([unitToAdd, ...fleet]);
    setIsAddDialogOpen(false);
    setNewUnit({ vehicleId: "", driver: "", paramedic: "", fuelLevel: 100 });

    toast({
      title: "Unit Added Successfully",
      description: `Ambulance ${unitToAdd.vehicleId} has been registered to the fleet.`,
    });
  };

  const handleDispatch = (id: string) => {
    toast({
      title: "Manual Dispatch",
      description: `Dispatch signal sent to unit ${id}. Waiting for crew confirmation.`,
    });
  };

  const handleMaintenance = (id: string) => {
    toast({
      title: "Maintenance Mode",
      description: `Unit ${id} has been scheduled for technical inspection.`,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search vehicle ID, driver, or paramedic..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500/50 transition-all text-slate-900 dark:text-white"
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex-1 sm:flex-none border-slate-200 dark:border-slate-800 text-xs gap-2 h-10 px-4">
                <Filter className="h-3.5 w-3.5" /> 
                {statusFilter === "all" ? "All Status" : statusFilter.replace('-', ' ').toUpperCase()}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => setStatusFilter("all")}>All Status</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("available")}>Available</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("dispatch")}>Dispatch</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("on-scene")}>On Scene</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("maintenance")}>Maintenance</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                className="flex-1 sm:flex-none bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs uppercase tracking-wider px-6 h-10 transition-transform active:scale-95"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Unit
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-teal-600 flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Register New Unit
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddAmbulance} className="space-y-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="vehicleId" className="text-right text-xs font-bold text-slate-500 uppercase">
                    Vehicle ID
                  </Label>
                  <Input 
                    id="vehicleId" 
                    value={newUnit.vehicleId}
                    onChange={(e) => setNewUnit({...newUnit, vehicleId: e.target.value})}
                    placeholder="e.app KA-01-AM-1234" 
                    className="col-span-3 h-10" 
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="driver" className="text-right text-xs font-bold text-slate-500 uppercase">
                    Driver
                  </Label>
                  <Input 
                    id="driver" 
                    value={newUnit.driver}
                    onChange={(e) => setNewUnit({...newUnit, driver: e.target.value})}
                    placeholder="Full Name" 
                    className="col-span-3 h-10" 
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="paramedics" className="text-right text-xs font-bold text-slate-500 uppercase">
                    Paramedic
                  </Label>
                  <Input 
                    id="paramedics" 
                    value={newUnit.paramedic}
                    onChange={(e) => setNewUnit({...newUnit, paramedic: e.target.value})}
                    placeholder="Full Name" 
                    className="col-span-3 h-10" 
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="fuel" className="text-right text-xs font-bold text-slate-500 uppercase">
                    Fuel %
                  </Label>
                  <Input 
                    id="fuel" 
                    type="number"
                    min="0"
                    max="100"
                    value={newUnit.fuelLevel}
                    onChange={(e) => setNewUnit({...newUnit, fuelLevel: parseInt(e.target.value) || 0})}
                    className="col-span-3 h-10" 
                  />
                </div>
                <DialogFooter className="pt-4">
                  <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-500 font-bold uppercase tracking-widest text-xs h-11">
                    Complete Registration
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card className="border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl bg-white dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Vehicle ID</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Crew</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Fuel / Readiness</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Current Location</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredAmbulances.length > 0 ? (
                filteredAmbulances.map((amb) => (
                  <tr key={amb.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg group-hover:scale-110 transition-transform">
                            <Navigation className={`h-4 w-4 ${amb.status === 'dispatch' ? 'text-blue-500' : 'text-slate-400'}`} />
                        </div>
                        <div>
                            <p className="font-bold text-slate-900 dark:text-white text-sm">{amb.vehicleId}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase">{amb.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-0.5">
                        <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">{amb.driver}</p>
                        <p className="text-[11px] text-slate-500">{amb.paramedic}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className={`rounded-md text-[10px] font-bold uppercase tracking-tight py-1 ${getStatusColor(amb.status)}`}>
                        {amb.status.replace('-', ' ')}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-[10px] mb-1">
                            <span className="text-slate-400 flex items-center gap-1 uppercase"><Fuel className="h-3 w-3" /> Fuel</span>
                            <span className={`${amb.fuelLevel < 30 ? "text-red-500 font-bold" : "text-slate-700 dark:text-slate-300 font-bold"}`}>{amb.fuelLevel}%</span>
                        </div>
                        <div className="h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden w-24">
                            <div 
                              className={`h-full ${amb.fuelLevel < 30 ? 'bg-red-500' : 'bg-teal-500'} transition-all`} 
                              style={{ width: `${amb.fuelLevel}%` }} 
                            />
                        </div>
                        <div className="flex items-center gap-1.5 mt-2">
                            <ShieldCheck className={`h-3 w-3 ${amb.equipmentStatus === 'ready' ? 'text-emerald-500' : 'text-amber-500'}`} />
                            <span className="text-[10px] font-bold text-slate-500 uppercase">{amb.equipmentStatus}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                        <MapPin className="h-3.5 w-3.5 text-slate-400" />
                        <span>{amb.location.lat.toFixed(4)}, {amb.location.lng.toFixed(4)}</span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1 italic leading-tight">Central District, Area {Math.floor(amb.location.lat)}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleDispatch(amb.vehicleId)}
                          className="h-8 w-8 p-0 border-slate-200 dark:border-slate-800 hover:text-blue-600 shadow-sm transition-transform active:scale-90" 
                          title="Dispatch Manual"
                        >
                            <Zap className="h-3.5 w-3.5" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleMaintenance(amb.vehicleId)}
                          className="h-8 w-8 p-0 border-slate-200 dark:border-slate-800 hover:text-amber-600 shadow-sm transition-transform active:scale-90" 
                          title="Maintenance Mode"
                        >
                            <Wrench className="h-3.5 w-3.5" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-slate-400">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => toast({ title: "View Specs", description: `Loading technical specifications for ${amb.vehicleId}...` })}>View Specs</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toast({ title: "Crew Logs", description: `Fetching duty logs for ${amb.driver} and ${amb.paramedic}...` })}>Crew Logs</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-500" onClick={() => toast({ title: "Alert", description: "Emergency override initiated." })}>Emergency Lock</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center">
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No units found matching criteria</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
      
      <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">
         <span>Displaying {filteredAmbulances.length} of {fleet.length} Units</span>
         <span>Last Inventory Sync: {new Date().toLocaleTimeString()}</span>
      </div>
    </div>
  );
}
