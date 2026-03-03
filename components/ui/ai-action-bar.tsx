"use client";

import React from "react";
import { Check, Edit, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfidenceRing } from "@/components/ui/confidence-ring";
import { AWSBadge } from "@/components/ui/aws-badge";
import { cn } from "@/lib/utils";

interface AIActionBarProps {
  onAccept?: () => void;
  onEdit?: () => void;
  onReject?: () => void;
  confidence: number; // 0.0 - 1.0
  sourceModel?: string;
  sourceService?: string;
  showConfidence?: boolean;
  showBadge?: boolean;
  disabled?: boolean;
  className?: string;
}

export function AIActionBar({
  onAccept,
  onEdit,
  onReject,
  confidence,
  sourceModel = "Claude 3 Sonnet",
  sourceService = "Amazon Bedrock",
  showConfidence = true,
  showBadge = true,
  disabled = false,
  className,
}: AIActionBarProps) {
  const lowConfidence = confidence < 0.7;

  return (
    <div className={cn("space-y-3", className)}>
      {/* Warning for low confidence */}
      {lowConfidence && (
        <div className="flex items-center gap-2 rounded-md bg-amber-50 border border-amber-200 px-3 py-2">
          <span className="text-amber-600 text-xs font-medium">
            ⚠️ Human review required (confidence below 70%)
          </span>
        </div>
      )}

      {/* Action buttons and confidence */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="default"
            onClick={onAccept}
            disabled={disabled}
            className="bg-teal-600 hover:bg-teal-700 text-white"
          >
            <Check className="h-3.5 w-3.5 mr-1" />
            Accept
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={onEdit}
            disabled={disabled}
          >
            <Edit className="h-3.5 w-3.5 mr-1" />
            Edit
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={onReject}
            disabled={disabled}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <X className="h-3.5 w-3.5 mr-1" />
            Reject
          </Button>
        </div>

        <div className="flex items-center gap-3">
          {showConfidence && <ConfidenceRing score={confidence} size="sm" />}
          {showBadge && (
            <AWSBadge service={sourceService} model={sourceModel} />
          )}
        </div>
      </div>
    </div>
  );
}
