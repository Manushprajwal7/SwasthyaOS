'use client';

import React from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { ChatContent } from '@/components/chat/chat-content';

export default function ChatPage() {
  return (
    <MainLayout currentPage="chat">
      <ChatContent />
    </MainLayout>
  );
}
