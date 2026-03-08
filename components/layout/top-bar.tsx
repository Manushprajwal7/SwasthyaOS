"use client";

import React, { useState } from "react";
import { Bell, Globe, User, LogOut, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";
import { languages } from "@/lib/i18n";
import { SummariseReportButton } from "@/components/bedrock/summarise-report-button";
import type { UserRole } from "./main-layout";

interface TopBarProps {
  userRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  onShowRightPanel: (show: boolean) => void;
}

export function TopBar({
  userRole,
  onRoleChange,
  onShowRightPanel,
}: TopBarProps) {
  const { language, setLanguage, t } = useLanguage();
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);

  const roles: UserRole[] = ["doctor", "frontline", "admin"];

  return (
    <div className="flex items-center justify-between border-b border-border bg-card px-6 py-4">
      {/* Left Section: Status & Notifications */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-success" />
          <span className="text-sm text-muted-foreground">
            {t("system.active")}
          </span>
        </div>

        {/* Notifications */}
        <button
          onClick={() => setNotificationCount(0)}
          className="relative rounded-lg p-2 hover:bg-muted"
          aria-label={t("system.notifications")}
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
        {/* Bedrock Summary Report */}
        <SummariseReportButton />

        {/* AI Insights Toggle */}
        <button
          onClick={() => onShowRightPanel(true)}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-muted"
          title={t("system.ai.insights")}
        >
          <Lightbulb className="h-4 w-4 text-accent" />
          <span className="hidden sm:inline text-muted-foreground">
            {t("system.ai.insights")}
          </span>
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
            {language.toUpperCase()}
          </button>
          {showLanguageMenu && (
            <div className="absolute right-0 z-50 mt-2 w-48 rounded-lg border border-border bg-card shadow-lg max-h-96 overflow-y-auto">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setShowLanguageMenu(false);
                  }}
                  className={`block w-full px-4 py-2 text-left text-sm hover:bg-muted ${
                    language === lang.code ? "bg-primary/10 font-semibold" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{lang.nativeName}</span>
                    {language === lang.code && (
                      <span className="text-primary">✓</span>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {lang.name}
                  </div>
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
            <span className="hidden sm:inline">
              {t(`role.${userRole}` as keyof typeof t).split(" - ")[0]}
            </span>
          </button>
          {showRoleMenu && (
            <div className="absolute right-0 z-50 mt-2 w-56 rounded-lg border border-border bg-card shadow-lg">
              <div className="px-4 py-2 text-xs font-semibold text-muted-foreground">
                {t("role.switch")}
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
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  <div className="font-medium">
                    {t(`role.${role}` as keyof typeof t).split(" - ")[0]}
                  </div>
                  <div className="text-xs opacity-75">
                    {t(`role.${role}` as keyof typeof t)}
                  </div>
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
                <p className={cn("font-semibold", userRole === 'admin' ? "text-primary" : "text-amber-600")}>
                  {t(`role.${userRole}` as any)}
                </p>
                <p className="text-xs text-muted-foreground">{t("system.active_user")}</p>
              </div>
              <div className="border-t border-border px-4 py-2">
                <button className="flex w-full items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                  <LogOut className="h-4 w-4" />
                  {t("system.sign.out")}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
