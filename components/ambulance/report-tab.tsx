"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { 
  Users, 
  Activity, 
  ShieldCheck, 
  AlertCircle,
  Clock,
  CheckCircle2,
  Phone,
  MapPin,
  MessageSquare,
  ChevronRight,
  User,
  Ambulance,
  Calendar,
  FileText,
  MousePointer2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const crewData = [
  {
    name: "Rishab",
    unit: "AMB-T-003",
    hours: "45h",
    incidents: 31,
    safetyScore: 98,
    rating: 4.9,
    onTime: 97,
    status: "Excellent"
  },
  {
    name: "Virat",
    unit: "AMB-T-001",
    hours: "42h",
    incidents: 28,
    safetyScore: 95,
    rating: 4.8,
    onTime: 93,
    status: "Excellent"
  },
  {
    name: "Yuvaraj",
    unit: "AMB-T-002",
    hours: "38h",
    incidents: 24,
    safetyScore: 92,
    rating: 4.6,
    onTime: 92,
    status: "Good"
  }
];

export function ReportTab() {
  const { toast } = useToast();
  const [activeDriverTab, setActiveDriverTab] = useState("overview");
  const [activeDispatchTab, setActiveDispatchTab] = useState("pending");

  const handleAction = (title: string, desc: string) => {
    toast({
      title: title,
      description: desc,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in text-slate-900 dark:text-white pb-10">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* Left Column: Paramedic/Crew Performance */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold tracking-tight">Paramedic Performance</h2>
              <p className="text-sm text-slate-500 font-medium">Monitor and analyze responder metrics and safety</p>
            </div>
            <Button 
              onClick={() => handleAction("Performance Report", "Generating comprehensive performance analytics...")}
              className="bg-red-600 hover:bg-red-500 text-white gap-2 font-bold text-xs uppercase"
            >
              <FileText className="h-4 w-4" /> Performance Report
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Active Responders", value: "3", icon: <Users className="h-4 w-4 text-blue-500" /> },
              { label: "Avg Safety Score", value: "95%", icon: <ShieldCheck className="h-4 w-4 text-emerald-500" /> },
              { label: "On-Time Rate", value: "94%", icon: <Clock className="h-4 w-4 text-blue-500" /> },
              { label: "Total Incidents", value: "1", icon: <AlertCircle className="h-4 w-4 text-red-500" />, focus: true },
            ].map((stat, i) => (
              <Card key={i} className="p-4 border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-tight">{stat.label}</p>
                  {stat.icon}
                </div>
                <p className={`text-xl font-black ${stat.focus ? 'text-red-500' : 'text-slate-900 dark:text-white'}`}>{stat.value}</p>
              </Card>
            ))}
          </div>

          <div className="bg-slate-100 dark:bg-slate-800/50 p-1 rounded-lg flex gap-1">
            {['Driver Overview', 'Leaderboard', 'Performance Analytics'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveDriverTab(tab.toLowerCase())}
                className={`flex-1 py-2 text-[10px] font-bold uppercase rounded-md transition-all ${
                  activeDriverTab === tab.toLowerCase() 
                    ? 'bg-white dark:bg-slate-900 shadow-sm text-slate-900 dark:text-white' 
                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {crewData.map((crew, i) => (
              <Card key={i} className="p-4 border-slate-200 dark:border-slate-800 shadow-lg hover:border-teal-500/30 transition-all group overflow-hidden relative">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-slate-400" />
                    <span className="font-bold text-sm tracking-tight">{crew.name}</span>
                  </div>
                  <Badge className={`${
                    crew.status === 'Excellent' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-blue-100 text-blue-700 border-blue-200'
                  } text-[9px] font-bold py-0 h-5`}>
                    {crew.status}
                  </Badge>
                </div>
                <p className="text-[10px] text-slate-400 font-bold uppercase mb-4">Truck {crew.unit}</p>
                
                <div className="grid grid-cols-2 gap-y-3 mb-4">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase">Hours</p>
                    <p className="text-xs font-bold">Worked</p>
                    <p className="text-xs font-black">{crew.hours}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase">Deliveries</p>
                    <p className="text-xs font-bold">(Incidents)</p>
                    <p className="text-xs font-black">{crew.incidents}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase">Safety Score</p>
                    <p className="text-xs font-bold text-emerald-500">{crew.safetyScore}%</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase">Rating</p>
                    <p className="text-xs font-bold">⭐ {crew.rating}</p>
                  </div>
                </div>

                <div className="space-y-1 mb-4">
                  <div className="flex justify-between text-[9px] font-black uppercase tracking-tighter">
                    <span className="text-slate-500">On-Time Deliveries</span>
                    <span className="text-slate-900 dark:text-white">{crew.onTime}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full transition-all duration-1000" 
                      style={{ width: `${crew.onTime}%` }} 
                    />
                  </div>
                </div>

                <div className="space-y-2 relative z-10">
                   <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleAction(`Details: ${crew.name}`, `Opening historical logs for ${crew.name}...`)}
                    className="w-full text-[10px] font-bold uppercase h-8 hover:bg-slate-50 dark:hover:bg-slate-800"
                   >
                    View Details
                   </Button>
                   <Button 
                    size="sm" 
                    onClick={() => handleAction(`Message ${crew.name}`, `Dispatcher interface for unit ${crew.unit} opened.`)}
                    className="w-full text-[10px] font-bold uppercase h-8 bg-red-600 hover:bg-red-500 text-white"
                   >
                    Send Message
                   </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Column: Incident Dispatch Confirmation */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold tracking-tight">Incident Confirmation</h2>
              <p className="text-sm text-slate-500 font-medium">Track and confirm active incident responses</p>
            </div>
            <Button 
              onClick={() => handleAction("Incident Report", "Compiling active dispatch ledger...")}
              className="bg-red-600 hover:bg-red-500 text-white gap-2 font-bold text-xs uppercase"
            >
              <FileText className="h-4 w-4" /> Incident Report
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Pending Incidents", value: "1", icon: <Clock className="h-4 w-4 text-blue-500" /> },
              { label: "Completed Today", value: "1", icon: <CheckCircle2 className="h-4 w-4 text-emerald-500" /> },
              { label: "Issues/Delays", value: "1", icon: <AlertCircle className="h-4 w-4 text-amber-500" />, focus: true },
              { label: "On-Time Rate", value: "94%", icon: <CheckCircle2 className="h-4 w-4 text-emerald-500" /> },
            ].map((stat, i) => (
              <Card key={i} className="p-4 border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-tight">{stat.label}</p>
                  {stat.icon}
                </div>
                <p className={`text-xl font-black ${stat.focus ? 'text-amber-500' : 'text-slate-900 dark:text-white'}`}>{stat.value}</p>
              </Card>
            ))}
          </div>

          <div className="bg-slate-100 dark:bg-slate-800/50 p-1 rounded-lg flex gap-1">
            {['Pending Deliveries', 'Completed', 'Confirm Delivery'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveDispatchTab(tab.toLowerCase())}
                className={`flex-1 py-2 text-[10px] font-bold uppercase rounded-md transition-all ${
                  activeDispatchTab === tab.toLowerCase() 
                    ? 'bg-white dark:bg-slate-900 shadow-sm text-slate-900 dark:text-white' 
                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <Card className="p-8 border-slate-200 dark:border-slate-800 shadow-2xl relative overflow-hidden bg-white dark:bg-slate-900">
             <div className="flex flex-wrap justify-between items-start gap-4 mb-8">
                <div className="flex items-center gap-3">
                   <h3 className="text-lg font-black tracking-tight uppercase">DEL-2024-002</h3>
                   <Badge className="bg-blue-100 text-blue-700 border-blue-200 text-[10px] font-black uppercase flex items-center gap-1.5 h-6">
                      <Clock className="h-3 w-3" /> In-Transit
                   </Badge>
                </div>
                <div className="flex gap-2">
                   <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleAction("Tracking", "Initializing GPS relay for unit AMB-T-002...")}
                    className="text-[10px] font-bold uppercase h-9 px-4 hover:bg-slate-50 dark:hover:bg-slate-800"
                   >
                    Track Location
                   </Button>
                   <Button 
                    size="sm" 
                    onClick={() => handleAction("Contact", "Encrypted VoIP channel established with unit AMB-T-002.")}
                    className="text-[10px] font-bold uppercase h-9 bg-red-600 hover:bg-red-500 text-white px-4"
                   >
                    Contact Driver
                   </Button>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 border-b border-slate-100 dark:border-slate-800 pb-8">
                <div>
                   <p className="text-[10px] text-slate-400 font-bold uppercase mb-2">Customer (Patient)</p>
                   <p className="text-sm font-black text-slate-900 dark:text-white leading-tight">Metro Building Corp. (Triage Center #4)</p>
                </div>
                <div>
                   <p className="text-[10px] text-slate-400 font-bold uppercase mb-2">Truck (Unit)</p>
                   <p className="text-sm font-black text-slate-900 dark:text-white">AMB-T-002</p>
                </div>
                <div>
                   <p className="text-[10px] text-slate-400 font-bold uppercase mb-2">Quantity (Priority)</p>
                   <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tighter">Level 2 - Severe</p>
                </div>
             </div>

             <div className="space-y-6">
                <div className="flex items-start gap-3">
                   <MapPin className="h-4 w-4 text-slate-400 mt-1 shrink-0" />
                   <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Incident Address</p>
                      <p className="text-sm font-bold text-slate-700 dark:text-slate-300">456 Oak Ave, Brooklyn, NY 11201</p>
                   </div>
                </div>
                <div className="flex items-start gap-3">
                   <Clock className="h-4 w-4 text-slate-400 mt-1 shrink-0" />
                   <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Scheduled Response Time</p>
                      <p className="text-sm font-bold text-slate-700 dark:text-slate-300">1/9/2024, 3:15:00 PM</p>
                   </div>
                </div>
             </div>

             {/* Functional footer buttons to complete the set */}
             <div className="mt-12 flex justify-end gap-3 pt-6 border-t border-slate-100 dark:border-slate-800">
                <Button 
                  variant="ghost" 
                  onClick={() => handleAction("Logs", "Fetching audit trail for DEL-2024-002...")}
                  className="text-[10px] font-bold uppercase text-slate-400 hover:text-slate-600"
                >
                  View Activity Logs
                </Button>
                <Button 
                  onClick={() => handleAction("Resolved", "Incident DEL-2024-002 marked as RESOLVED. Archiving...")}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] uppercase h-10 px-6 active:scale-95 transition-transform"
                >
                  Confirm Resolution
                </Button>
             </div>
          </Card>
        </div>

      </div>
    </div>
  );
}
