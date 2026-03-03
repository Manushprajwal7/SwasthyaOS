"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { CheckCircle, XCircle } from "lucide-react";

interface FHIRBadgeProps {
  resourceType: string;
  validated?: boolean;
  version?: "R4" | "R5";
  className?: string;
}

export function FHIRBadge({
  resourceType,
  validated = true,
  version = "R4",
  className,
}: FHIRBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded px-2 py-0.5 font-mono text-xs",
        validated
          ? "bg-green-50 text-green-700 border border-green-200"
          : "bg-red-50 text-red-700 border border-red-200",
        className
      )}
    >
      <span className="font-semibold">FHIR {version}</span>
      <span className="text-slate-400">|</span>
      <span>{resourceType}</span>
      {validated ? (
        <CheckCircle className="h-3 w-3 text-green-600" />
      ) : (
        <XCircle className="h-3 w-3 text-red-600" />
      )}
    </div>
  );
}
