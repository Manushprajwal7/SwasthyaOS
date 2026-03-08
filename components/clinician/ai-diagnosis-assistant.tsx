"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Brain, Loader2, AlertCircle } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

interface DiagnosisSuggestion {
  icd10Code: string;
  condition: string;
  confidence: number;
  reasoning: string;
  recommendedTests: string[];
}

export function AIDiagnosisAssistant() {
  const { t } = useLanguage();
  const [symptoms, setSymptoms] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<DiagnosisSuggestion[]>([]);
  const [error, setError] = useState("");

  const analyzeSymptoms = async () => {
    if (!symptoms.trim()) {
      setError("Please enter symptoms");
      return;
    }

    setLoading(true);
    setError("");
    setSuggestions([]);

    try {
      const response = await fetch("/api/ai/diagnosis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          symptoms: symptoms.split(",").map((s) => s.trim()),
          vitals: {
            temperature: 98.6,
            bloodPressure: "120/80",
            heartRate: 72,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get diagnosis suggestions");
      }

      const data = await response.json();
      setSuggestions(data.suggestions || []);
    } catch (err) {
      setError("Failed to analyze symptoms. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 85) return "bg-success text-success-foreground";
    if (confidence >= 70) return "bg-accent text-accent-foreground";
    return "bg-warning text-warning-foreground";
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <Brain className="h-6 w-6 text-primary" />
        <div>
          <h3 className="font-semibold text-foreground">
            AI Diagnosis Assistant
          </h3>
          <p className="text-sm text-muted-foreground">
            Powered by Amazon Bedrock - Clinical Decision Support
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Enter Symptoms (comma-separated)
          </label>
          <Input
            placeholder="e.g., fever, cough, headache, fatigue"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && analyzeSymptoms()}
          />
        </div>

        <Button onClick={analyzeSymptoms} disabled={loading} className="w-full">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Brain className="mr-2 h-4 w-4" />
              Analyze Symptoms
            </>
          )}
        </Button>

        {error && (
          <div className="flex items-center gap-2 p-3 bg-error/10 border border-error/20 rounded-lg">
            <AlertCircle className="h-4 w-4 text-error" />
            <p className="text-sm text-error">{error}</p>
          </div>
        )}

        {suggestions.length > 0 && (
          <div className="space-y-3 mt-4">
            <h4 className="text-sm font-semibold text-foreground">
              Differential Diagnosis Suggestions
            </h4>
            {suggestions.map((suggestion, index) => (
              <Card key={index} className="p-4 border-l-4 border-l-primary">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h5 className="font-semibold text-foreground">
                      {suggestion.condition}
                    </h5>
                    <p className="text-xs text-muted-foreground">
                      ICD-10: {suggestion.icd10Code}
                    </p>
                  </div>
                  <Badge className={getConfidenceColor(suggestion.confidence)}>
                    {suggestion.confidence}% {t("common.confidence")}
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground mb-3">
                  {suggestion.reasoning}
                </p>

                {suggestion.recommendedTests.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-foreground mb-1">
                      Recommended Tests:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {suggestion.recommendedTests.map((test, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {test}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            ))}

            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground">
                ⚠️ AI-generated suggestions are for clinical decision support
                only. Final diagnosis must be made by a licensed healthcare
                professional based on complete clinical evaluation.
              </p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
