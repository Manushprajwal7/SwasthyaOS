"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Ambulance as AmbulanceIcon, 
  MapPin, 
  User, 
  Fuel, 
  Settings, 
  ChevronRight,
  Info
} from "lucide-react";
import { mockAmbulances } from "@/lib/mock/ambulance-data";
import { OptimizeModal } from "./optimize-modal";

import { useToast } from "@/hooks/use-toast";

export function ScheduleTab() {
  const { toast } = useToast();
  const timeBlocks = Array.from({ length: 12 }, (_, i) => {
    const hour = (16 + i) % 24;
    return `${hour}:00`;
  });

  const handleBlockClick = (ambId: string, block: any) => {
    toast({
      title: `Task Details: ${ambId}`,
      description: `${block.status}: ${block.label} (${block.duration}h duration)`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Dispatch": return "bg-blue-500 hover:bg-blue-600";
      case "Available": return "bg-emerald-500 hover:bg-emerald-600";
      case "Patient Transfer": return "bg-amber-500 hover:bg-amber-600";
      case "Maintenance": return "bg-red-500 hover:bg-red-600";
      case "Transit": return "bg-blue-400 hover:bg-blue-500";
      default: return "bg-slate-200 dark:bg-slate-700";
    }
  };

  const mockSchedules = [
    { id: "amb-001", blocks: [
      { start: 0, duration: 2, status: "Dispatch", label: "Incident #101" },
      { start: 2, duration: 1, status: "Transit", label: "Returning" },
      { start: 3, duration: 4, status: "Available", label: "Ready" },
      { start: 7, duration: 2, status: "Dispatch", label: "Sch. Transfer" },
    ]},
    { id: "amb-002", blocks: [
      { start: 0, duration: 4, status: "Available", label: "Standby" },
      { start: 4, duration: 2, status: "Patient Transfer", label: "Hosp B -> A" },
      { start: 6, duration: 3, status: "Available", label: "Ready" },
    ]},
    { id: "amb-003", blocks: [
      { start: 0, duration: 3, status: "Patient Transfer", label: "Enroute" },
      { start: 3, duration: 1, status: "Transit", label: "Refuel" },
      { start: 4, duration: 5, status: "Available", label: "Ready" },
    ]},
    { id: "amb-004", blocks: [
      { start: 0, duration: 8, status: "Maintenance", label: "Engine Service" },
      { start: 8, duration: 2, status: "Available", label: "Post-Check" },
    ]},
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
           <Info className="h-4 w-4 text-blue-600" />
           <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
             Timeline reflects current 12-hour operational window.
           </p>
        </div>
      </div>

      <Card className="border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <div className="min-w-[1000px]">
            {/* Timeline Header */}
            <div className="grid grid-cols-[250px_1fr] border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <div className="p-4 font-bold text-xs uppercase tracking-widest text-slate-500 border-r border-slate-200 dark:border-slate-800 flex items-center">
                Ambulance Unit
              </div>
              <div className="flex h-full">
                {timeBlocks.map((time) => (
                  <div key={time} className="flex-1 p-4 text-center font-bold text-[10px] text-slate-400 border-r border-slate-100 dark:border-slate-800 last:border-0">
                    {time}
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline Rows */}
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {mockAmbulances.map((amb) => {
                const schedule = mockSchedules.find(s => s.id === amb.id);
                return (
                  <div key={amb.id} className="grid grid-cols-[250px_1fr] group">
                    {/* Unit Info Card (Restored Space) */}
                    <div className="p-4 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 group-hover:bg-slate-50 dark:group-hover:bg-slate-900 transition-colors">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-teal-600 group-hover:bg-white dark:group-hover:bg-slate-700 transition-colors">
                          <AmbulanceIcon className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-slate-900 dark:text-white text-sm truncate">{amb.vehicleId}</p>
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">{amb.id}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[11px] text-slate-600 dark:text-slate-400 truncate">
                          <User className="h-3 w-3 shrink-0" />
                          <span className="truncate">{amb.driver} (D) / {amb.paramedic} (P)</span>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                           <div className="flex items-center gap-1.5 text-[11px] text-slate-600 dark:text-slate-400">
                              <Fuel className="h-3 w-3" />
                              <span className={amb.fuelLevel < 30 ? "text-red-500 font-bold" : ""}>{amb.fuelLevel}%</span>
                           </div>
                           <div className="flex items-center gap-1.5 text-[11px] text-slate-600 dark:text-slate-400 uppercase font-black">
                              <span className={amb.equipmentStatus === 'critical' ? "text-red-500" : amb.equipmentStatus === 'warning' ? "text-amber-500" : "text-emerald-500"}>
                                {amb.equipmentStatus}
                              </span>
                           </div>
                        </div>
                      </div>
                    </div>

                    {/* Timeline Grid */}
                    <div className="flex relative items-center p-4 bg-white dark:bg-slate-950">
                      {/* Grid Lines */}
                      <div className="absolute inset-0 flex pointer-events-none">
                        {timeBlocks.map((_, idx) => (
                          <div key={idx} className="flex-1 border-r border-slate-100 dark:border-slate-800 last:border-0 h-full" />
                        ))}
                      </div>

                      {/* Scheduled Blocks */}
                      <div className="relative w-full h-12 flex items-center">
                        {schedule?.blocks.map((block, idx) => (
                          <div
                            key={idx}
                            onClick={() => handleBlockClick(amb.vehicleId, block)}
                            className={`absolute h-8 rounded-lg flex items-center px-3 shadow-md border border-white/10 cursor-pointer overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] ${getStatusColor(block.status)}`}
                            style={{
                              left: `${(block.start / 12) * 100}%`,
                              width: `${(block.duration / 12) * 100}%`,
                            }}
                          >
                            <span className="text-white text-[10px] font-bold uppercase truncate">
                              {block.status}: {block.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Card>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-6 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
         <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Legend:</span>
         {[
           { label: "Dispatch", color: "bg-blue-500" },
           { label: "Transit", color: "bg-blue-400" },
           { label: "Available", color: "bg-emerald-500" },
           { label: "Patient Transfer", color: "bg-amber-500" },
           { label: "Maintenance", color: "bg-red-500" },
           { label: "Idle", color: "bg-slate-200 dark:bg-slate-700" },
         ].map(item => (
           <div key={item.label} className="flex items-center gap-2">
             <div className={`w-3 h-3 rounded ${item.color}`} />
             <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-tight">{item.label}</span>
           </div>
         ))}
      </div>
    </div>
  );
}
