"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  Activity,
  Navigation,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  Clock,
  ArrowRight,
  MapPin,
  TrendingDown,
  TrendingUp,
  ShieldCheck,
  Zap,
  ChevronDown,
  ChevronUp,
  FileText,
  Play
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

interface NeuralDispatchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const loadingSteps = [
  "Running neural optimization...",
  "Analyzing incident clusters...",
  "Calculating optimal routes...",
  "Generating dispatch recommendations...",
];

export function NeuralDispatchModal({ isOpen, onClose }: NeuralDispatchModalProps) {
  const { toast } = useToast();
  const [loadingStage, setLoadingStage] = useState(0);
  const [isComputing, setIsComputing] = useState(true);
  const [showReasoning, setShowReasoning] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsComputing(true);
      setLoadingStage(0);
      const interval = setInterval(() => {
        setLoadingStage((prev) => {
          if (prev >= loadingSteps.length - 1) {
            clearInterval(interval);
            setTimeout(() => setIsComputing(false), 800);
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  const handleApply = () => {
    toast({
      title: "Dispatch plan successfully updated.",
      description: "3 ambulances repositioned based on neural optimization.",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[95vw] w-[95vw] max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 p-0 rounded-2xl shadow-2xl gap-0">
        {isComputing ? (
          <div className="h-[500px] flex flex-col items-center justify-center p-12 text-center bg-slate-50 dark:bg-slate-900/50">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-teal-500/20 blur-3xl animate-pulse rounded-full" />
              <Brain className="h-16 w-16 text-teal-600 animate-bounce relative z-10" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Neural Engine Computing</h3>
            <p className="text-sm text-slate-500 mb-8 max-w-md">Processing real-time operational datasets through SwasthyaOS Neural Dispatcher...</p>
            
            <div className="w-full max-w-sm space-y-4">
              <Progress value={((loadingStage + 1) / loadingSteps.length) * 100} className="h-2 bg-slate-200 dark:bg-slate-800" />
              <div className="space-y-2">
                {loadingSteps.map((step, i) => (
                  <div key={i} className={`flex items-center gap-3 text-xs font-bold transition-all duration-500 ${
                    i === loadingStage ? 'text-teal-600 scale-105' : i < loadingStage ? 'text-slate-400' : 'text-slate-200 dark:text-slate-800'
                  }`}>
                    {i < loadingStage ? <CheckCircle2 className="h-4 w-4" /> : <Activity className={`h-4 w-4 ${i === loadingStage ? 'animate-spin' : ''}`} />}
                    {step}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in zoom-in duration-300">
            {/* Header */}
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex justify-between items-center">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <div className="p-2 bg-red-100 dark:bg-red-950/30 rounded-lg">
                    <Brain className="h-5 w-5 text-red-600" />
                  </div>
                  <DialogTitle className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Neural Dispatch Optimization</DialogTitle>
                </div>
                <DialogDescription className="text-slate-500 font-medium">
                  AI-driven optimization for ambulance routing, allocation, and response time reduction.
                </DialogDescription>
              </div>
              <div className="text-right">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900 rounded-full mb-1">
                   <Zap className="h-3.5 w-3.5 text-emerald-600" />
                   <span className="text-[10px] font-black text-emerald-700 uppercase">AI Confidence: 91%</span>
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Powered by AWS Bedrock</p>
              </div>
            </div>

            <div className="p-8 space-y-8">
              {/* SECTION 1: OPTIMIZATION SUMMARY */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                   <Activity className="h-4 w-4 text-red-600" />
                   <h4 className="text-sm font-black uppercase tracking-widest text-slate-400">Section 1: Optimization Summary</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: "Current Response Time", value: "8.4 min", icon: <Clock className="h-4 w-4 text-slate-400" /> },
                    { label: "Projected Response Time", value: "6.9 min", icon: <TrendingDown className="h-4 w-4 text-emerald-500" />, trend: "improvement" },
                    { label: "Response Improvement", value: "18% faster", icon: <Zap className="h-4 w-4 text-blue-500" /> },
                    { label: "Ambulances Repositioned", value: "3 units", icon: <Navigation className="h-4 w-4 text-red-500" /> },
                  ].map((stat, i) => (
                    <Card key={i} className="p-4 bg-slate-50 dark:bg-slate-900/30 border-slate-200 dark:border-slate-800 overflow-hidden relative group">
                      <div className="flex justify-between items-start mb-2">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter leading-tight">{stat.label}</p>
                        {stat.icon}
                      </div>
                      <p className={`text-xl font-black ${stat.trend === 'improvement' ? 'text-emerald-500' : 'text-slate-900 dark:text-white'}`}>{stat.value}</p>
                      <div className="absolute bottom-0 right-0 p-1 opacity-10 group-hover:opacity-20 transition-opacity">
                         {stat.icon}
                      </div>
                    </Card>
                  ))}
                </div>
                <p className="text-[10px] text-slate-400 italic">Optimization computed using incident clustering and real-time travel-time models.</p>
              </div>

              {/* SECTION 2: AI DISPATCH RECOMMENDATIONS */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                   <FileText className="h-4 w-4 text-blue-600" />
                   <h4 className="text-sm font-black uppercase tracking-widest text-slate-400">Section 2: AI Dispatch Recommendations</h4>
                </div>
                <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
                        <th className="p-4 font-black uppercase text-[10px] text-slate-500">Ambulance</th>
                        <th className="p-4 font-black uppercase text-[10px] text-slate-500">Current Location</th>
                        <th className="p-4 font-black uppercase text-[10px] text-slate-500">Recommended Action</th>
                        <th className="p-4 font-black uppercase text-[10px] text-slate-500">Reason</th>
                        <th className="p-4 font-black uppercase text-[10px] text-slate-500">Priority</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {[
                        { id: "KA-01-AM-2048", current: "Whitefield", action: "Reposition to Indiranagar", reason: "High predicted incident cluster", priority: "High", color: "text-amber-500 bg-amber-50 dark:bg-amber-900/20 border-amber-200" },
                        { id: "KA-01-AM-3072", current: "Yelahanka", action: "Standby near Hebbal", reason: "Hospital surge predicted", priority: "Medium", color: "text-blue-500 bg-blue-50 dark:bg-blue-900/20 border-blue-200" },
                        { id: "KA-01-AM-1024", current: "Indiranagar", action: "Dispatch to KR Puram", reason: "Critical cardiac incident", priority: "Critical", color: "text-red-600 bg-red-50 dark:bg-red-900/20 border-red-200" },
                      ].map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors">
                          <td className="p-4 font-bold text-slate-900 dark:text-white">{row.id}</td>
                          <td className="p-4 text-slate-500">{row.current}</td>
                          <td className="p-4 font-bold text-blue-600 dark:text-blue-400">{row.action}</td>
                          <td className="p-4 text-slate-500">{row.reason}</td>
                          <td className="p-4">
                            <Badge className={`${row.color} font-black text-[9px] uppercase h-5`}>{row.priority}</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* SECTION 3: RESOURCE REALLOCATION MAP */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                     <MapPin className="h-4 w-4 text-emerald-600" />
                     <h4 className="text-sm font-black uppercase tracking-widest text-slate-400">Section 3: Resource Reallocation Map</h4>
                  </div>
                  <Card className="aspect-video bg-slate-900 p-0 overflow-hidden relative flex items-center justify-center border-slate-800">
                    <svg className="w-full h-full p-8" viewBox="0 0 400 240">
                      {/* Grid/Stylized Map */}
                      <path d="M0 40h400M0 80h400M0 120h400M0 160h400M0 200h400M40 0v240M80 0v240M120 0v240M160 0v240M200 0v240M240 0v240M280 0v240M320 0v240M360 0v240" stroke="#1e293b" strokeWidth="1" />
                      
                      {/* Incident Clusters */}
                      <circle cx="320" cy="180" r="15" fill="#ef4444" fillOpacity="0.3" className="animate-pulse" />
                      <circle cx="320" cy="180" r="4" fill="#ef4444" />
                      <text x="330" y="185" fill="#ef4444" className="text-[10px] font-bold">Predicted Cluster</text>

                      {/* Current Locations */}
                      <circle cx="60" cy="60" r="5" fill="#3b82f6" />
                      <text x="70" y="65" fill="#3b82f6" className="text-[10px] font-bold">AMB-2048</text>

                      <circle cx="100" cy="180" r="5" fill="#3b82f6" />
                      <text x="110" y="185" fill="#3b82f6" className="text-[10px] font-bold">AMB-1024</text>

                      {/* Recommended Zones */}
                      <circle cx="200" cy="100" r="5" fill="#10b981" />
                      <text x="210" y="105" fill="#10b981" className="text-[10px] font-bold">Standby Zone Alpha</text>

                      {/* Animated Routes */}
                      <path d="M65 65 Q 150 65 195 95" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" fill="transparent" className="animate-dash" />
                      <polygon points="190,90 198,98 191,98" fill="#10b981" />
                      
                      <path d="M110 180 Q 210 180 310 180" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5" fill="transparent" className="animate-dash" />
                      <polygon points="305,175 313,180 305,185" fill="#ef4444" />
                    </svg>

                    <div className="absolute top-4 right-4 space-y-2">
                       <div className="flex items-center gap-2 bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                          <div className="w-2 h-2 rounded-full bg-red-500" />
                          <span className="text-[8px] font-bold text-slate-400 uppercase">Emergency Cluster</span>
                       </div>
                       <div className="flex items-center gap-2 bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                          <div className="w-2 h-2 rounded-full bg-blue-500" />
                          <span className="text-[8px] font-bold text-slate-400 uppercase">Current Unit</span>
                       </div>
                       <div className="flex items-center gap-2 bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                          <div className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span className="text-[8px] font-bold text-slate-400 uppercase">Recommended Standby</span>
                       </div>
                    </div>
                  </Card>
                </div>

                {/* SECTION 4: PREDICTED RESPONSE IMPROVEMENTS */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                     <TrendingUp className="h-4 w-4 text-teal-600" />
                     <h4 className="text-sm font-black uppercase tracking-widest text-slate-400">Section 4: Predicted Improvements</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="p-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
                       <p className="text-[10px] font-black text-slate-400 uppercase mb-3 text-center">Avg Response (Before)</p>
                       <div className="flex justify-center items-center h-20">
                          <p className="text-4xl font-black text-slate-900 dark:text-white">8.4<span className="text-lg text-slate-400 font-medium">m</span></p>
                       </div>
                    </Card>
                    <Card className="p-4 border-slate-200 dark:border-slate-800 bg-teal-50 dark:bg-teal-900/20 border-teal-100 dark:border-teal-900">
                       <p className="text-[10px] font-black text-teal-600 uppercase mb-3 text-center">Avg Response (After)</p>
                       <div className="flex justify-center items-center h-20">
                          <p className="text-4xl font-black text-emerald-600">6.9<span className="text-lg text-emerald-400 font-medium">m</span></p>
                       </div>
                    </Card>
                  </div>
                  
                  <div className="space-y-3">
                    {[
                      { label: "Dispatch Efficiency", value: 94, color: "bg-blue-500" },
                      { label: "Coverage Density", value: 88, color: "bg-emerald-500" },
                      { label: "Hospital Load Balancing", value: 76, color: "bg-amber-500" },
                    ].map((metric, i) => (
                      <div key={i} className="space-y-1.5">
                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest leading-none">
                          <span className="text-slate-500">{metric.label}</span>
                          <span className="text-slate-900 dark:text-white">{metric.value}%</span>
                        </div>
                        <Progress value={metric.value} className={`h-1.5 ${metric.color} bg-slate-100 dark:bg-slate-800`} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Show AI Reasoning Toggle */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <button 
                  onClick={() => setShowReasoning(!showReasoning)}
                  className="flex items-center gap-2 text-xs font-black uppercase text-teal-600 hover:text-teal-500 transition-colors"
                >
                  {showReasoning ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  Show AI Reasoning & Strategy Overview
                </button>
                {showReasoning && (
                  <div className="mt-4 p-5 bg-teal-50 dark:bg-teal-950/30 rounded-xl border border-teal-100 dark:border-teal-900/50 animate-in slide-in-from-top-2 duration-300">
                    <div className="flex items-start gap-4">
                       <ShieldCheck className="h-6 w-6 text-teal-600 mt-1 shrink-0" />
                       <div className="space-y-4">
                          <div>
                             <h5 className="text-xs font-black uppercase text-teal-800 dark:text-teal-400 mb-1">Incident Clustering Logic</h5>
                             <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                               Our neural network identified a high-probability emergency cluster in the **Indiranagar-KR Puram** corridor based on historical Sunday evening metrics and local traffic weather modeling. AMB-2048 is underutilized in Whitefield and its repositioning reduces response lag by an estimated 240 seconds.
                             </p>
                          </div>
                          <div>
                             <h5 className="text-xs font-black uppercase text-teal-800 dark:text-teal-400 mb-1">Hospital Capacity Optimization</h5>
                             <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                               Hebbal District hospitals are currently reporting 85% bed saturation. Recommended routing for non-trauma incidents is being redirected to secondary triage centers to maintain critical care availability.
                             </p>
                          </div>
                       </div>
                    </div>
                  </div>
                )}
              </div>

              {/* SECTION 5: ACTION CONTROLS */}
              <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
                 <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={() => toast({ title: "Simulation Started", description: "Virtual dispatch relay simulation is now active in memory." })}
                  className="text-xs font-black uppercase tracking-widest px-8 border-slate-200 dark:border-slate-800 h-12"
                 >
                   Simulate Only
                 </Button>
                 <Button 
                  variant="outline" 
                  onClick={() => toast({ title: "Export Started", description: "Generating high-fidelity dispatch manifest (PDF)..." })}
                  className="text-xs font-black uppercase tracking-widest px-8 border-slate-200 dark:border-slate-800 h-12"
                 >
                   Export Dispatch Plan
                 </Button>
                 <Button 
                  onClick={handleApply}
                  className="text-xs font-black uppercase tracking-widest px-10 bg-red-600 hover:bg-red-500 text-white h-12 shadow-lg shadow-red-500/20 active:scale-95 transition-all flex gap-2"
                 >
                   <Play className="h-3.5 w-3.5 fill-current" /> Apply Optimization
                 </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
      <style jsx global>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -100;
          }
        }
        .animate-dash {
          animation: dash 10s linear infinite;
        }
      `}</style>
    </Dialog>
  );
}
