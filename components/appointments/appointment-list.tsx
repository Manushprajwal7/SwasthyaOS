'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Filter, MoreVertical, Phone, MessageSquare, X, Edit } from 'lucide-react';

export function AppointmentList() {
  const [filter, setFilter] = useState('all');

  const appointments = [
    {
      id: 1,
      patientName: 'John Doe',
      patientId: 'P12345',
      time: 'Today, 2:00 PM',
      clinician: 'Dr. Rajesh Kumar',
      type: 'Follow-up',
      status: 'confirmed',
      location: 'Room 105',
    },
    {
      id: 2,
      patientName: 'Jane Smith',
      patientId: 'P12346',
      time: 'Today, 2:30 PM',
      clinician: 'Dr. Priya Sharma',
      type: 'Consultation',
      status: 'confirmed',
      location: 'ER',
    },
    {
      id: 3,
      patientName: 'Robert Johnson',
      patientId: 'P12347',
      time: 'Today, 3:15 PM',
      clinician: 'Dr. Rajesh Kumar',
      type: 'Check-up',
      status: 'pending',
      location: 'Room 205',
    },
    {
      id: 4,
      patientName: 'Sarah Davis',
      patientId: 'P12348',
      time: 'Tomorrow, 10:00 AM',
      clinician: 'Dr. Asha Patel',
      type: 'Pediatric',
      status: 'confirmed',
      location: 'Pediatric Ward',
    },
    {
      id: 5,
      patientName: 'Michael Brown',
      patientId: 'P12349',
      time: 'Tomorrow, 11:00 AM',
      clinician: 'Dr. Rajesh Kumar',
      type: 'Dental',
      status: 'cancelled',
      location: 'Dental Clinic',
    },
  ];

  const statusColors = {
    confirmed: 'bg-success/10 text-success',
    pending: 'bg-warning/10 text-warning',
    cancelled: 'bg-error/10 text-error',
  };

  const filteredAppointments = appointments.filter((apt) => {
    if (filter === 'all') return true;
    return apt.status === filter;
  });

  return (
    <div className="space-y-4">
      {/* Filter Bar */}
      <div className="flex gap-2 flex-wrap">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('all')}
          className={filter === 'all' ? 'bg-primary hover:bg-primary-light' : ''}
        >
          All
        </Button>
        <Button
          variant={filter === 'confirmed' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('confirmed')}
          className={filter === 'confirmed' ? 'bg-success hover:bg-success-dark' : ''}
        >
          Confirmed
        </Button>
        <Button
          variant={filter === 'pending' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('pending')}
          className={filter === 'pending' ? 'bg-warning' : ''}
        >
          Pending
        </Button>
        <Button
          variant={filter === 'cancelled' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('cancelled')}
          className={filter === 'cancelled' ? 'bg-error hover:bg-error-dark' : ''}
        >
          Cancelled
        </Button>
      </div>

      {/* Appointments List */}
      <div className="space-y-3">
        {filteredAppointments.map((apt) => (
          <Card key={apt.id} className="hover:border-primary transition-colors">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{apt.patientName}</h3>
                    <span className="text-xs text-muted-foreground">ID: {apt.patientId}</span>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[apt.status as keyof typeof statusColors]}`}>
                      {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                    </span>
                  </div>

                  <div className="grid gap-2 md:grid-cols-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Time</p>
                      <p className="font-medium">{apt.time}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Clinician</p>
                      <p className="font-medium">{apt.clinician}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Type</p>
                      <p className="font-medium">{apt.type}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Location</p>
                      <p className="font-medium">{apt.location}</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" title="Call patient">
                    <Phone className="h-4 w-4 text-primary" />
                  </Button>
                  <Button size="sm" variant="ghost" title="Send message">
                    <MessageSquare className="h-4 w-4 text-primary" />
                  </Button>
                  {apt.status !== 'cancelled' && (
                    <Button size="sm" variant="ghost" title="Edit">
                      <Edit className="h-4 w-4 text-primary" />
                    </Button>
                  )}
                  <Button size="sm" variant="ghost" title="More options">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
