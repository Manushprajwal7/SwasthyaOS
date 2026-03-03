"use client";

import React from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Stethoscope,
  MapPin,
  Radar,
  Users,
  FileText,
  Lock,
  Settings,
  Calendar,
  Package,
  Bell,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/language-context";
import type { UserRole } from "./main-layout";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  userRole: UserRole;
  currentPage: string;
}

export function Sidebar({
  isOpen,
  onToggle,
  userRole,
  currentPage,
}: SidebarProps) {
  const { t } = useLanguage();

  const navigationItems = [
    {
      id: "dashboard",
      label: t("nav.dashboard"),
      icon: LayoutDashboard,
      href: "/",
      roles: ["doctor", "frontline", "admin"] as UserRole[],
    },
    {
      id: "clinician",
      label: t("nav.clinician"),
      icon: Stethoscope,
      href: "/clinician",
      roles: ["doctor", "frontline"] as UserRole[],
    },
    {
      id: "rural",
      label: t("nav.rural"),
      icon: MapPin,
      href: "/rural",
      roles: ["frontline", "admin"] as UserRole[],
    },
    {
      id: "population",
      label: t("nav.population"),
      icon: Radar,
      href: "/population",
      roles: ["doctor", "admin"] as UserRole[],
    },
    {
      id: "patients",
      label: t("nav.patients"),
      icon: Users,
      href: "/patients",
      roles: ["doctor", "frontline"] as UserRole[],
    },
    {
      id: "appointments",
      label: t("nav.appointments"),
      icon: Calendar,
      href: "/appointments",
      roles: ["doctor", "frontline", "admin"] as UserRole[],
    },
    {
      id: "inventory",
      label: t("nav.inventory"),
      icon: Package,
      href: "/inventory",
      roles: ["doctor", "admin"] as UserRole[],
    },
    {
      id: "alerts",
      label: t("nav.alerts"),
      icon: Bell,
      href: "/alerts",
      roles: ["doctor", "frontline", "admin"] as UserRole[],
    },
    {
      id: "chat",
      label: t("nav.chat"),
      icon: MessageSquare,
      href: "/chat",
      roles: ["doctor", "frontline", "admin"] as UserRole[],
    },
    {
      id: "reports",
      label: t("nav.reports"),
      icon: FileText,
      href: "/reports",
      roles: ["doctor", "admin"] as UserRole[],
    },
    {
      id: "audit",
      label: t("nav.audit"),
      icon: Lock,
      href: "/audit",
      roles: ["admin"] as UserRole[],
    },
    {
      id: "settings",
      label: t("nav.settings"),
      icon: Settings,
      href: "/settings",
      roles: ["doctor", "frontline", "admin"] as UserRole[],
    },
  ];

  const filteredItems = navigationItems.filter((item) =>
    item.roles.includes(userRole)
  );

  return (
    <div
      className={cn(
        "flex flex-col bg-slate-100 border-r border-slate-200 transition-all duration-300",
        isOpen ? "w-64" : "w-20"
      )}
    >
      {/* Logo Section */}
      <div
        className={cn(
          "flex items-center justify-between border-b border-slate-200 px-4 py-6",
          !isOpen && "flex-col gap-2"
        )}
      >
        {isOpen ? (
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900">SwasthyaOS</h1>
              {/* EKG Line Animation */}
              <svg className="h-4 w-12 text-teal-600" viewBox="0 0 48 16">
                <path
                  d="M0 8 L8 8 L12 2 L16 14 L20 6 L24 10 L28 8 L48 8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="animate-pulse"
                />
              </svg>
            </div>
            <p className="text-xs text-slate-500 mt-1">v2.1.0 · ap-south-1</p>
          </div>
        ) : (
          <span className="text-xl font-bold text-teal-600">S</span>
        )}
        <button
          onClick={onToggle}
          className="rounded-lg p-1.5 hover:bg-slate-200 text-slate-500 hover:text-slate-700 transition-colors"
          aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isOpen ? (
            <ChevronLeft className="h-5 w-5" />
          ) : (
            <ChevronRight className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-6">
        {filteredItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-teal-600 text-white shadow-sm"
                  : "text-slate-700 hover:bg-slate-200 hover:text-slate-900"
              )}
              title={!isOpen ? item.label : undefined}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {isOpen && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section - System Status */}
      <div
        className={cn(
          "border-t border-slate-200 px-3 py-4",
          !isOpen && "flex flex-col items-center"
        )}
      >
        {isOpen ? (
          <div className="space-y-3">
            {/* System Status */}
            <div className="flex items-center gap-2 text-xs">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-slate-600">All Systems Operational</span>
            </div>
            <div className="text-xs text-slate-500">
              <p>SwasthyaOS Healthcare Platform</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <Activity className="h-4 w-4 text-slate-500" />
          </div>
        )}
      </div>
    </div>
  );
}
