"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, MapPin, TrendingUp, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

interface AlertPanelProps {
  severity: "low" | "medium" | "high" | "critical";
  title: string;
  location: string;
  description: string;
  confidence: number;
  timestamp?: string;
  onAcknowledge?: () => void;
  onViewDetails?: () => void;
}

export function AlertPanel({
  severity,
  title,
  location,
  description,
  confidence,
  timestamp,
  onAcknowledge,
  onViewDetails,
}: AlertPanelProps) {
  const { t } = useLanguage();

  const getSeverityConfig = (severity: string) => {
    switch (severity) {
      case "critical":
        return {
          color: "bg-error/10 text-error border-error/20",
          icon: "text-error",
          badge: "bg-error text-error-foreground",
        };
      case "high":
        return {
          color: "bg-warning/10 text-warning border-warning/20",
          icon: "text-warning",
          badge: "bg-warning text-warning-foreground",
        };
      case "medium":
        return {
          color: "bg-accent/10 text-accent border-accent/20",
          icon: "text-accent",
          badge: "bg-accent text-accent-foreground",
        };
      case "low":
        return {
          color: "bg-muted text-muted-foreground border-border",
          icon: "text-muted-foreground",
          badge: "bg-muted text-muted-foreground",
        };
      default:
        return {
          color: "bg-muted text-muted-foreground border-border",
          icon: "text-muted-foreground",
          badge: "bg-muted text-muted-foreground",
        };
    }
  };

  const config = getSeverityConfig(severity);

  return (
    <Card className={`p-4 border-l-4 ${config.color}`}>
      <div className="flex items-start gap-3">
        <AlertTriangle
          className={`h-5 w-5 flex-shrink-0 mt-0.5 ${config.icon}`}
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h4 className="font-semibold text-foreground text-sm">{title}</h4>
            <Badge className={`${config.badge} text-xs`}>
              {t(`common.${severity}` as keyof typeof t).toUpperCase()}
            </Badge>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <MapPin className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{location}</span>
          </div>

          <p className="text-sm text-muted-foreground mb-3">{description}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {confidence}% {t("common.confidence")}
                </span>
              </div>

              {timestamp && (
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {timestamp}
                  </span>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              {onViewDetails && (
                <Button variant="outline" size="sm" onClick={onViewDetails}>
                  {t("common.details")}
                </Button>
              )}
              {onAcknowledge && (
                <Button size="sm" onClick={onAcknowledge}>
                  {t("common.acknowledge")}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
