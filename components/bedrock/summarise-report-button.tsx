"use client";

import React, { useState, useRef } from "react";
import { 
  Sparkles, 
  Loader2, 
  Download, 
  FileText, 
  Activity, 
  Users, 
  AlertCircle, 
  MapPin, 
  Thermometer, 
  TrendingUp, 
  CheckCircle2,
  Calendar,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/language-context";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Area, 
  AreaChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis, 
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend
} from "recharts";
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const COLORS = ['#f97316', '#3b82f6', '#10b981', '#8b5cf6', '#ef4444'];

export function SummariseReportButton() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState<any>(null);
  const reportRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const fetchSummary = async () => {
    setLoading(true);
    setOpen(true);
    setReportData(null);
    try {
      const response = await fetch("/api/bedrock/summarise");
      const data = await response.json();
      
      setTimeout(() => {
        if (data.success) {
          setReportData(data);
        } else {
          setReportData({ error: "System Analysis Time-out. Please retry." });
        }
        setLoading(false);
      }, 2500);

    } catch (e) {
      console.error(e);
      setReportData({ error: "Network error. Please check your connection." });
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
        backgroundColor: "#ffffff"
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      pdf.addImage(imgData, "PNG", 0, 0, 210, (canvas.height * 210) / canvas.width);
      pdf.save(`SwasthyaOS_Executive_Report_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button 
        onClick={fetchSummary}
        className="gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white border-0 shadow-lg shadow-orange-500/20 transition-all hover:scale-105 active:scale-95 px-6 rounded-full"
        size="sm"
      >
        <Sparkles className="h-4 w-4" />
        <span className="hidden sm:inline font-bold uppercase tracking-widest text-[10px]">{t("report.button")}</span>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-[90vw] xl:max-w-[85vw] max-h-[95vh] overflow-y-auto p-0 border-0 bg-white shadow-2xl">
          <DialogTitle className="sr-only">AWS Bedrock Executive Summary</DialogTitle>
          
          <div className="bg-white rounded-[40px] shadow-[0_0_100px_rgba(59,130,246,0.15)] overflow-hidden border border-slate-200 relative">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 blur-[150px] rounded-full -mr-80 -mt-80 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-500/3 blur-[150px] rounded-full -ml-80 -mb-80 pointer-events-none" />

            {loading ? (
              <div className="flex flex-col items-center justify-center py-48 gap-8 text-center relative z-10">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-10 animate-pulse" />
                  <Loader2 className="h-20 w-20 animate-spin text-blue-500 relative z-10" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-3xl font-black italic text-gray-800 uppercase tracking-tighter">
                    {t("report.loading.title")}
                  </h3>
                  <p className="text-gray-600 flex items-center justify-center gap-3 text-xs font-black uppercase tracking-[0.3em]">
                    <Zap className="h-4 w-4 animate-bounce text-amber-500" />
                    {t("report.loading.subtitle")}
                  </p>
                </div>
              </div>
            ) : reportData && reportData.success === true ? (
              <div ref={reportRef} className="flex flex-col animate-fade-in relative z-10">
                {/* Header Decoration */}
                <div className="h-2 w-full bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500" />
                
                <div className="p-8 sm:p-14 space-y-14">
                  {/* Title & Actions */}
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="space-y-4">
                       <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 text-[10px] font-black uppercase tracking-widest">
                          <Activity className="h-3 w-3" />
                          Enterprise System Health
                       </div>
                       <h1 className="text-5xl md:text-7xl font-black text-gray-800 italic uppercase tracking-tighter leading-[0.85]">
                          Executive<br/>Summary Report
                       </h1>
                       <div className="flex items-center gap-6 text-[10px] font-bold text-gray-600 uppercase tracking-widest">
                          <span className="flex items-center gap-2 border-r border-gray-300 pr-6"><Calendar className="h-3 w-3" /> {new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                          <span className="flex items-center gap-2"><Zap className="h-3 w-3 text-amber-500" /> {t("report.header.powered")}</span>
                       </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                       <Button onClick={handleDownload} variant="outline" className="h-14 px-8 rounded-2xl border-gray-300 bg-gray-50/50 backdrop-blur-md text-gray-700 font-bold uppercase text-[10px] tracking-widest hover:bg-gray-100 transition-all">
                          <Download className="h-4 w-4 mr-2" /> PDF Export
                       </Button>
                       <Button onClick={() => setOpen(false)} className="h-14 px-8 rounded-2xl bg-gray-800 text-white font-black uppercase text-[10px] tracking-widest hover:bg-gray-900 transition-all">
                          Close Dashboard
                       </Button>
                    </div>
                  </div>

                  {/* High Impact Metrics */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <ReportMetricCard 
                      title={t("report.metric.patients")}
                      value={reportData.metrics?.totalPatients?.toLocaleString() || "0"} 
                      icon={<Users className="h-6 w-6" />} 
                      trend={reportData.metrics?.trends?.patients || "STABLE"}
                      color="blue"
                    />
                    <ReportMetricCard 
                      title={t("report.metric.consultations")}
                      value={reportData.metrics?.totalAppointments || "0"} 
                      icon={<Calendar className="h-6 w-6" />} 
                      trend={reportData.metrics?.trends?.appointments || "STABLE"}
                      color="orange"
                    />
                    <ReportMetricCard 
                      title={t("report.metric.alerts")}
                      value={reportData.metrics?.activeAlerts || "0"} 
                      icon={<AlertCircle className="h-6 w-6" />} 
                      trend="HIGH SEVERITY"
                      color="red"
                    />
                    <ReportMetricCard 
                      title={t("report.metric.efficiency")}
                      value={reportData.metrics?.trends?.efficiency || "94.2%"} 
                      icon={<TrendingUp className="h-6 w-6" />} 
                      trend="OPTIMAL"
                      color="green"
                    />
                  </div>

                  {/* Analysis Grids */}
                  <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
                    {/* Syndrome & Trends */}
                    <div className="xl:col-span-7 space-y-12">
                      <div className="space-y-6">
                        <div className="flex items-center gap-4">
                           <h2 className="text-xl font-black text-white italic uppercase tracking-tighter">{t("report.chart.syndrome.title")}</h2>
                           <div className="h-px flex-1 bg-gradient-to-r from-orange-500/50 to-transparent" />
                        </div>
                        <div className="h-[350px] w-full bg-gray-50/50 backdrop-blur-md rounded-3xl p-6 border border-gray-200/50">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={reportData.syndromes || []} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6b7280', fontWeight: 700 }} />
                              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6b7280', fontWeight: 700 }} />
                              <Tooltip 
                                cursor={{ fill: 'rgba(249, 115, 22, 0.05)' }}
                                contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '16px', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }}
                              />
                              <Legend verticalAlign="top" height={36} wrapperStyle={{fontSize: '10px', fontWeight: 900, textTransform: 'uppercase'}} />
                              <Bar dataKey="current" name={t("report.chart.syndrome.current")} fill="#f97316" radius={[6, 6, 0, 0]} barSize={32} />
                              <Bar dataKey="baseline" name={t("report.chart.syndrome.baseline")} fill="#9ca3af" radius={[6, 6, 0, 0]} barSize={32} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="flex items-center gap-4">
                           <h2 className="text-xl font-black text-white italic uppercase tracking-tighter">{t("report.chart.trend.title")}</h2>
                           <div className="h-px flex-1 bg-gradient-to-r from-emerald-500/50 to-transparent" />
                        </div>
                        <div className="h-[300px] w-full bg-gray-50/50 backdrop-blur-md rounded-3xl p-6 border border-gray-200/50">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={reportData.chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                              <defs>
                                <linearGradient id="colorPat" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 10, fontWeight: 700}} />
                              <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 10, fontWeight: 700}} />
                              <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '16px' }} />
                              <Area type="monotone" dataKey="patients" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorPat)" />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>

                    {/* AI Insights & Geo */}
                    <div className="xl:col-span-5 space-y-12">
                      <div className="rounded-[32px] bg-gray-50/50 backdrop-blur-xl border border-gray-200/50 p-10 space-y-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[80px] -mr-32 -mt-32 group-hover:bg-blue-500/10 transition-colors" />
                        
                        <div className="flex items-center gap-2 text-orange-500 font-black uppercase tracking-[0.2em] text-[10px]">
                          <Zap className="h-4 w-4" />
                          {t("report.insights.title")}
                        </div>
                        <div className="prose prose-gray max-w-none prose-h1:text-4xl prose-h2:text-sm prose-h2:text-blue-600 prose-h2:uppercase prose-h2:tracking-[0.2em] prose-p:text-gray-600 prose-p:text-base prose-p:leading-relaxed">
                          <div dangerouslySetInnerHTML={{ __html: parseReportMarkdown(reportData.summary) }} />
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="flex items-center gap-4">
                           <h2 className="text-xl font-black text-white italic uppercase tracking-tighter">{t("report.chart.geo.title")}</h2>
                           <div className="h-px flex-1 bg-gradient-to-r from-blue-500/50 to-transparent" />
                        </div>
                        <div className="h-[300px] w-full bg-gray-50/50 backdrop-blur-md rounded-[32px] p-6 border border-gray-200/50 flex flex-col justify-center">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={reportData.distribution || []}
                                cx="50%"
                                cy="50%"
                                innerRadius={70}
                                outerRadius={100}
                                paddingAngle={8}
                                dataKey="value"
                              >
                                {(reportData.distribution || []).map((entry: any, index: number) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="rgba(0,0,0,0.1)" strokeWidth={2} />
                                ))}
                              </Pie>
                              <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '16px' }} />
                              <Legend wrapperStyle={{fontSize: '9px', fontWeight: 900, textTransform: 'uppercase'}} />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-12 border-t border-gray-200/50">
                    <div className="flex items-center gap-4 text-[10px] font-black text-gray-600 uppercase tracking-widest leading-none">
                       <div className="p-3 rounded-xl bg-gray-50/50 border border-gray-200/50">
                          <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                       </div>
                       <div className="flex flex-col gap-1">
                          <span className="text-gray-500 italic">Neural Certification Active</span>
                          <span>{t("report.footer.verified")}</span>
                       </div>
                    </div>
                    <div className="text-right">
                       <span className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em]">ID: {Math.random().toString(36).substring(7).toUpperCase()}-ENT-SUMMARY</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-48 text-center flex flex-col items-center justify-center bg-gray-50">
                <div className="bg-red-500/10 p-10 rounded-[40px] mb-10 border border-red-200">
                  <AlertCircle className="h-16 w-16 text-red-500" />
                </div>
                <h3 className="text-4xl font-black text-gray-800 italic mb-4 uppercase tracking-tighter">{t("report.error.title")}</h3>
                <p className="text-gray-600 max-w-sm mx-auto mb-12 text-xs font-black uppercase tracking-widest leading-relaxed">
                  {reportData?.error === "System Analysis Time-out. Please retry." ? t("report.error.subtitle") : reportData?.error}
                </p>
                <Button onClick={fetchSummary} variant="outline" className="h-14 px-12 rounded-2xl border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all font-black uppercase text-[10px] tracking-[0.2em]">
                   <Zap className="h-4 w-4 mr-2 text-amber-500" /> {t("report.error.retry")}
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function ReportMetricCard({ title, value, icon, trend, color }: { title: string, value: string | number, icon: React.ReactNode, trend: string, color: 'blue' | 'orange' | 'green' | 'red' }) {
  const themes = {
    blue: "text-blue-600 border-blue-500/20 bg-blue-500/5 shadow-[0_10px_30px_rgba(59,130,246,0.1)]",
    orange: "text-orange-600 border-orange-500/20 bg-orange-500/5 shadow-[0_10px_30px_rgba(249,115,22,0.1)]",
    green: "text-emerald-600 border-emerald-500/20 bg-emerald-500/5 shadow-[0_10px_30px_rgba(16,185,129,0.1)]",
    red: "text-red-600 border-red-500/20 bg-red-500/5 shadow-[0_10px_30px_rgba(239,68,68,0.1)]",
  };

  return (
    <div className={`p-8 rounded-[32px] border border-gray-200/50 bg-gray-50/20 backdrop-blur-md transition-all hover:translate-y-[-6px] hover:bg-white/[0.04] group ${themes[color]}`}>
      <div className="flex justify-between items-start mb-8">
         <div className="h-14 w-14 rounded-2xl bg-white/50 border border-gray-200/50 flex items-center justify-center group-hover:border-current transition-colors">
            {icon}
         </div>
         <div className="text-right">
            <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">{title}</p>
            <div className="text-4xl font-black italic tracking-tighter leading-none text-gray-800">{value}</div>
         </div>
      </div>
      <div className="flex items-center gap-2">
         <TrendingUp className="h-3 w-3" />
         <span className="text-[10px] font-black uppercase tracking-widest opacity-60 italic">{trend}</span>
      </div>
    </div>
  );
}

function parseReportMarkdown(text: string) {
  let html = text
    .replace(/^# (.*$)/gim, '<h1 class="text-4xl font-black mb-10 italic tracking-tighter text-gray-800 border-b-4 border-orange-500 pb-2 inline-block">$1</h1>')
    .replace(/^## (.*$)/gim, '<h2 class="text-[10px] font-black mb-6 mt-10 text-blue-600 uppercase tracking-[0.3em] inline-block py-1 px-3 rounded bg-blue-500/10 border border-blue-500/20">$1</h2>')
    .replace(/^### (.*$)/gim, '<h3 class="text-base font-black mb-4 mt-8 text-gray-700 italic uppercase">$1</h3>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong class="font-bold text-gray-800">$1</strong>')
    .replace(/^\s*\-\s(.*)$/gim, '<li class="flex items-start gap-4 mb-4 text-gray-600 list-none before:content:[\'→\'] before:text-orange-500 before:font-black before:text-xs">$1</li>')
    .replace(/\n\n/g, '</div><div class="mb-4">')
    .replace(/\n/g, '<br/>');
  
  return `<div class="mb-4">${html}</div>`;
}
