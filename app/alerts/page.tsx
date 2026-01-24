'use client';

import React from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { AlertsContent } from '@/components/alerts/alerts-content';

export default function AlertsPage() {
  return (
    <MainLayout currentPage="alerts">
      <AlertsContent />
    </MainLayout>
  );
}
