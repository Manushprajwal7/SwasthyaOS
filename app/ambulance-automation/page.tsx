"use client";

import React, { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/language-context";
import { Ambulance, Clock, MapPin, Activity, Calendar, BarChart3, ShieldCheck } from "lucide-react";
import { OverviewTab } from "@/components/ambulance/overview-tab";

import { ForecastTab } from "@/components/ambulance/forecast-tab";
import { FleetTab } from "@/components/ambulance/fleet-tab";
import { ReportTab } from "@/components/ambulance/report-tab";

export default function AmbulanceAutomationPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("overview");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const now = new Date();
  const dateStr = 
    now.toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const timeStr = now.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <MainLayout currentPage="ambulance_automation">
      <div className="p-6 lg:p-8 space-y-6 max-w-full">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fade-in-up">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg text-red-600">
                <Ambulance className="h-6 w-6" />
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground font-heading">
                {t("ambulance.title")}
              </h1>
            </div>
            <p className="text-sm text-muted-foreground flex items-center gap-2 h-5">
              {mounted && (
                <>
                  <Calendar className="h-3.5 w-3.5" />
                  {dateStr}
                  <span className="text-slate-300 dark:text-slate-600">|</span>
                  <Clock className="h-3.5 w-3.5" />
                  {timeStr}
                  <span className="text-slate-300 dark:text-slate-600">|</span>
                </>
              )}
              <span className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5" />
                Live Ops Console
              </span>
            </p>
          </div>

          <div className="flex items-center gap-3">
             <div className="flex items-center gap-2 text-xs font-semibold bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>COMMAND CENTER ACTIVE</span>
             </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <Tabs defaultValue="overview" onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700 h-auto flex flex-wrap gap-1">
            <TabsTrigger 
              value="overview" 
              className="px-4 py-2 data-[state=active]:bg-white data-[state=active]:text-teal-600 data-[state=active]:shadow-sm rounded-md transition-all flex items-center gap-2"
            >
              <Activity className="h-4 w-4" />
              {t("ambulance.tabs.overview")}
            </TabsTrigger>
            <TabsTrigger 
              value="forecast" 
              className="px-4 py-2 data-[state=active]:bg-white data-[state=active]:text-teal-600 data-[state=active]:shadow-sm rounded-md transition-all flex items-center gap-2"
            >
              <BarChart3 className="h-4 w-4" />
              {t("ambulance.tabs.forecast")}
            </TabsTrigger>
            <TabsTrigger 
              value="fleet" 
              className="px-4 py-2 data-[state=active]:bg-white data-[state=active]:text-teal-600 data-[state=active]:shadow-sm rounded-md transition-all flex items-center gap-2"
            >
              <Ambulance className="h-4 w-4" />
              {t("ambulance.tabs.fleet")}
            </TabsTrigger>
            <TabsTrigger 
              value="report" 
              className="px-4 py-2 data-[state=active]:bg-white data-[state=active]:text-teal-600 data-[state=active]:shadow-sm rounded-md transition-all flex items-center gap-2"
            >
              <BarChart3 className="h-4 w-4" />
              {t("ambulance.tabs.report")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-0 ring-offset-background focus-visible:outline-none">
            <OverviewTab />
          </TabsContent>
           <TabsContent value="report" className="mt-0 ring-offset-background focus-visible:outline-none">
            <ReportTab />
          </TabsContent>
          <TabsContent value="forecast" className="mt-0 ring-offset-background focus-visible:outline-none">
            <ForecastTab />
          </TabsContent>
          <TabsContent value="fleet" className="mt-0 ring-offset-background focus-visible:outline-none">
            <FleetTab />
          </TabsContent>
         
        </Tabs>
      </div>
    </MainLayout>
  );
}
