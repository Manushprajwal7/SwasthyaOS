"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SkeletonClinicalProps {
  lines?: number;
  className?: string;
}

export function SkeletonClinical({
  lines = 3,
  className,
}: SkeletonClinicalProps) {
  const lineWidths = ["w-full", "w-4/5", "w-3/5", "w-2/3", "w-1/2"];

  return (
    <div className={cn("space-y-3 animate-pulse", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "h-4 rounded bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200",
            "animate-shimmer bg-[length:200%_100%]",
            lineWidths[i % lineWidths.length]
          )}
          style={{
            animationDelay: `${i * 100}ms`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
      `}</style>
    </div>
  );
}

// Section header component as specified
interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  awsService?: string;
  awsModel?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  awsService,
  awsModel,
  icon,
  className,
}: SectionHeaderProps) {
  // Import inline to avoid circular deps
  const { AWSBadge } = require("@/components/ui/aws-badge");

  return (
    <div
      className={cn(
        "flex items-center justify-between pb-3 mb-4 border-b border-slate-200",
        className
      )}
    >
      <div className="flex items-center gap-2">
        {icon}
        <div>
          <h3 className="font-semibold text-foreground">{title}</h3>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>
      {awsService && <AWSBadge service={awsService} model={awsModel} />}
    </div>
  );
}
