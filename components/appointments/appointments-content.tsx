"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Clock, User, Plus, Search, Activity } from "lucide-react";
import { AppointmentCalendar } from "./appointment-calendar";
import { AppointmentList } from "./appointment-list";
import { NewAppointmentModal } from "./new-appointment-modal";
import { LivePulse } from "@/components/ui/live-pulse";
import { AWSBadge } from "@/components/ui/aws-badge";
import { FHIRBadge } from "@/components/ui/fhir-badge";
import { useToast } from "@/hooks/use-toast";

export function AppointmentsContent() {
  const { toast } = useToast();
  const [showNewAppointment, setShowNewAppointment] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

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

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-full">
      {/* ===== Welcome Banner ===== */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fade-in-up">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground font-heading">
            Appointments & Scheduling
          </h1>
          <p className="mt-1 text-sm text-muted-foreground flex items-center gap-2">
            <CalendarIcon className="h-3.5 w-3.5" />
            {dateStr}
            <span className="text-slate-300 dark:text-slate-600">|</span>
            <Clock className="h-3.5 w-3.5" />
            {timeStr}
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-teal-50 dark:bg-teal-950/30 px-3 py-1.5 rounded-full border border-teal-200 dark:border-teal-800">
            <LivePulse active color="green" size="sm" />
            <span>Schedule Sync Active</span>
          </div>
          <AWSBadge service="Pinpoint" status="active" />
        </div>
      </div>

      {/* ===== Layout Wrapper: 12-Column Grid ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-6">
        
        {/* ========================================================
            TOP ROW (Col Span 12): System Metrics
            ======================================================== */}
        <div className="lg:col-span-12 grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in-up" style={{ animationDelay: "0.05s" }}>
          <Card className="bg-slate-50 dark:bg-slate-900 border-border shadow-sm">
            <CardHeader className="pb-2 p-4">
              <CardTitle className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-2">
                Today's Volume
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-2xl font-bold font-heading text-slate-800 dark:text-slate-100">12</div>
              <p className="text-[11px] font-medium text-emerald-600 dark:text-emerald-500 mt-1 flex items-center gap-1">
                <span>5 Confirmed</span>
                <span className="text-slate-300 mx-1">•</span>
                <span className="text-amber-600 dark:text-amber-500">7 Pending</span>
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-50 dark:bg-slate-900 border-border shadow-sm">
            <CardHeader className="pb-2 p-4">
              <CardTitle className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-2">
                Weekly Outlook
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-2xl font-bold font-heading text-slate-800 dark:text-slate-100">48</div>
              <p className="text-[11px] font-medium text-muted-foreground mt-1">Across all active clinicians</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-50 dark:bg-slate-900 border-border shadow-sm">
            <CardHeader className="pb-2 p-4">
              <CardTitle className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-2">
                Avg Wait Time
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-2xl font-bold font-heading text-slate-800 dark:text-slate-100">8m</div>
              <p className="text-[11px] font-medium text-emerald-600 dark:text-emerald-500 mt-1">
                ↓ 15% improvement vs last week
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-50 dark:bg-slate-900 border-border shadow-sm">
            <CardHeader className="pb-2 p-4">
              <CardTitle className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-2">
                Drop-off Rate
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-2xl font-bold font-heading text-slate-800 dark:text-slate-100">2.3%</div>
              <p className="text-[11px] font-medium text-emerald-600 dark:text-emerald-500 mt-1">
                Cancellation rate below target
              </p>
            </CardContent>
          </Card>
        </div>

        {/* ========================================================
            LEFT PILLAR (Col Span 8): Schedule Views
            ======================================================== */}
        <div className="lg:col-span-8 flex flex-col h-[calc(100vh-20rem)] animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <Tabs defaultValue="calendar" className="flex flex-col h-full space-y-4" onValueChange={(v) => {
            toast({
              title: "View Switched",
              description: `Now viewing schedule as ${v}.`,
            });
          }}>
            <div className="flex items-center justify-between pr-2">
              <TabsList className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <TabsTrigger value="calendar" className="gap-2 text-xs font-semibold data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  <CalendarIcon className="h-3.5 w-3.5" />
                  Calendar Base
                </TabsTrigger>
                <TabsTrigger value="list" className="gap-2 text-xs font-semibold data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  <Clock className="h-3.5 w-3.5" />
                  Agenda List
                </TabsTrigger>
              </TabsList>
            </div>

            <Card className="flex-1 overflow-hidden shadow-sm border border-border bg-white dark:bg-slate-900 relative">
               <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-teal-400 to-indigo-400 opacity-90 z-10" />
               <div className="h-full overflow-y-auto custom-scrollbar p-6">
                <TabsContent value="calendar" className="mt-0 h-full">
                  <AppointmentCalendar onDateSelect={(d) => {
                    setSelectedDate(d);
                    toast({
                      title: "Date Selected",
                      description: `Agenda focus set to ${d.toLocaleDateString()}.`,
                    });
                  }} />
                </TabsContent>

                <TabsContent value="list" className="mt-0 h-full">
                  <AppointmentList />
                </TabsContent>
               </div>
            </Card>
          </Tabs>
        </div>

        {/* ========================================================
            RIGHT PILLAR (Col Span 4): Clinicians & Actions
            ======================================================== */}
        <div className="lg:col-span-4 space-y-6 flex flex-col h-[calc(100vh-20rem)] overflow-y-auto custom-scrollbar pl-1 animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
          
          {/* Action Header */}
          <Button
            onClick={() => {
              setShowNewAppointment(true);
              toast({
                title: "Opening Scheduler",
                description: "Initializing new FHIR Appointment resource...",
              });
            }}
            className="w-full gap-2 bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm h-12 text-sm font-bold tracking-wide"
          >
            <Plus className="h-4 w-4" />
            BOOK NEW APPOINTMENT
          </Button>

          {/* Clinicians Roster Card */}
          <Card className="flex flex-col shadow-sm border border-border bg-white dark:bg-slate-900 relative">
             <div className="p-4 border-b border-border flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
               <div className="flex items-center gap-2">
                 <User className="h-4 w-4 text-indigo-600" />
                 <h4 className="font-semibold text-foreground text-sm tracking-tight">
                   Clinician Roster
                 </h4>
               </div>
               <FHIRBadge resourceType="PractitionerRole" />
             </div>

             <div className="p-4 space-y-4">
                <ClinicianSchedules />
             </div>
          </Card>
        </div>
      </div>

      {/* New Appointment Modal */}
      {showNewAppointment && (
        <NewAppointmentModal
          onClose={() => setShowNewAppointment(false)}
          selectedDate={selectedDate}
        />
      )}
    </div>
  );
}

function ClinicianSchedules() {
  const clinicians = [
    {
      name: 'Dr. Rajesh Kumar',
      specialty: 'General Practitioner',
      availability: '9:00 AM - 5:00 PM',
      today: { booked: 8, available: 4, offHours: 0 },
      color: "bg-teal-500"
    },
    {
      name: 'Dr. Priya Sharma',
      specialty: 'Emergency Medicine',
      availability: '24/7 (On-call)',
      today: { booked: 12, available: 0, offHours: 12 },
      color: "bg-red-500"
    },
    {
      name: 'Dr. Asha Patel',
      specialty: 'Pediatrics',
      availability: '10:00 AM - 3:00 PM',
      today: { booked: 6, available: 3, offHours: 15 },
      color: "bg-indigo-500"
    },
  ];

  return (
    <div className="space-y-4">
      {clinicians.map((clinician, idx) => (
        <div key={idx} className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 hover:border-indigo-200 transition-colors group">
          <div className="flex items-start justify-between">
            <div className="flex gap-3 items-center">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${clinician.color} shadow-sm`}>
                {clinician.name.split(' ').map(n=>n[0]).join('').replace('D','')}
              </div>
              <div>
                <h4 className="font-bold text-sm text-foreground tracking-tight group-hover:text-indigo-600 transition-colors">{clinician.name}</h4>
                <p className="text-[11px] font-medium text-muted-foreground">{clinician.specialty}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground font-medium flex items-center gap-1.5"><Clock className="h-3 w-3"/> Shift Hours</span>
              <span className="font-semibold text-slate-700 dark:text-slate-300">{clinician.availability}</span>
            </div>
            
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider">
                <span className="text-slate-500">Utilization</span>
                <span className="text-indigo-600 dark:text-indigo-400">{clinician.today.booked} Slots</span>
              </div>
              <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden flex">
                <div
                  className="h-full bg-indigo-500"
                  style={{ width: `${(clinician.today.booked / (clinician.today.booked + clinician.today.available + 0.1)) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
