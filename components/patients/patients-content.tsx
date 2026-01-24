'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { PatientList } from './patient-list';
import { PatientTimeline } from './patient-timeline';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  lastVisit: string;
  status: 'active' | 'inactive' | 'critical';
}

export function PatientsContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);

  const patients: Patient[] = [
    {
      id: 'P-2401',
      name: 'Meera Singh',
      age: 34,
      gender: 'F',
      lastVisit: '2024-01-24',
      status: 'active',
    },
    {
      id: 'P-2402',
      name: 'Ajay Kumar',
      age: 28,
      gender: 'M',
      lastVisit: '2024-01-24',
      status: 'critical',
    },
    {
      id: 'P-2403',
      name: 'Priya Sharma',
      age: 45,
      gender: 'F',
      lastVisit: '2024-01-23',
      status: 'active',
    },
    {
      id: 'P-2404',
      name: 'Rajesh Patel',
      age: 52,
      gender: 'M',
      lastVisit: '2024-01-22',
      status: 'inactive',
    },
  ];

  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.includes(searchQuery)
  );

  return (
    <div className="space-y-6 p-8">
      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground">Patients</h1>
        <p className="mt-2 text-muted-foreground">
          Patient registry with clinical timeline and decision audit trail
        </p>
      </div>

      {/* Search Bar */}
      <Card className="p-4">
        <div className="flex items-center gap-2">
          <Search className="h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name or patient ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-foreground placeholder-muted-foreground focus:outline-none"
          />
        </div>
      </Card>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Patient List */}
        <div className="lg:col-span-1">
          <PatientList
            patients={filteredPatients}
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
              <p className="text-muted-foreground">
                Select a patient to view their clinical timeline
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
