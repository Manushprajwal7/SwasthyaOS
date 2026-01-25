"use client";

import React, { useEffect, useState } from "react";
import {
  X,
  Brain,
  TrendingUp,
  AlertCircle,
  Activity,
  Users,
  Loader2,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";

interface AIInsight {
  title: string;
  content: string;
  confidence: number;
  category: "clinical" | "population" | "operational" | "alert";
  priority: "high" | "medium" | "low";
}

interface RightPanelProps {
  title: string;
  content: string;
  confidence?: number;
  onClose: () => void;
}

export function RightPanel({
  title,
  content,
  confidence,
  onClose,
}: RightPanelProps) {
  const { t } = useLanguage();
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/ai/insights");

      if (!response.ok) {
        throw new Error("Failed to fetch insights");
      }

      const data = await response.json();
      setInsights(data.insights || []);
      setSummary(data.summary || "");
    } catch (error) {
      console.error("Error fetching insights:", error);
    } finally {
      setLoading(false);
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-success bg-success/10 border-success/20";
    if (confidence >= 70) return "text-warning bg-warning/10 border-warning/20";
    return "text-error bg-error/10 border-error/20";
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "clinical":
        return <Brain className="h-4 w-4" />;
      case "population":
        return <Users className="h-4 w-4" />;
      case "operational":
        return <Activity className="h-4 w-4" />;
      case "alert":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <TrendingUp className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "clinical":
        return "bg-primary/5 border-primary/20 text-primary";
      case "population":
        return "bg-accent/5 border-accent/20 text-accent";
      case "operational":
        return "bg-success/5 border-success/20 text-success";
      case "alert":
        return "bg-warning/5 border-warning/20 text-warning";
      default:
        return "bg-muted border-border text-foreground";
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return (
          <Badge className="bg-error text-error-foreground">
            High Priority
          </Badge>
        );
      case "medium":
        return (
          <Badge className="bg-warning text-warning-foreground">Medium</Badge>
        );
      case "low":
        return <Badge variant="outline">Low</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="w-80 border-l border-border bg-card flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-foreground">{title}</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="h-8 w-8 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-3" />
            <p className="text-sm text-muted-foreground">
              Generating AI insights...
            </p>
          </div>
        ) : (
          <>
            {/* Summary */}
            {summary && (
              <Card className="p-3 bg-primary/5 border-primary/20">
                <div className="flex items-start gap-2">
                  <Brain className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">
                      System Overview
                    </p>
                    <p className="text-xs text-muted-foreground">{summary}</p>
                  </div>
                </div>
              </Card>
            )}

            {/* AI Insights */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-foreground">
                  AI-Generated Insights
                </h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={fetchInsights}
                  className="h-7 text-xs"
                >
                  Refresh
                </Button>
              </div>

              {insights.length > 0 ? (
                insights.map((insight, index) => (
                  <Card
                    key={index}
                    className={`p-3 ${getCategoryColor(insight.category)}`}
                  >
                    <div className="flex items-start gap-2 mb-2">
                      {getCategoryIcon(insight.category)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <p className="text-sm font-medium leading-tight">
                            {insight.title}
                          </p>
                          {getPriorityBadge(insight.priority)}
                        </div>
                        <p className="text-xs opacity-90 leading-relaxed">
                          {insight.content}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-current/10">
                      <span className="text-xs opacity-75">
                        {insight.category.charAt(0).toUpperCase() +
                          insight.category.slice(1)}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {insight.confidence}% confidence
                      </Badge>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8">
                  <AlertCircle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    No insights available
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={fetchInsights}
                    className="mt-3"
                  >
                    Generate Insights
                  </Button>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="text-xs text-muted-foreground text-center">
          <p className="font-medium">SwasthyaOS AI Engine v2.1.4</p>
          <p className="mt-1">Powered by Gemini AI</p>
          <p className="mt-1 text-[10px]">
            Last updated: {new Date().toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  );
}
