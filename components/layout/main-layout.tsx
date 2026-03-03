'use client';

import React, { useState } from 'react';
import { Sidebar } from './sidebar';
import { TopBar } from './top-bar';
import { RightPanel } from './right-panel';

export type UserRole = 'doctor' | 'frontline' | 'admin';

interface MainLayoutProps {
  children: React.ReactNode;
  currentPage?: string;
}

export function MainLayout({ children, currentPage = 'dashboard' }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userRole, setUserRole] = useState<UserRole>('doctor');
  const [showRightPanel, setShowRightPanel] = useState(false);
  const [rightPanelContent, setRightPanelContent] = useState<{
    title: string;
    content: string;
    confidence?: number;
  }>({
    title: 'AI Explanation',
    content: '',
  });

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Sidebar Navigation */}
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        userRole={userRole}
        currentPage={currentPage}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        {/* Top Context Bar */}
        <TopBar
          userRole={userRole}
          onRoleChange={setUserRole}
          onShowRightPanel={(show) => setShowRightPanel(show)}
        />

        {/* Content Canvas */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
          <div className="h-full w-full max-w-full">
            {children}
          </div>
        </main>
      </div>

      {/* Right Contextual Panel */}
      {showRightPanel && (
        <RightPanel
          title={rightPanelContent.title}
          content={rightPanelContent.content}
          confidence={rightPanelContent.confidence}
          onClose={() => setShowRightPanel(false)}
        />
      )}
    </div>
  );
}
