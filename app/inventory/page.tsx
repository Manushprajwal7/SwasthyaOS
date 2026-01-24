'use client';

import React from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { InventoryContent } from '@/components/inventory/inventory-content';

export default function InventoryPage() {
  return (
    <MainLayout currentPage="inventory">
      <InventoryContent />
    </MainLayout>
  );
}
