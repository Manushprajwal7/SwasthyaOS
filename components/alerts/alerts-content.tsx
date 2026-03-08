"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, AlertTriangle, Info, CheckCircle, Trash2, Calendar, Clock, BellRing, Activity } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/language-context";
import { LivePulse } from "@/components/ui/live-pulse";
import { AWSBadge } from "@/components/ui/aws-badge";

export function AlertsContent() {
  const { toast } = useToast();
  const { t } = useLanguage();
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

  const [alerts, setAlerts] = useState([
    {
      id: 1,
      severity: "critical",
      type: "Emergency",
      title: "Critical Vitals - Patient Alert",
      description: "Patient John Doe (ID: P12345) - BP: 180/110, HR: 120 bpm - Immediate intervention required",
      timestamp: "2 minutes ago",
      read: false,
    },
    {
      id: 2,
      severity: "warning",
      type: "Patient Alert",
      title: "Medication Allergy Warning",
      description: "Patient Jane Smith scheduled for Penicillin has documented allergy. Check consultation before dispensing.",
      timestamp: "15 minutes ago",
      read: false,
    },
    {
      id: 3,
      severity: "info",
      type: "System",
      title: "Data Sync Completed",
      description: "Successfully synced 1,247 patient records with central database",
      timestamp: "1 hour ago",
      read: false,
    },
    {
      id: 4,
      severity: "critical",
      type: "Disease Outbreak",
      title: "Dengue Outbreak Alert - District Level",
      description: "Suspected dengue outbreak in North region with 47 confirmed cases in last 7 days",
      timestamp: "3 hours ago",
      read: true,
    },
    {
      id: 5,
      severity: "warning",
      type: "Low Stock",
      title: "Critical Medication Stock Low",
      description: "Insulin vials stock below minimum threshold - immediate reorder recommended",
      timestamp: "4 hours ago",
      read: true,
    },
    {
      id: 6,
      severity: "info",
      type: "Appointment",
      title: "Appointment Reminder",
      description: "Reminder: Consultation with Dr. Priya Sharma at 2:00 PM today",
      timestamp: "Yesterday",
      read: true,
    },
  ]);

  const severityIcons = {
    critical: <AlertCircle className="h-4 w-4 text-error" />,
    warning: <AlertTriangle className="h-4 w-4 text-warning" />,
    info: <Info className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />,
  };

  const severityColors = {
    critical: "bg-error/5 hover:bg-error/10 border-error/20 hover:border-error/40 shadow-sm",
    warning: "bg-warning/5 hover:bg-warning/10 border-warning/20 hover:border-warning/40 shadow-sm",
    info: "bg-white dark:bg-slate-900 border-border hover:border-indigo-200 dark:hover:border-indigo-800 shadow-sm",
  };

  const unreadCount = alerts.filter((a) => !a.read).length;
  const criticalCount = alerts.filter((a) => a.severity === "critical" && !a.read).length;

  const handleMarkAsRead = (id: number) => {
    setAlerts((prev) =>
      prev.map((alert) => (alert.id === id ? { ...alert, read: true } : alert))
    );
    toast({
      description: "Alert marked as read.",
    });
  };

  const handleDelete = (id: number) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    toast({
      description: "Alert deleted.",
    });
  };

  const handleClearAll = () => {
    setAlerts((prev) => prev.map((alert) => ({ ...alert, read: true })));
    toast({
      title: "Inbox Cleared",
      description: "All alerts have been marked as read.",
    });
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-full">
      {/* ===== Welcome Banner ===== */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fade-in-up">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground font-heading">
            {t("alerts.title")}
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
          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-purple-50 dark:bg-purple-950/30 px-3 py-1.5 rounded-full border border-purple-200 dark:border-purple-800">
            <LivePulse active color="teal" size="sm" />
            <span>{t("alerts.sync")}</span>
          </div>
          <AWSBadge service="EventBridge" status="active" />
        </div>
      </div>

      {/* ===== Layout Wrapper: 12-Column Grid ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-6">
        
        {/* ========================================================
            TOP ROW (Col Span 12): Alert Metrics
            ======================================================== */}
        <div className="lg:col-span-12 grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in-up" style={{ animationDelay: "0.05s" }}>
          <Card className="bg-slate-50 dark:bg-slate-900 border-border shadow-sm border-l-2 border-l-red-500">
            <CardHeader className="pb-2 p-4">
              <CardTitle className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-2">
                {t("alerts.metric.critical")}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-2xl font-bold font-heading text-red-600 dark:text-red-500">{criticalCount}</div>
              <p className="text-[11px] font-medium text-red-500/80 mt-1">{t("alerts.metric.immediate")}</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-50 dark:bg-slate-900 border-border shadow-sm border-l-2 border-l-indigo-500">
            <CardHeader className="pb-2 p-4">
              <CardTitle className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-2">
                {t("alerts.metric.unread")}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-2xl font-bold font-heading text-slate-800 dark:text-slate-100">{unreadCount}</div>
              <p className="text-[11px] font-medium text-indigo-500/80 mt-1">{t("alerts.metric.awaiting")}</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-50 dark:bg-slate-900 border-border shadow-sm">
            <CardHeader className="pb-2 p-4">
              <CardTitle className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-2">
                {t("alerts.metric.total")}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
               <div className="text-2xl font-bold font-heading text-slate-800 dark:text-slate-100">{alerts.length}</div>
              <p className="text-[11px] font-medium text-slate-500 mt-1">{t("alerts.metric.record")}</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-50 dark:bg-slate-900 border-border shadow-sm border-l-2 border-l-emerald-500">
            <CardHeader className="pb-2 p-4">
              <CardTitle className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-2">
                {t("alerts.metric.response")}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-2xl font-bold font-heading text-slate-800 dark:text-slate-100">2.3m</div>
              <p className="text-[11px] font-medium text-emerald-500 mt-1">{t("alerts.metric.average")}</p>
            </CardContent>
          </Card>
        </div>

        {/* ========================================================
            LEFT PILLAR (Col Span 8): Active Alert Feed
            ======================================================== */}
        <div className="lg:col-span-8 flex flex-col h-[calc(100vh-20rem)] overflow-y-auto custom-scrollbar pr-1 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <div className="space-y-3">
             {alerts.length === 0 ? (
               <div className="h-64 flex flex-col items-center justify-center p-12 text-center bg-slate-50 dark:bg-slate-900 rounded-xl border border-dashed border-border shadow-sm">
                <BellRing className="h-10 w-10 text-slate-300 dark:text-slate-600 mb-4" />
                <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300">{t("alerts.empty.title")}</h3>
                <p className="text-sm text-slate-500 mt-1">{t("alerts.empty.subtitle")}</p>
               </div>
             ) : (
               alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`relative p-4 rounded-xl border transition-all duration-200 ${severityColors[alert.severity as keyof typeof severityColors]} ${!alert.read ? "ring-2 ring-primary/20 ring-offset-1" : "opacity-80"}`}
                >
                  {/* Subtle accent line for critical unread */}
                  {alert.severity === "critical" && !alert.read && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500 rounded-l-xl opacity-90" />
                  )}

                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-white dark:bg-slate-800 rounded-full p-1 shadow-sm">
                      {severityIcons[alert.severity as keyof typeof severityIcons]}
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center flex-wrap gap-2">
                         <h3 className={`text-sm font-bold tracking-tight ${!alert.read ? "text-foreground" : "text-muted-foreground"}`}>
                           {alert.title}
                         </h3>
                         <span className="rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                           {alert.type}
                         </span>
                         {!alert.read && (
                           <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-pulse" />
                         )}
                      </div>

                      <p className={`text-xs ${!alert.read ? "text-slate-600 dark:text-slate-300 font-medium" : "text-slate-500 dark:text-slate-400"}`}>
                        {alert.description}
                      </p>

                      <div className="flex items-center text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
                         <Clock className="h-3 w-3 mr-1" />
                         {alert.timestamp}
                      </div>
                    </div>

                    <div className="flex gap-1 ml-2">
                      {!alert.read && (
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-900/30"
                          onClick={() => handleMarkAsRead(alert.id)}
                          title={t("alerts.mark_read")}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/30"
                        onClick={() => handleDelete(alert.id)}
                        title={t("alerts.delete")}
                      >
                        <Trash2 className="h-4 w-4 text-slate-400 hover:text-red-500 transition-colors" />
                      </Button>
                    </div>
                  </div>

                  {/* Actions for Critical Unread Alerts */}
                  {alert.severity === "critical" && !alert.read && (
                    <div className="mt-4 pt-3 border-t border-border flex gap-3 pl-11">
                      <Button 
                        size="sm" 
                        className="h-8 text-xs font-bold tracking-wide bg-error hover:bg-red-700 text-white shadow-sm"
                        onClick={() => {
                           toast({
                             title: "Protocol Activated",
                             description: `Initiating emergency sequence for ${alert.title}...`
                           });
                        }}
                      >
                        <Activity className="h-3 w-3 mr-1.5" />
                        {t("alerts.begin_intervention")}
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="h-8 text-xs font-semibold bg-white dark:bg-slate-900 shadow-sm"
                        onClick={() => {
                          toast({ description: "Opening extensive case details..."});
                        }}
                      >
                        {t("alerts.view_report")}
                      </Button>
                    </div>
                  )}
                </div>
               ))
             )}
          </div>
        </div>

        {/* ========================================================
            RIGHT PILLAR (Col Span 4): Statistics & Actions
            ======================================================== */}
        <div className="lg:col-span-4 space-y-6 flex flex-col h-[calc(100vh-20rem)] overflow-y-auto custom-scrollbar pl-1 animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
          
          <Button
            onClick={handleClearAll}
            disabled={unreadCount === 0}
            className="w-full gap-2 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 dark:text-slate-900 text-white shadow-sm h-12 text-sm font-bold tracking-wide transition-all disabled:opacity-50"
          >
            <CheckCircle className="h-4 w-4" />
            {t("alerts.mark_all")}
          </Button>

          <Card className="flex flex-col shadow-sm border border-border bg-white dark:bg-slate-900 relative">
             <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 opacity-90" />
             <CardHeader className="p-5 pt-6 pb-2">
               <CardTitle className="text-sm font-bold tracking-tight">{t("alerts.reliability")}</CardTitle>
               <CardDescription className="text-xs">{t("alerts.trends")}</CardDescription>
             </CardHeader>
             <CardContent className="p-5 space-y-5">
               {[
                 { type: "Critical Anomalies", count: 23, trend: "+8%", color: "bg-error", highlight: "text-error" },
                 { type: "Warning Flags", count: 67, trend: "+12%", color: "bg-amber-500", highlight: "text-amber-600" },
                 { type: "Log Events", count: 142, trend: "-3%", color: "bg-indigo-500", highlight: "text-indigo-600" },
               ].map((stat, idx) => (
                 <div key={idx} className="space-y-2 group">
                   <div className="flex justify-between text-xs font-semibold">
                     <span className="text-slate-700 dark:text-slate-300 group-hover:text-foreground transition-colors">{stat.type}</span>
                     <div className="flex items-center gap-2">
                       <span className={`text-muted-foreground ${stat.highlight}`}>{stat.count}</span>
                       <span className="text-[10px] text-emerald-600 dark:text-emerald-400">{stat.trend}</span>
                     </div>
                   </div>
                   <div className="h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                     <div
                       className={`h-full rounded-full transition-all duration-500 ${stat.color}`}
                       style={{ width: `${Math.min(stat.count / 2, 100)}%` }}
                     />
                   </div>
                 </div>
               ))}
             </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
