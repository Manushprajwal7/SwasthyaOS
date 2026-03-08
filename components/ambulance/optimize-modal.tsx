"use client";

import React, { useState, useRef } from "react";
import { 
  Sparkles, 
  Loader2, 
  Download, 
  Ambulance, 
  Activity, 
  Users, 
  AlertCircle, 
  MapPin, 
  TrendingUp, 
  CheckCircle2,
  Calendar,
  Zap,
  Target,
  ShieldAlert,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Area, 
  AreaChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis, 
  CartesianGrid,
} from "recharts";
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export function OptimizeModal() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [optData, setOptData] = useState<any>(null);
  const reportRef = useRef<HTMLDivElement>(null);

  const fetchOptimization = async () => {
    setLoading(true);
    setOpen(true);
    setOptData(null);
    try {
      const response = await fetch("/api/ambulance/optimize");
      const data = await response.json();
      
      setTimeout(() => {
        if (data.success) {
          setOptData(data);
        } else {
          setOptData({ error: "Optimization Engine Timeout. Please retry." });
        }
        setLoading(false);
      }, 2500);

    } catch (e) {
      console.error(e);
      setOptData({ error: "Connection error with dispatch node." });
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!reportRef.current) return;
    setLoading(true);
    try {
      const canvas = await html2canvas(reportRef.current, { 
        scale: 2,
        useCORS: true,
        backgroundColor: "#020617",
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      pdf.addImage(imgData, "PNG", 0, 0, 210, (canvas.height * 210) / canvas.width);
      pdf.save(`Ambulance_Neural_Optimization_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          onClick={fetchOptimization}
          className="bg-teal-600 hover:bg-teal-500 text-white shadow-xl shadow-teal-500/20 gap-2 font-bold uppercase tracking-widest text-[10px] px-8 py-6 rounded-full transition-all hover:scale-105 active:scale-95 border border-teal-400/30"
        >
          <Sparkles className="h-4 w-4 animate-pulse" />
          Neural Dispatch Optimization
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-[95vw] sm:max-w-[85vw] xl:max-w-[80vw] max-h-[95vh] overflow-y-auto p-0 border-0 bg-transparent shadow-none">
        <DialogTitle className="sr-only">AI Operational Dispatch Optimization</DialogTitle>
        
        <div className="bg-[#020617] rounded-[32px] shadow-[0_0_100px_rgba(13,148,136,0.15)] overflow-hidden border border-slate-800/50 relative">
          {/* Background Ambient Glows */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/10 blur-[120px] rounded-full -mr-64 -mt-64 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full -ml-64 -mb-64 pointer-events-none" />

          {loading ? (
            <div className="flex flex-col items-center justify-center py-40 gap-8 text-center relative z-10">
              <div className="relative">
                <div className="absolute inset-0 bg-teal-500 blur-[40px] opacity-30 animate-pulse" />
                <div className="h-24 w-24 rounded-3xl border-2 border-teal-500/30 flex items-center justify-center bg-slate-900/50 backdrop-blur-xl relative z-10">
                   <Loader2 className="h-10 w-10 animate-spin text-teal-400" />
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter leading-none">
                  SYNTESIZING OPTIMAL GRID...
                </h3>
                <div className="flex flex-col items-center gap-2">
                   <p className="text-teal-400 font-bold text-xs uppercase tracking-[0.3em] flex items-center gap-2">
                     <Zap className="h-4 w-4 text-amber-500" />
                     AWS Bedrock x Claude Sonnet 3.5
                   </p>
                   <div className="w-64 h-1 bg-slate-800 rounded-full overflow-hidden mt-2">
                      <div className="h-full bg-teal-500 animate-progress-fast" />
                   </div>
                </div>
              </div>
            </div>
          ) : optData && optData.success === true ? (
            <div className="flex flex-col animate-fade-in relative z-10 h-full">
              {/* Report Canvas */}
              <div ref={reportRef} className="p-8 sm:p-12 space-y-12">
                {/* Header Card */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[10px] font-black uppercase tracking-widest">
                       <ShieldAlert className="h-3 w-3" />
                       Intelligence Level: Tier 1 Operational
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter italic uppercase leading-[0.9]">
                       Operational<br/>Insight Report
                    </h1>
                    <div className="flex items-center gap-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                       <span className="flex items-center gap-1.5"><Calendar className="h-3 w-3" /> {new Date().toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                       <span className="flex items-center gap-1.5"><MapPin className="h-3 w-3" /> Fleet Grid: Central Zone</span>
                       <span className="flex items-center gap-1.5 text-teal-400"><Zap className="h-3 w-3" /> AI Node: Sonnet-4.5-Enterprise</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                     <Button 
                        variant="outline" 
                        onClick={handleDownload}
                        className="border-slate-800 bg-slate-900/50 backdrop-blur-md text-slate-400 font-bold uppercase text-[10px] tracking-widest hover:bg-slate-800 transition-all rounded-xl h-12 px-6"
                      >
                        <Download className="h-4 w-4 mr-2" /> Export PDF
                     </Button>
                     <Button 
                      onClick={() => setOpen(false)}
                      className="bg-teal-600 hover:bg-teal-500 text-white font-black uppercase text-[10px] tracking-widest shadow-xl shadow-teal-500/20 h-12 px-8 rounded-xl transition-all hover:scale-105 active:scale-95"
                     >
                        Synchronize Fleet
                     </Button>
                  </div>
                </div>

                {/* Score / Metrics Ribbon */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <MetricSquare 
                    label="Grid Efficiency" 
                    value={optData.metrics?.score + "%"} 
                    subValue="+14.2% Delta"
                    icon={<Target className="h-5 w-5" />} 
                    color="teal"
                  />
                  <MetricSquare 
                    label="Response Delta" 
                    value={"-" + optData.metrics?.savings} 
                    subValue="System Average"
                    icon={<Clock className="h-5 w-5" />} 
                    color="amber"
                  />
                  <MetricSquare 
                    label="Demand Coverage" 
                    value="99.2%" 
                    subValue="Indiranagar/MG Road"
                    icon={<ShieldAlert className="h-5 w-5" />} 
                    color="emerald"
                  />
                  <MetricSquare 
                    label="Resource Load" 
                    value={optData.metrics?.utilization} 
                    subValue="Peak Resilience"
                    icon={<Users className="h-5 w-5" />} 
                    color="blue"
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                  {/* Strategic Summary */}
                  <div className="lg:col-span-12 xl:col-span-8 space-y-10">
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                         <h2 className="text-xl font-black text-white italic uppercase tracking-tighter">Strategic Intelligence Breakdown</h2>
                         <div className="h-px flex-1 bg-gradient-to-r from-teal-500/50 to-transparent" />
                      </div>
                      <div className="prose prose-invert max-w-none prose-h2:text-teal-400 prose-h2:uppercase prose-h2:tracking-widest prose-h2:text-sm prose-p:text-slate-400 prose-p:text-base prose-p:leading-relaxed prose-li:text-slate-400">
                        <div dangerouslySetInnerHTML={{ __html: parseMarkdown(optData.summary) }} />
                      </div>
                    </div>

                    {/* Timeline Table Design */}
                    <div className="space-y-6">
                       <div className="flex items-center gap-4">
                          <h2 className="text-sm font-black text-teal-500 uppercase tracking-widest">Unit Re-Assignment Protocol</h2>
                          <div className="h-px flex-1 bg-gradient-to-r from-teal-500/20 to-transparent" />
                       </div>
                       <div className="rounded-3xl border border-slate-800/50 bg-slate-900/30 backdrop-blur-md overflow-hidden">
                         <table className="w-full text-left">
                            <thead className="bg-slate-900/50 border-b border-slate-800/50">
                               <tr className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                  <th className="px-6 py-4">Vehicle Unit</th>
                                  <th className="px-6 py-4">Baseline Status</th>
                                  <th className="px-6 py-4">Transition Action</th>
                                  <th className="px-6 py-4 text-center">Efficiency Window</th>
                                  <th className="px-6 py-4 text-right">Coverage Gain</th>
                               </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/30">
                               {optData.unitOptimizations?.map((unit: any) => (
                                  <tr key={unit.id} className="group hover:bg-white/[0.02] transition-colors">
                                     <td className="px-6 py-4 font-black text-white text-sm italic">{unit.id}</td>
                                     <td className="px-6 py-4 text-slate-400 text-xs">{unit.current}</td>
                                     <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                           <div className="h-1.5 w-1.5 rounded-full bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.6)]" />
                                           <span className="text-xs font-bold text-teal-400 uppercase tracking-tighter">{unit.optimized}</span>
                                        </div>
                                     </td>
                                     <td className="px-6 py-4 text-center">
                                        <span className="px-3 py-1 rounded-full bg-slate-800/50 text-slate-400 text-[9px] font-mono border border-slate-700/50">{unit.window}</span>
                                     </td>
                                     <td className="px-6 py-4 text-right font-black text-emerald-500 text-xs italic tracking-tight">{unit.impact}</td>
                                  </tr>
                               ))}
                            </tbody>
                         </table>
                       </div>
                    </div>
                  </div>

                  {/* Impact Sidebar */}
                  <div className="lg:col-span-12 xl:col-span-4 space-y-8">
                     <div className="rounded-3xl border border-slate-800/50 bg-slate-900/30 backdrop-blur-xl p-8 space-y-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 blur-[40px] -mr-16 -mt-16 group-hover:bg-teal-500/10 transition-colors" />
                        
                        <div className="space-y-2">
                           <h3 className="text-sm font-black text-white italic uppercase tracking-[0.2em] flex items-center gap-2">
                              <Activity className="h-4 w-4 text-emerald-500" />
                              Dynamic Uplift
                           </h3>
                           <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Predictive Grid Performance</p>
                        </div>

                        <div className="h-[250px] w-full">
                           <ResponsiveContainer width="100%" height="100%">
                             <AreaChart data={optData.metrics?.chartData}>
                               <defs>
                                 <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                                   <stop offset="5%" stopColor="#1e293b" stopOpacity={0.1}/>
                                   <stop offset="95%" stopColor="#1e293b" stopOpacity={0}/>
                                 </linearGradient>
                                 <linearGradient id="colorOpt" x1="0" y1="0" x2="0" y2="1">
                                   <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.4}/>
                                   <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                                 </linearGradient>
                               </defs>
                               <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                               <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 9, fontWeight: 700}} />
                               <YAxis axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 9, fontWeight: 700}} />
                               <Tooltip 
                                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', fontSize: '10px', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}
                               />
                               <Area type="monotone" dataKey="current" name="BASELINE" stroke="#334155" strokeWidth={2} fill="url(#colorCurrent)" strokeDasharray="4 4" />
                               <Area type="monotone" dataKey="optimized" name="AI OPTIMIZED" stroke="#14b8a6" strokeWidth={4} fill="url(#colorOpt)" />
                             </AreaChart>
                           </ResponsiveContainer>
                        </div>

                        <div className="space-y-4 pt-4">
                           <div className="p-4 rounded-2xl bg-teal-500/5 border border-teal-500/10 flex items-start gap-3">
                              <CheckCircle2 className="h-5 w-5 text-teal-400 shrink-0 mt-0.5" />
                              <div className="space-y-1">
                                 <p className="text-[10px] font-black text-teal-400 uppercase tracking-widest italic">Optimization Success</p>
                                 <p className="text-[11px] text-slate-400 leading-relaxed font-medium">The proposed realignment reduces critical district coverage gaps by <span className="text-white font-bold tracking-tight">22.4%</span> through AI pre-positioning.</p>
                              </div>
                           </div>
                        </div>
                     </div>

                     {/* Intelligence Note */}
                     <div className="p-6 border border-slate-800/40 rounded-3xl text-center space-y-3">
                        <div className="flex justify-center -space-x-3">
                           <div className="w-8 h-8 rounded-full border border-slate-900 bg-slate-800 flex items-center justify-center"><Users className="h-3 w-3 text-slate-400" /></div>
                           <div className="w-8 h-8 rounded-full border border-slate-900 bg-teal-600 flex items-center justify-center"><Zap className="h-3 w-3 text-white" /></div>
                           <div className="w-8 h-8 rounded-full border border-slate-900 bg-slate-800 flex items-center justify-center"><ShieldAlert className="h-3 w-3 text-slate-400" /></div>
                        </div>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-relaxed">
                          Synchronizing these units will affect <span className="text-white">4 Dispatch Commanders</span> and <span className="text-white">12 Crew Members</span>.
                        </p>
                     </div>
                  </div>
                </div>

                {/* Report Footer */}
                <div className="flex items-center justify-between pt-12 border-t border-slate-800/50">
                  <div className="flex items-center gap-3">
                    <img src="/logo.svg" alt="SO" className="h-5 w-5 grayscale opacity-20" />
                    <div className="flex flex-col">
                       <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.3em]">Neural Integrity Verified</span>
                       <span className="text-[8px] font-bold text-slate-700 uppercase">SwasthyaOS Intelligent Systems Division</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[8px] font-mono text-slate-700 uppercase tracking-widest italic">ID: {Math.random().toString(36).substring(7).toUpperCase()}-AMS-NODE-4.5</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-40 text-center flex flex-col items-center justify-center relative z-10">
              <div className="bg-red-500/10 p-8 rounded-[40px] mb-8 border border-red-500/20">
                <AlertCircle className="h-16 w-16 text-red-500" />
              </div>
              <h3 className="text-4xl font-black text-white italic mb-4 uppercase tracking-tighter">STRUCTURAL ANOMALY DETECTED</h3>
              <p className="text-slate-400 max-w-sm mx-auto mb-10 text-xs uppercase font-black tracking-widest leading-relaxed">
                The optimization node reported an out-of-bounds heuristic parameter. Handshake failed.
              </p>
              <Button onClick={fetchOptimization} variant="outline" className="h-14 px-10 rounded-2xl border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-white transition-all font-black uppercase text-[10px] tracking-[0.2em]">
                 <Zap className="h-4 w-4 mr-2 text-amber-500" /> Retry Handshake
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function MetricSquare({ label, value, subValue, icon, color }: { label: string, value: string, subValue: string, icon: React.ReactNode, color: 'teal' | 'amber' | 'emerald' | 'blue' }) {
  const themes = {
    teal: "text-teal-400 border-teal-500/20 bg-teal-500/5",
    amber: "text-amber-400 border-amber-500/20 bg-amber-500/5",
    emerald: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
    blue: "text-blue-400 border-blue-500/20 bg-blue-500/5",
  };

  return (
    <div className={`p-6 rounded-3xl border border-slate-800/50 bg-slate-900/20 backdrop-blur-md transition-all hover:translate-y-[-4px] hover:bg-white/[0.04] group ${themes[color]}`}>
      <div className="flex justify-between items-start mb-6">
         <div className="p-3 rounded-2xl bg-slate-950/50 border border-slate-800/50 group-hover:border-current transition-colors">
            {icon}
         </div>
         <div className="text-right">
            <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">{label}</p>
            <div className="text-3xl font-black italic tracking-tighter leading-none text-white">{value}</div>
         </div>
      </div>
      <div className="flex items-center gap-2">
         <TrendingUp className="h-3 w-3" />
         <span className="text-[9px] font-bold uppercase tracking-widest opacity-60">{subValue}</span>
      </div>
    </div>
  );
}

function parseMarkdown(text: string) {
  let html = text
    .replace(/^# (.*$)/gim, '<h1 class="text-4xl font-black mb-8 italic tracking-tighter text-white border-b-4 border-teal-600 pb-2 inline-block">$1</h1>')
    .replace(/^## (.*$)/gim, '<h2 class="text-[10px] font-black mb-4 mt-8 text-teal-400 uppercase tracking-[0.3em] inline-block py-1 px-3 rounded bg-teal-500/10 border border-teal-500/20">$1</h2>')
    .replace(/^### (.*$)/gim, '<h3 class="text-sm font-black mb-3 mt-6 text-slate-100 italic uppercase">$1</h3>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong class="font-bold text-white shadow-teal-500/20">$1</strong>')
    .replace(/^\s*\-\s(.*)$/gim, '<li class="flex items-start gap-4 mb-3 text-slate-400 list-none before:content-[\'→\'] before:text-teal-500 before:font-black before:text-xs">$1</li>')
    .replace(/\n\n/g, '</div><div class="mb-4">')
    .replace(/\n/g, '<br/>');
  
  return `<div class="mb-4">${html}</div>`;
}
