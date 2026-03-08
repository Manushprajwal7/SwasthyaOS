"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";
import { 
  Ambulance, 
  PhoneCall, 
  Timer, 
  AlertTriangle, 
  Hospital as HospitalIcon,
  TrendingUp,
  Activity,
  Map as MapIcon,
  Zap,
  ShieldCheck
} from "lucide-react";
import { LivePulse } from "@/components/ui/live-pulse";
import { mockAmbulances, mockEmergencyCalls, mockHospitals } from "@/lib/mock/ambulance-data";
import { ScheduleTab } from "./schedule-tab";
import { NeuralDispatchModal } from "./neural-dispatch-modal";
import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function OverviewTab() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isNeuralModalOpen, setIsNeuralModalOpen] = React.useState(false);

  const kpis = [
    {
      id: "active",
      label: t("ambulance.kpi.active"),
      value: "14",
      icon: <Ambulance className="h-5 w-5" />,
      color: "text-blue-600",
      bg: "bg-blue-50 dark:bg-blue-900/20",
      trend: "+2 vs last hour",
    },
    {
      id: "calls",
      label: t("ambulance.kpi.calls"),
      value: "84",
      icon: <PhoneCall className="h-5 w-5" />,
      color: "text-amber-600",
      bg: "bg-amber-50 dark:bg-amber-900/20",
      trend: "Peak: 2:00 PM",
    },
    {
      id: "response",
      label: t("ambulance.kpi.response_time"),
      value: "8.4m",
      icon: <Timer className="h-5 w-5" />,
      color: "text-emerald-600",
      bg: "bg-emerald-50 dark:bg-emerald-900/20",
      trend: "-12% improvement",
    },
    {
      id: "critical",
      label: t("ambulance.kpi.critical"),
      value: "3",
      icon: <AlertTriangle className="h-5 w-5" />,
      color: "text-red-600",
      bg: "bg-red-50 dark:bg-red-900/20",
      trend: "All assigned",
      pulse: true,
    },
    {
      id: "hospital",
      label: t("ambulance.kpi.hospital_alerts"),
      value: "2",
      icon: <HospitalIcon className="h-5 w-5" />,
      color: "text-teal-600",
      bg: "bg-teal-50 dark:bg-teal-900/20",
      trend: "Beds low at Manipal",
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* AI Action Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
           <Brain className="h-32 w-32 text-teal-600" />
        </div>
        <div className="flex items-center gap-4 relative z-10">
           <div className="p-3 bg-red-50 dark:bg-red-950/30 rounded-xl">
              <Brain className="h-6 w-6 text-red-600" />
           </div>
           <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Neural Dispatch Center</h2>
              <p className="text-sm text-slate-500 font-medium">Global AI optimization active | 91% Confidence Rating</p>
           </div>
        </div>
        <div className="flex gap-3 relative z-10">
           <Button 
            onClick={() => setIsNeuralModalOpen(true)}
            className="bg-red-600 hover:bg-red-500 text-white text-xs gap-3 h-10 font-black px-6 shadow-lg shadow-red-500/20 active:scale-95 transition-all"
           >
              <Zap className="h-4 w-4 fill-current" /> Neural Dispatch Optimization
           </Button>
        </div>
      </div>

      <NeuralDispatchModal 
        isOpen={isNeuralModalOpen} 
        onClose={() => setIsNeuralModalOpen(false)} 
      />

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {kpis.map((kpi) => (
          <Card 
            key={kpi.id} 
            onClick={() => toast({ title: kpi.label, description: `Global tracking for ${kpi.label.toLowerCase()} is active. Last update: Just now.` })}
            className="p-4 hover-lift group border-slate-200 dark:border-slate-800 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-lg ${kpi.bg} ${kpi.color}`}>
                {kpi.icon}
              </div>
              {kpi.pulse && <LivePulse active color="red" size="sm" />}
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                {kpi.label}
              </p>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold text-slate-900 dark:text-white leading-none">
                  {kpi.value}
                </span>
                <span className="text-[10px] text-slate-400 font-medium mb-1">
                  {kpi.trend}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Row 2: Schedule (Left) & Map (Right) Swapped */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Operational Schedule (Primary) */}
        <Card className="lg:col-span-8 p-5 border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900 flex flex-col">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 flex items-center justify-between">
             <div className="flex items-center gap-2">
                <Ambulance className="h-4 w-4 text-teal-600" />
                Operational Schedule
             </div>
             <div className="text-[10px] text-slate-400 font-bold uppercase">Live Updates Enabled</div>
          </h3>
          <div className="flex-1 overflow-hidden rounded-xl border border-slate-100 dark:border-slate-800">
             <ScheduleTab />
          </div>
        </Card>

        {/* Right: Map Panel (Secondary) */}
        <Card className="lg:col-span-4 p-0 overflow-hidden border-slate-200 dark:border-slate-800 relative min-h-[500px]">
          {/* Top Left: Map Title */}
          <div className="absolute top-4 left-4 z-10">
            <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur shadow-sm border border-slate-200 dark:border-slate-700 p-2 rounded-lg flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <div className="text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase leading-none">
                {t("ambulance.map.title")}
              </div>
            </div>
          </div>

          {/* Top Right: Map Legend Overlay */}
          <div className="absolute top-4 right-4 z-10">
            <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur shadow-lg border border-slate-200 dark:border-slate-700 p-3 rounded-xl space-y-2 animate-fade-in">
              <div className="flex items-center gap-2 text-[9px] font-black text-slate-500 uppercase tracking-tighter">
                <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
                Critical Incident
              </div>
              <div className="flex items-center gap-2 text-[9px] font-black text-slate-500 uppercase tracking-tighter">
                <div className="w-2 h-2 rounded-full bg-amber-500" />
                Urgent Response
              </div>
              <div className="flex items-center gap-2 text-[9px] font-black text-slate-500 uppercase tracking-tighter">
                 <div className="w-2 h-2 rounded-full bg-blue-500" />
                 Active Unit
              </div>
              <div className="flex items-center gap-2 text-[9px] font-black text-slate-500 uppercase tracking-tighter">
                 <div className="w-2.5 h-2.5 bg-teal-600 rounded-sm flex items-center justify-center">
                    <div className="w-1 h-1 bg-white rounded-full" />
                 </div>
                 Hospital / ER
              </div>
            </div>
          </div>

          <div className="w-full h-full bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center relative">
               <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d497511.23228709215!2d77.46612515!3d12.953945599999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1706000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale-[50%] invert-[5%] contrast-[1.2]"
              ></iframe>
              
              {/* Critical Incidents */}
              <div 
                onClick={() => toast({ title: "Critical Incident", description: "Priority 1 Medical Emergency. Unit KA-01-AM-1024 is on-scene.", variant: "destructive" })}
                className="absolute top-[35%] left-[45%] group cursor-pointer"
              >
                <div className="h-3.5 w-3.5 bg-red-500 rounded-full animate-ping absolute" />
                <div className="h-3.5 w-3.5 bg-red-600 rounded-full border border-white relative shadow-lg" />
              </div>
              <div 
                onClick={() => toast({ title: "Critical Incident", description: "Priority 1 Medical Emergency. Re-routing nearby units.", variant: "destructive" })}
                className="absolute top-[55%] left-[30%] group cursor-pointer"
              >
                <div className="h-3 w-3 bg-red-500 rounded-full animate-ping absolute" />
                <div className="h-3 w-3 bg-red-600 rounded-full border border-white relative shadow-lg" />
              </div>
              <div 
                onClick={() => toast({ title: "Critical Incident", description: "Priority 1 Medical Emergency. ETA 4 minutes.", variant: "destructive" })}
                className="absolute top-[20%] left-[60%] group cursor-pointer"
              >
                <div className="h-4 w-4 bg-red-500 rounded-full animate-ping absolute" />
                <div className="h-4 w-4 bg-red-600 rounded-full border border-white relative shadow-lg" />
              </div>
              <div 
                onClick={() => toast({ title: "Critical Incident", description: "Priority 1 Medical Emergency. Initial assessment in progress.", variant: "destructive" })}
                className="absolute top-[75%] left-[20%] group cursor-pointer"
              >
                <div className="h-3 w-3 bg-red-500 rounded-full animate-ping absolute" />
                <div className="h-3 w-3 bg-red-600 rounded-full border border-white relative shadow-lg" />
              </div>

              {/* Urgent Incidents */}
              <div 
                onClick={() => toast({ title: "Urgent Response", description: "Priority 2 Incident. Dispatch signal confirmed." })}
                className="absolute top-[42%] left-[62%] group cursor-pointer"
              >
                <div className="h-3 w-3 bg-amber-400 rounded-full animate-ping absolute" />
                <div className="h-3 w-3 bg-amber-500 rounded-full border border-white relative shadow-md" />
              </div>
              <div 
                onClick={() => toast({ title: "Urgent Response", description: "Priority 2 Incident. Unit KA-01-AM-2048 enroute." })}
                className="absolute top-[68%] left-[48%] group cursor-pointer"
              >
                <div className="h-3 w-3 bg-amber-400 rounded-full animate-ping absolute" />
                <div className="h-3 w-3 bg-amber-500 rounded-full border border-white relative shadow-md" />
              </div>
              <div 
                onClick={() => toast({ title: "Urgent Response", description: "Priority 2 Incident. Traffic congestion detected." })}
                className="absolute top-[25%] left-[35%] group cursor-pointer"
              >
                <div className="h-3 w-3 bg-amber-400 rounded-full animate-ping absolute" />
                <div className="h-3 w-3 bg-amber-500 rounded-full border border-white relative shadow-md" />
              </div>
              <div 
                onClick={() => toast({ title: "Urgent Response", description: "Priority 2 Incident. Dispatch signal sent." })}
                className="absolute top-[58%] left-[82%] group cursor-pointer"
              >
                <div className="h-3 w-3 bg-amber-400 rounded-full animate-ping absolute" />
                <div className="h-3 w-3 bg-amber-500 rounded-full border border-white relative shadow-md" />
              </div>

              {/* Active Units */}
              <div 
                onClick={() => toast({ title: "Active Unit", description: "KA-01-AM-2048 | Status: Returning | Driver: Rajesh" })}
                className="absolute top-[50%] left-[55%] group cursor-pointer"
              >
                 <div className="h-2.5 w-2.5 bg-blue-500 rounded-sm transform rotate-45 border border-white shadow-sm" />
              </div>
              <div 
                onClick={() => toast({ title: "Active Unit", description: "KA-01-AM-3072 | Status: Available | Driver: Suresh" })}
                className="absolute top-[28%] left-[52%] group cursor-pointer"
              >
                 <div className="h-2.5 w-2.5 bg-blue-500 rounded-sm transform rotate-45 border border-white shadow-sm" />
              </div>
              <div 
                onClick={() => toast({ title: "Active Unit", description: "KA-01-AM-1024 | Status: On-Scene | Driver: Amit" })}
                className="absolute top-[62%] left-[42%] group cursor-pointer"
              >
                 <div className="h-2.5 w-2.5 bg-blue-500 rounded-sm transform rotate-45 border border-white shadow-sm" />
              </div>
              <div 
                onClick={() => toast({ title: "Active Unit", description: "KA-01-AM-4096 | Status: Dispatch | Driver: Priya" })}
                className="absolute top-[45%] left-[78%] group cursor-pointer"
              >
                 <div className="h-2.5 w-2.5 bg-blue-500 rounded-sm transform rotate-45 border border-white shadow-sm" />
              </div>
              <div 
                onClick={() => toast({ title: "Active Unit", description: "KA-01-AM-5120 | Status: Available | Driver: Vikram" })}
                className="absolute top-[18%] left-[28%] group cursor-pointer"
              >
                 <div className="h-2.5 w-2.5 bg-blue-500 rounded-sm transform rotate-45 border border-white shadow-sm" />
              </div>
              <div 
                onClick={() => toast({ title: "Active Unit", description: "KA-01-AM-6144 | Status: Maintenance | Driver: N/A" })}
                className="absolute top-[85%] left-[65%] group cursor-pointer"
              >
                 <div className="h-2.5 w-2.5 bg-blue-500 rounded-sm transform rotate-45 border border-white shadow-sm" />
              </div>

              {/* Hospitals */}
              <div 
                onClick={() => toast({ title: "Manipal Hospital", description: "Emergency Dept Status: High Load | 2 Beds Available" })}
                className="absolute top-[40%] left-[25%] flex flex-col items-center cursor-pointer group"
              >
                 <div className="w-5 h-5 bg-teal-600 rounded-md border border-white shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <div className="w-2.5 h-0.5 bg-white rounded-full absolute" />
                    <div className="h-2.5 w-0.5 bg-white rounded-full absolute" />
                 </div>
              </div>
              <div 
                onClick={() => toast({ title: "Apollo Hospital", description: "Emergency Dept Status: Stable | 8 Beds Available" })}
                className="absolute top-[65%] left-[70%] flex flex-col items-center cursor-pointer group"
              >
                 <div className="w-5 h-5 bg-teal-600 rounded-md border border-white shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <div className="w-2.5 h-0.5 bg-white rounded-full absolute" />
                    <div className="h-2.5 w-0.5 bg-white rounded-full absolute" />
                 </div>
              </div>
          </div>
        </Card>
      </div>

      {/* Row 3: Analytics Panels Side-by-Side */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <Card className="lg:col-span-6 p-6 border-slate-200 dark:border-slate-800 hover-lift bg-white dark:bg-slate-900">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-5 flex items-center gap-2">
            <Activity className="h-4 w-4 text-teal-600" />
            {t("ambulance.analytics.efficiency")}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
            {[
              { label: t("ambulance.analytics.efficiency"), value: 88, color: "bg-emerald-500" },
              { label: t("ambulance.analytics.dispatch_success"), value: 92, color: "bg-teal-500" },
              { label: "Hospital Admission Rate", value: 76, color: "bg-blue-500" },
              { label: t("ambulance.analytics.utilization"), value: 64, color: "bg-amber-500" },
            ].map((metric) => (
              <div key={metric.label}>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-slate-500 font-medium">{metric.label}</span>
                  <span className="text-slate-900 dark:text-white font-bold">{metric.value}%</span>
                </div>
                <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${metric.color} rounded-full transition-all duration-1000`} 
                    style={{ width: `${metric.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="lg:col-span-6 p-6 border-slate-200 dark:border-slate-800 bg-gradient-to-br from-teal-50/30 to-white dark:from-slate-900 dark:to-slate-950 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
             <TrendingUp className="h-20 w-20 text-teal-600" />
          </div>
          <div className="relative z-10">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              {t("ambulance.forecast.next_12h")}
            </h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="text-4xl font-black text-slate-900 dark:text-white">
                High Demand <span className="text-amber-500">↑</span>
              </div>
              <div className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-full text-[10px] font-bold uppercase tracking-widest animate-pulse">
                Pre-Scale Alert
              </div>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed max-w-[90%] mb-6">
              Predicted incident volume is expected to rise by <span className="font-bold text-teal-600 underline underline-offset-4 decoration-2">18%</span> between 19:00 - 23:00 tonight.
            </p>
            <div className="flex items-center gap-3">
               <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 bg-white/50 dark:bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
                  <ShieldCheck className="h-3 w-3 text-emerald-500" />
                  AI CONFIDENCE: 89%
               </div>
               <div className="h-1 flex-1 bg-slate-200 dark:bg-slate-800 rounded-full">
                  <div className="h-full bg-emerald-500 w-[89%] rounded-full shadow-[0_0_8px_rgba(16,185,129,0.3)]" />
               </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
