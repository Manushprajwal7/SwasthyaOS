'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface AppointmentCalendarProps {
  onDateSelect: (date: Date) => void;
}

export function AppointmentCalendar({ onDateSelect }: AppointmentCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);

  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
  }

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const getAppointmentCount = (date: Date): number => {
    return Math.floor(Math.random() * 5);
  };

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {/* Calendar */}
      <Card className="md:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{monthName}</CardTitle>
              <CardDescription>Click a date to view appointments</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={prevMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline" onClick={nextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Day headers */}
            <div className="grid grid-cols-7 gap-2 text-center text-sm font-semibold">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-muted-foreground">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-2">
              {days.map((date, idx) => {
                if (!date) {
                  return <div key={`empty-${idx}`} />;
                }

                const count = getAppointmentCount(date);
                const isSelected =
                  selectedDate &&
                  date.toDateString() === selectedDate.toDateString();
                const isToday = date.toDateString() === new Date().toDateString();

                return (
                  <button
                    key={date.toISOString()}
                    onClick={() => {
                      setSelectedDate(date);
                      onDateSelect(date);
                    }}
                    className={`relative p-2 rounded-lg border-2 text-sm font-medium transition-colors ${
                      isSelected
                        ? 'border-primary bg-primary/5'
                        : isToday
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div>{date.getDate()}</div>
                    {count > 0 && (
                      <div className="absolute bottom-1 left-1 right-1 h-1 rounded-full bg-primary/30">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${(count / 4) * 100}%` }}
                        />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Date Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            {selectedDate
              ? selectedDate.toLocaleDateString('default', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                })
              : 'Select a Date'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {selectedDate ? (
            <>
              <div className="space-y-2">
                <p className="text-sm font-medium">Appointments</p>
                {[
                  { time: '9:00 AM', patient: 'John Doe', duration: '30 min' },
                  { time: '9:45 AM', patient: 'Jane Smith', duration: '45 min' },
                  { time: '10:45 AM', patient: 'Robert Johnson', duration: '30 min' },
                  { time: '11:30 AM', patient: 'Free Slot', duration: '60 min' },
                ].map((apt, i) => (
                  <div key={i} className="flex items-center justify-between text-xs p-2 rounded border">
                    <span className="font-medium">{apt.time}</span>
                    <span className="text-muted-foreground">{apt.patient}</span>
                  </div>
                ))}
              </div>
              <Button className="w-full bg-primary hover:bg-primary-light">
                New Appointment
              </Button>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">Select a date from the calendar</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
