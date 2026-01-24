'use client';

import React from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { ReferralsContent } from '@/components/referrals/referrals-content';

export default function ReferralsPage() {
  return (
    <MainLayout currentPage="referrals">
      <ReferralsContent />
    </MainLayout>
  );
}
