'use client';

import React from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { AppointmentsContent } from '@/components/appointments/appointments-content';

export default function AppointmentsPage() {
  return (
    <MainLayout currentPage="appointments">
      <AppointmentsContent />
    </MainLayout>
  );
}
