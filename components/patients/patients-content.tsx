"use client";

import React, { useState, useEffect } from "react";
import { Search, CreditCard, User, Calendar, Clock, HeartPulse, Activity } from "lucide-react";
import { Card } from "@/components/ui/card";
import { PatientList } from "./patient-list";
import { PatientTimeline } from "./patient-timeline";
import { AWSBadge } from "@/components/ui/aws-badge";
import { FHIRBadge } from "@/components/ui/fhir-badge";
import { LivePulse } from "@/components/ui/live-pulse";
import { useToast } from "@/hooks/use-toast";

interface Patient {
  id: string;
  uhid: string;
  abhaId: string;
  name: string;
  age: number;
  gender: string;
  lastVisit: string;
  status: "active" | "inactive" | "critical";
  bloodGroup?: string;
  phone?: string;
  district?: string;
}

export function PatientsContent() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<string | null>("P-2401");

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

  // Patients with correct UHID and ABHA ID formats per spec
  const patients: Patient[] = [
    {
      id: "P-2401",
      uhid: "UHID-MH-2024-001234",
      abhaId: "9123-4567-8901-2345",
      name: "Meera Singh",
      age: 34,
      gender: "F",
      lastVisit: "2024-01-24",
      status: "active",
      bloodGroup: "B+",
      phone: "+91 98765 43210",
      district: "Pune",
    },
    {
      id: "P-2402",
      uhid: "UHID-MH-2024-001235",
      abhaId: "8234-5678-9012-3456",
      name: "Ajay Kumar",
      age: 28,
      gender: "M",
      lastVisit: "2024-01-24",
      status: "critical",
      bloodGroup: "O+",
      phone: "+91 87654 32109",
      district: "Mumbai",
    },
    {
      id: "P-2403",
      uhid: "UHID-DL-2024-002145",
      abhaId: "7345-6789-0123-4567",
      name: "Priya Sharma",
      age: 45,
      gender: "F",
      lastVisit: "2024-01-23",
      status: "active",
      bloodGroup: "A+",
      phone: "+91 76543 21098",
      district: "Delhi",
    },
    {
      id: "P-2404",
      uhid: "UHID-KA-2024-003456",
      abhaId: "6456-7890-1234-5678",
      name: "Rajesh Patel",
      age: 52,
      gender: "M",
      lastVisit: "2024-01-22",
      status: "inactive",
      bloodGroup: "AB+",
      phone: "+91 65432 10987",
      district: "Bengaluru",
    },
    {
      id: "P-2405",
      uhid: "UHID-TN-2024-004567",
      abhaId: "5567-8901-2345-6789",
      name: "Lakshmi Naidu",
      age: 62,
      gender: "F",
      lastVisit: "2024-01-21",
      status: "active",
      bloodGroup: "O-",
      phone: "+91 54321 09876",
      district: "Chennai",
    },
    {
      id: "P-2406",
      uhid: "UHID-RJ-2024-005678",
      abhaId: "4678-9012-3456-7890",
      name: "Suresh Meena",
      age: 41,
      gender: "M",
      lastVisit: "2024-01-20",
      status: "active",
      bloodGroup: "B-",
      phone: "+91 43210 98765",
      district: "Jaipur",
    },
  ];

  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.uhid.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.abhaId.includes(searchQuery)
  );

  const selectedPatientData = patients.find((p) => p.id === selectedPatient);

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-full">
      {/* ===== Welcome Banner ===== */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fade-in-up">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground font-heading">
            Patient Registry
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
          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-indigo-50 dark:bg-indigo-950/30 px-3 py-1.5 rounded-full border border-indigo-200 dark:border-indigo-800">
            <LivePulse active color="indigo" size="sm" />
            <span>ABDM Integrated</span>
          </div>
          <AWSBadge service="HealthLake" model="FHIR R4" status="active" />
        </div>
      </div>

      {/* ===== Layout Wrapper: 12-Column Grid ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-6">
        
        {/* ========================================================
            LEFT PILLAR (Col Span 4): Roster & Search
            ======================================================== */}
        <div className="lg:col-span-4 space-y-4 flex flex-col h-[calc(100vh-12rem)] overflow-y-auto custom-scrollbar pr-1">
          {/* Search Bar */}
          <Card className="p-3 shadow-sm border border-border bg-white dark:bg-slate-900 sticky top-0 z-20">
            <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg p-2 border border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
              <Search className="h-4 w-4 text-muted-foreground ml-1" />
              <input
                type="text"
                placeholder="Search name, UHID, or ABHA..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-sm text-foreground placeholder-muted-foreground focus:outline-none"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="text-xs text-muted-foreground hover:text-foreground mr-1"
                >
                  Clear
                </button>
              )}
            </div>
            {searchQuery && (
              <p className="text-[10px] text-muted-foreground mt-2 px-1">
                Showing {filteredPatients.length} results
              </p>
            )}
          </Card>

          {/* Patient List Container */}
          <div className="flex-1">
            <PatientList
              patients={filteredPatients.map((p) => ({
                id: p.id,
                name: p.name,
                age: p.age,
                gender: p.gender,
                lastVisit: p.lastVisit,
                status: p.status,
              }))}
              selectedPatientId={selectedPatient}
              onSelectPatient={(id) => {
                setSelectedPatient(id);
                const pName = patients.find(p => p.id === id)?.name;
                toast({
                  title: "Patient Selected",
                  description: `Loaded clinical timeline for ${pName}.`,
                });
              }}
            />
          </div>
        </div>

        {/* ========================================================
            CENTER/RIGHT PILLAR (Col Span 8): Clinical Workspace
            ======================================================== */}
        <div className="lg:col-span-8 flex flex-col h-[calc(100vh-12rem)] overflow-y-auto custom-scrollbar px-1">
          {selectedPatientData ? (
            <div className="space-y-6 flex flex-col min-h-full">
              {/* Premium Patient Header Card */}
              <Card className="overflow-hidden shadow-sm border border-border bg-white dark:bg-slate-900 relative flex-shrink-0">
                <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-teal-400 via-emerald-400 to-indigo-400" />
                
                <div className="p-5 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <div className="relative">
                        <div className={`h-16 w-16 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-sm ${
                          selectedPatientData.status === "critical" ? "bg-red-600" :
                          selectedPatientData.gender === "M" ? "bg-indigo-600" : "bg-teal-600"
                        }`}>
                          {selectedPatientData.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        {selectedPatientData.status === "critical" && (
                          <div className="absolute -bottom-1 -right-1 bg-white dark:bg-slate-900 rounded-full p-0.5 shadow-sm">
                            <HeartPulse className="h-5 w-5 text-red-500 animate-pulse" />
                          </div>
                        )}
                      </div>

                      {/* Demographics */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h2 className="text-xl font-bold text-foreground tracking-tight">
                            {selectedPatientData.name}
                          </h2>
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                              selectedPatientData.status === "critical"
                                ? "bg-red-100 text-red-700 border border-red-200"
                                : selectedPatientData.status === "active"
                                ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                                : "bg-slate-100 text-slate-700 border border-slate-200"
                            }`}
                          >
                            {selectedPatientData.status}
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-600 dark:text-slate-400">
                          <span className="font-medium">{selectedPatientData.age}y {selectedPatientData.gender}</span>
                          <span className="text-slate-300">•</span>
                          <span className="flex items-center gap-1"><Activity className="h-3 w-3" /> {selectedPatientData.bloodGroup}</span>
                          <span className="text-slate-300">•</span>
                          <span className="truncate max-w-[120px]">{selectedPatientData.district}</span>
                        </div>
                      </div>
                    </div>

                    {/* Meta/IDs */}
                    <div className="flex flex-col items-end gap-3 w-full sm:w-auto mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-0 border-border">
                      <FHIRBadge resourceType="Patient" validated />
                      <div className="flex flex-row sm:flex-col gap-4 sm:gap-1 text-xs w-full sm:w-auto">
                        <div className="flex justify-between sm:justify-end gap-2 bg-slate-50 dark:bg-slate-800/50 px-2 py-1 rounded border border-slate-100 dark:border-slate-800">
                          <span className="text-muted-foreground uppercase text-[10px] tracking-wider font-semibold">UHID</span>
                          <span className="font-mono font-medium text-slate-700 dark:text-slate-300">
                            {selectedPatientData.uhid}
                          </span>
                        </div>
                        <div className="flex justify-between sm:justify-end gap-2 bg-slate-50 dark:bg-slate-800/50 px-2 py-1 rounded border border-slate-100 dark:border-slate-800">
                          <span className="text-muted-foreground uppercase text-[10px] tracking-wider font-semibold">ABHA</span>
                          <span className="font-mono font-medium text-slate-700 dark:text-slate-300">
                            {selectedPatientData.abhaId}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Patient Timeline */}
              <div className="flex-1 pb-4">
                <PatientTimeline patientId={selectedPatient} />
              </div>
            </div>
          ) : (
            <Card className="h-full flex flex-col items-center justify-center p-12 text-center bg-slate-50/50 dark:bg-slate-900/50 border-dashed border-2 shadow-sm">
              <div className="h-20 w-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6 shadow-inner">
                <User className="h-10 w-10 text-slate-400 dark:text-slate-500" />
              </div>
              <h3 className="text-xl font-semibold text-foreground tracking-tight mb-2">
                No Patient Selected
              </h3>
              <p className="text-muted-foreground max-w-sm">
                Select a patient from the roster on the left to view their complete clinical timeline and unified health records.
              </p>
              <div className="mt-8 flex gap-4 opacity-60">
                <AWSBadge service="HealthLake" />
                <FHIRBadge resourceType="Observation" validated />
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
