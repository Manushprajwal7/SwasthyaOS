'use client';

import React from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { SettingsContent } from '@/components/settings/settings-content';

export default function SettingsPage() {
  return (
    <MainLayout currentPage="settings">
      <SettingsContent />
    </MainLayout>
  );
}
