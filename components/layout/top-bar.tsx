'use client';

import React, { useState } from 'react';
import {
  Bell,
  Globe,
  User,
  LogOut,
  Lightbulb,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { UserRole } from './main-layout';

interface TopBarProps {
  userRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  onShowRightPanel: (show: boolean) => void;
}

const roleLabels: Record<UserRole, string> = {
  doctor: 'Dr. Rajesh Kumar',
  frontline: 'ASHA Worker - Priya',
  admin: 'Public Health Officer',
};

const languageOptions = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
];

export function TopBar({ userRole, onRoleChange, onShowRightPanel }: TopBarProps) {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);

  const roles: UserRole[] = ['doctor', 'frontline', 'admin'];

  return (
    <div className="flex items-center justify-between border-b border-border bg-card px-6 py-4">
      {/* Left Section: Status & Notifications */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-success" />
          <span className="text-sm text-muted-foreground">System Active</span>
        </div>

        {/* Notifications */}
        <button
          onClick={() => setNotificationCount(0)}
          className="relative rounded-lg p-2 hover:bg-muted"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5 text-muted-foreground" />
          {notificationCount > 0 && (
            <span className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-error text-xs font-bold text-white">
              {notificationCount}
            </span>
          )}
        </button>
      </div>

      {/* Right Section: Language, Role, User */}
      <div className="flex items-center gap-3">
        {/* AI Insights Toggle */}
        <button
          onClick={() => onShowRightPanel(true)}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-muted"
          title="Show AI Explanation Panel"
        >
          <Lightbulb className="h-4 w-4 text-accent" />
          <span className="hidden sm:inline text-muted-foreground">AI Insights</span>
        </button>

        {/* Language Selector */}
        <div className="relative">
          <button
            onClick={() => {
              setShowLanguageMenu(!showLanguageMenu);
              setShowRoleMenu(false);
              setShowUserMenu(false);
            }}
            className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm hover:bg-muted"
          >
            <Globe className="h-4 w-4" />
            {currentLanguage.toUpperCase()}
          </button>
          {showLanguageMenu && (
            <div className="absolute right-0 z-50 mt-2 w-32 rounded-lg border border-border bg-card shadow-lg">
              {languageOptions.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setCurrentLanguage(lang.code);
                    setShowLanguageMenu(false);
                  }}
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-muted"
                >
                  {lang.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Role Selector */}
        <div className="relative">
          <button
            onClick={() => {
              setShowRoleMenu(!showRoleMenu);
              setShowLanguageMenu(false);
              setShowUserMenu(false);
            }}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-primary hover:bg-muted"
          >
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">{roleLabels[userRole].split(' - ')[0]}</span>
          </button>
          {showRoleMenu && (
            <div className="absolute right-0 z-50 mt-2 w-56 rounded-lg border border-border bg-card shadow-lg">
              <div className="px-4 py-2 text-xs font-semibold text-muted-foreground">
                SWITCH ROLE
              </div>
              {roles.map((role) => (
                <button
                  key={role}
                  onClick={() => {
                    onRoleChange(role);
                    setShowRoleMenu(false);
                  }}
                  className={`block w-full px-4 py-2 text-left text-sm ${
                    userRole === role
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
                  }`}
                >
                  <div className="font-medium">{roleLabels[role].split(' - ')[0]}</div>
                  <div className="text-xs opacity-75">{roleLabels[role]}</div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* User Menu */}
        <div className="relative border-l border-border pl-3">
          <button
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              setShowLanguageMenu(false);
              setShowRoleMenu(false);
            }}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-muted"
          >
            <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-xs font-semibold text-primary">RK</span>
            </div>
          </button>
          {showUserMenu && (
            <div className="absolute right-0 z-50 mt-2 w-48 rounded-lg border border-border bg-card shadow-lg">
              <div className="px-4 py-2 text-sm">
                <p className="font-semibold">{roleLabels[userRole]}</p>
                <p className="text-xs text-muted-foreground">Active User</p>
              </div>
              <div className="border-t border-border px-4 py-2">
                <button className="flex w-full items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
