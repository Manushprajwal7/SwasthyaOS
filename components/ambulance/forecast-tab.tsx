"use client";

import React, { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from "recharts";
import { 
  TrendingUp, 
  Filter, 
  AlertCircle, 
  Calendar,
  Layers,
  ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const districtData = [
  { name: "Bengaluru Urban", predicted: 45, actual: 38 },
  { name: "Mysuru", predicted: 22, actual: 25 },
  { name: "Mangaluru", predicted: 15, actual: 12 },
  { name: "Hubballi", predicted: 18, actual: 16 },
  { name: "Belagavi", predicted: 10, actual: 11 },
];

const hourlyDemand = [
  { time: "16:00", demand: 12 },
  { time: "17:00", demand: 15 },
  { time: "18:00", demand: 18 },
  { time: "19:00", demand: 24 },
  { time: "20:00", demand: 28 },
  { time: "21:00", demand: 25 },
  { time: "22:00", demand: 20 },
  { time: "23:00", demand: 15 },
];

const incidentTypes = [
  { name: "Cardiac", value: 35, color: "#0d9488" }, // teal-600
  { name: "Trauma/Accident", value: 30, color: "#ef4444" }, // red-500
  { name: "Respiratory", value: 20, color: "#3b82f6" }, // blue-500
  { name: "Other", value: 15, color: "#f59e0b" }, // amber-500
];

const resourceGapData = [
  { time: "08:00", required: 12, available: 14 },
  { time: "10:00", required: 15, available: 14 },
  { time: "12:00", required: 18, available: 16 },
  { time: "14:00", required: 22, available: 18 },
  { time: "16:00", required: 25, available: 20 },
  { time: "18:00", required: 28, available: 20 },
  { time: "20:00", required: 24, available: 22 },
  { time: "22:00", required: 18, available: 22 },
];

const severityForecast = [
  { day: "Mon", critical: 12, urgent: 25, routine: 45 },
  { day: "Tue", critical: 10, urgent: 22, routine: 48 },
  { day: "Wed", critical: 15, urgent: 28, routine: 42 },
  { day: "Thu", critical: 14, urgent: 30, routine: 40 },
  { day: "Fri", critical: 18, urgent: 35, routine: 38 },
  { day: "Sat", critical: 22, urgent: 40, routine: 35 },
  { day: "Sun", critical: 20, urgent: 38, routine: 30 },
];

export function ForecastTab() {
  const { toast } = useToast();
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Filters & Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex gap-2">
           <Button 
            variant="outline" 
            onClick={() => toast({ title: "District Filter", description: "Geospatial filtering is currently localized to current district data." })}
            className="border-slate-200 dark:border-slate-800 text-xs gap-2"
           >
             <Filter className="h-3.5 w-3.5" /> District: All
           </Button>
           <Button 
            variant="outline" 
            onClick={() => toast({ title: "Time Range", description: "Forecasting engine is active for the standard 12h operational window." })}
            className="border-slate-200 dark:border-slate-800 text-xs gap-2"
           >
             <Calendar className="h-3.5 w-3.5" /> Range: Next 12h
           </Button>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg">
           <ShieldCheck className="h-4 w-4 text-emerald-600" />
           <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">PREDICTION CONFIDENCE: 92%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* District Prediction */}
        <Card className="lg:col-span-8 p-6 border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Layers className="h-4 w-4 text-teal-600" />
              Predicted Emergency Incidents per District
            </h3>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={districtData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: "#64748b", fontWeight: 600 }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: "#64748b" }} 
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  cursor={{ fill: 'rgba(226, 232, 240, 0.4)' }}
                />
                <Bar dataKey="predicted" name="Predicted" fill="#0d9488" radius={[4, 4, 0, 0]} />
                <Bar dataKey="actual" name="Actual (Ytd)" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Incident Distribution */}
        <Card className="lg:col-span-4 p-6 border-slate-200 dark:border-slate-800">
           <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-6">
             Incident Type Distribution
           </h3>
           <div className="h-[250px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={incidentTypes}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {incidentTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                 <span className="text-2xl font-bold text-slate-900 dark:text-white">84</span>
                 <span className="text-[10px] text-slate-400 font-bold uppercase">Total calls</span>
              </div>
           </div>
           <div className="mt-4 space-y-2">
              {incidentTypes.map((type) => (
                <div key={type.name} className="flex items-center justify-between text-xs">
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: type.color }} />
                      <span className="text-slate-500 font-medium">{type.name}</span>
                   </div>
                   <span className="text-slate-900 dark:text-white font-bold">{type.value}%</span>
                </div>
              ))}
           </div>
        </Card>

        {/* Hourly Demand Area Chart */}
        <Card className="lg:col-span-12 p-6 border-slate-200 dark:border-slate-800">
           <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-emerald-600" />
                Hourly Demand Forecast
              </h3>
              <div className="flex items-center gap-4">
                 <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold">
                    <div className="w-3 h-1 bg-emerald-500 rounded-full" />
                    PREDICTED LOAD
                 </div>
              </div>
           </div>
           <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={hourlyDemand} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="time" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: "#94a3b8" }} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: "#94a3b8" }} 
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="demand" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorDemand)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
           </div>
        </Card>

        {/* Resource Gap Analysis */}
        <Card className="lg:col-span-6 p-6 border-slate-200 dark:border-slate-800">
           <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-6 flex items-center gap-2">
             <Layers className="h-4 w-4 text-blue-500" />
             Resource Gap Analysis (Required vs Available)
           </h3>
           <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={resourceGapData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: "#94a3b8"}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: "#94a3b8"}} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                  <Legend iconType="circle" wrapperStyle={{fontSize: '10px', fontWeight: 600, paddingTop: '10px'}} />
                  <Line type="monotone" dataKey="required" name="Required Units" stroke="#ef4444" strokeWidth={3} dot={{ r: 4, fill: "#ef4444" }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="available" name="Available Units" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: "#3b82f6" }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
           </div>
        </Card>

        {/* Severity Forecast */}
        <Card className="lg:col-span-6 p-6 border-slate-200 dark:border-slate-800">
           <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-6 flex items-center gap-2">
             <AlertCircle className="h-4 w-4 text-red-500" />
             Incident Severity Projection (Weekly)
           </h3>
           <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={severityForecast} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: "#94a3b8"}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: "#94a3b8"}} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                  <Legend iconType="square" wrapperStyle={{fontSize: '10px', fontWeight: 600, paddingTop: '10px'}} />
                  <Bar dataKey="critical" name="Critical (P1)" stackId="a" fill="#ef4444" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="urgent" name="Urgent (P2)" stackId="a" fill="#f59e0b" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="routine" name="Routine (P3)" stackId="a" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
           </div>
        </Card>
      </div>

      <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 p-4 rounded-xl flex items-start gap-4">
         <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
         <div>
            <p className="text-xs font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider mb-1">Regional Alert: Predicted Spike</p>
            <p className="text-sm text-amber-700 dark:text-amber-500">
              High correlation between <span className="font-bold">Weather (Thunderstorm)</span> and <span className="font-bold">Trauma/Accident</span> incidents predicted for Central District between 18:30 - 21:00. Recommend pre-positioning 2 additional units.
            </p>
         </div>
      </div>
    </div>
  );
}
