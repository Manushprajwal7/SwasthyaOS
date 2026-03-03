"use client";

import React, { useState } from "react";
import { Search, CreditCard, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { PatientList } from "./patient-list";
import { PatientTimeline } from "./patient-timeline";
import { AWSBadge } from "@/components/ui/aws-badge";
import { FHIRBadge } from "@/components/ui/fhir-badge";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);

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
    <div className="space-y-6 p-8">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground">
            Patient Registry
          </h1>
          <p className="mt-2 text-muted-foreground">
            ABDM-integrated patient records with clinical timeline and decision
            audit trail
          </p>
        </div>
        <div className="flex gap-2">
          <AWSBadge service="HealthLake" model="FHIR R4" status="active" />
        </div>
      </div>

      {/* Search Bar */}
      <Card className="p-4">
        <div className="flex items-center gap-2">
          <Search className="h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name, UHID, or ABHA ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-foreground placeholder-muted-foreground focus:outline-none"
          />
        </div>
      </Card>

      {/* Selected Patient Header Card */}
      {selectedPatientData && (
        <Card className="p-4 bg-teal-50 dark:bg-teal-950/30 border-teal-200 dark:border-teal-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-teal-600 flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-foreground">
                    {selectedPatientData.name}
                  </h2>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      selectedPatientData.status === "critical"
                        ? "bg-red-100 text-red-700"
                        : selectedPatientData.status === "active"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {selectedPatientData.status.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                  <span>
                    {selectedPatientData.age}y ·{" "}
                    {selectedPatientData.gender === "M" ? "Male" : "Female"}
                  </span>
                  <span>·</span>
                  <span>{selectedPatientData.bloodGroup}</span>
                  <span>·</span>
                  <span>{selectedPatientData.district}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-2">
                <FHIRBadge resourceType="Patient" validated />
              </div>
              <div className="flex items-center gap-4 text-xs">
                <div>
                  <span className="text-muted-foreground">UHID:</span>
                  <span className="font-mono ml-1 text-teal-700 dark:text-teal-400">
                    {selectedPatientData.uhid}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">ABHA:</span>
                  <span className="font-mono ml-1 text-teal-700 dark:text-teal-400">
                    {selectedPatientData.abhaId}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Patient List */}
        <div className="lg:col-span-1">
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
            onSelectPatient={setSelectedPatient}
          />
        </div>

        {/* Patient Timeline */}
        <div className="lg:col-span-2">
          {selectedPatient ? (
            <PatientTimeline patientId={selectedPatient} />
          ) : (
            <Card className="p-12 text-center">
              <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Select a patient to view their clinical timeline
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Search by name, UHID (e.g., UHID-MH-2024-001234), or ABHA ID
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
