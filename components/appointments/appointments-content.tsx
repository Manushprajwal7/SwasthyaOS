'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User, MapPin, Plus, Filter, X } from 'lucide-react';
import { AppointmentCalendar } from './appointment-calendar';
import { AppointmentList } from './appointment-list';
import { NewAppointmentModal } from './new-appointment-modal';

export function AppointmentsContent() {
  const [showNewAppointment, setShowNewAppointment] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Appointments & Scheduling</h1>
          <p className="text-muted-foreground">Manage patient appointments and clinician schedules</p>
        </div>
        <Button
          onClick={() => setShowNewAppointment(true)}
          className="gap-2 bg-primary hover:bg-primary-light md:w-auto w-full"
        >
          <Plus className="h-4 w-4" />
          New Appointment
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Today Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-success">5 confirmed • 7 pending</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
            <p className="text-xs text-muted-foreground">Across all clinicians</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Avg Wait Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8m</div>
            <p className="text-xs text-success">↓ 15% improvement</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Cancellation Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.3%</div>
            <p className="text-xs text-success">Below target</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="calendar" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="calendar" className="gap-2">
            <Calendar className="h-4 w-4" />
            Calendar
          </TabsTrigger>
          <TabsTrigger value="list" className="gap-2">
            <Clock className="h-4 w-4" />
            List View
          </TabsTrigger>
          <TabsTrigger value="clinicians" className="gap-2">
            <User className="h-4 w-4" />
            Clinicians
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-4">
          <AppointmentCalendar onDateSelect={setSelectedDate} />
        </TabsContent>

        <TabsContent value="list" className="space-y-4">
          <AppointmentList />
        </TabsContent>

        <TabsContent value="clinicians" className="space-y-4">
          <ClinicianSchedules />
        </TabsContent>
      </Tabs>

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
      availability: '9 AM - 5 PM',
      today: { booked: 8, available: 4, offHours: 0 },
    },
    {
      name: 'Dr. Priya Sharma',
      specialty: 'Emergency Medicine',
      availability: '24/7 (On-call)',
      today: { booked: 12, available: 0, offHours: 12 },
    },
    {
      name: 'Dr. Asha Patel',
      specialty: 'Pediatrics',
      availability: '10 AM - 3 PM',
      today: { booked: 6, available: 3, offHours: 15 },
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {clinicians.map((clinician, idx) => (
        <Card key={idx}>
          <CardHeader>
            <CardTitle className="text-base">{clinician.name}</CardTitle>
            <CardDescription>{clinician.specialty}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm">
              <p className="text-muted-foreground mb-1">Availability</p>
              <p className="font-medium">{clinician.availability}</p>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Today's Schedule</p>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Booked</span>
                  <span className="font-semibold text-primary">{clinician.today.booked}</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100">
                  <div
                    className="h-2 rounded-full bg-primary"
                    style={{ width: `${(clinician.today.booked / 12) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            <Button size="sm" className="w-full bg-primary hover:bg-primary-light">
              Schedule
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
