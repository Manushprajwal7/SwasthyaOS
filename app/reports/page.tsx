'use client';

import React from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { ReportsContent } from '@/components/reports/reports-content';

export default function ReportsPage() {
  return (
    <MainLayout currentPage="reports">
      <ReportsContent />
    </MainLayout>
  );
}
