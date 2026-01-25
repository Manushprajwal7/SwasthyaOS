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
    item.roles.includes(userRole),
  );

  return (
    <div
      className={cn(
        "flex flex-col border-r border-border bg-sidebar transition-all duration-300",
        isOpen ? "w-64" : "w-20",
      )}
    >
      {/* Logo Section */}
      <div
        className={cn(
          "flex items-center justify-between border-b border-border px-4 py-6",
          !isOpen && "flex-col gap-2",
        )}
      >
        {isOpen && (
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-primary">SwasthyaOS</h1>
            <p className="text-xs text-muted-foreground">
              Healthcare Intelligence
            </p>
          </div>
        )}
        <button
          onClick={onToggle}
          className="rounded-lg p-1 hover:bg-sidebar-accent"
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
      <nav className="flex-1 space-y-2 overflow-y-auto px-3 py-6">
        {filteredItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent",
              )}
              title={!isOpen ? item.label : undefined}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {isOpen && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div
        className={cn(
          "border-t border-border px-3 py-4",
          !isOpen && "flex flex-col items-center",
        )}
      >
        <div className={cn("text-xs", !isOpen ? "text-center" : "")}>
          <p className="font-semibold text-sidebar-foreground">v1.0.0</p>
          {isOpen && <p className="text-sidebar-foreground/60">SwasthyaOS</p>}
        </div>
      </div>
    </div>
  );
}
