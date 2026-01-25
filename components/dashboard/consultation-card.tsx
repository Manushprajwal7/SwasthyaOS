"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, User, Activity } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

interface ConsultationCardProps {
  patientId: string;
  patientName: string;
  age: number;
  reason: string;
  status: "completed" | "in-progress" | "pending";
  time: string;
  confidence: number;
}

export function ConsultationCard({
  patientId,
  patientName,
  age,
  reason,
  status,
  time,
  confidence,
}: ConsultationCardProps) {
  const { t } = useLanguage();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-success/10 text-success border-success/20";
      case "in-progress":
        return "bg-warning/10 text-warning border-warning/20";
      case "pending":
        return "bg-muted text-muted-foreground border-border";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-success";
    if (confidence >= 70) return "text-warning";
    return "text-error";
  };

  const getStatusText = (status: string) => {
    return t(`common.${status.replace("-", "-")}` as keyof typeof t);
  };

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="font-semibold text-foreground">{patientName}</span>
            <span className="text-sm text-muted-foreground">({age}y)</span>
            <Badge variant="outline" className="text-xs">
              {patientId}
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground mb-3">{reason}</p>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{time}</span>
            </div>

            {confidence > 0 && (
              <div className="flex items-center gap-1">
                <Activity className="h-3 w-3 text-muted-foreground" />
                <span
                  className={`text-xs font-medium ${getConfidenceColor(confidence)}`}
                >
                  {confidence}% {t("common.confidence")}
                </span>
              </div>
            )}
          </div>
        </div>

        <Badge className={getStatusColor(status)}>
          {getStatusText(status)}
        </Badge>
      </div>
    </Card>
  );
}
