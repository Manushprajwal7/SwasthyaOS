'use client';

import React from 'react';
import { Lightbulb, Check, X, Edit } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface AIRecommendationsProps {
  soapData: {
    subjective: string;
    objective: string;
    assessment: string;
    plan: string;
  };
}

interface Recommendation {
  id: string;
  type: 'diagnosis' | 'medication' | 'referral';
  title: string;
  description: string;
  confidence: number;
  reference: string;
}

export function AIRecommendations({ soapData }: AIRecommendationsProps) {
  const hasContent = Object.values(soapData).some((v) => v.length > 0);

  // Mock recommendations based on presence of SOAP data
  const recommendations: Recommendation[] = hasContent
    ? [
        {
          id: '1',
          type: 'diagnosis',
          title: 'Acute Respiratory Infection',
          description: 'ICD-10: J20.9 - Based on symptoms and clinical presentation',
          confidence: 88,
          reference: 'WHO Clinical Guidelines 2024',
        },
        {
          id: '2',
          type: 'medication',
          title: 'Azithromycin 500mg',
          description: '1 tablet twice daily for 5 days - as per treatment protocol',
          confidence: 82,
          reference: 'National Treatment Standards',
        },
        {
          id: '3',
          type: 'referral',
          title: 'Chest X-ray recommended',
          description: 'To rule out pneumonia - if symptoms persist beyond 3 days',
          confidence: 75,
          reference: 'Regional Health Protocols',
        },
      ]
    : [];

  const typeConfig = {
    diagnosis: { icon: '🔍', label: 'Diagnosis', color: 'bg-secondary/10' },
    medication: { icon: '💊', label: 'Medication', color: 'bg-primary/10' },
    referral: { icon: '→', label: 'Referral', color: 'bg-accent/10' },
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-foreground flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-accent" />
          AI Recommendations
        </h4>
      </div>

      {!hasContent && (
        <Card className="p-6 text-center">
          <p className="text-sm text-muted-foreground">
            Fill SOAP note sections to receive AI-powered recommendations
          </p>
        </Card>
      )}

      {hasContent && recommendations.length === 0 && (
        <Card className="p-6 text-center">
          <p className="text-sm text-muted-foreground">
            No recommendations available at this time
          </p>
        </Card>
      )}

      {recommendations.map((rec) => {
        const config = typeConfig[rec.type];
        return (
          <Card key={rec.id} className={`p-4 border-l-4 border-l-secondary`}>
            <div className="space-y-3">
              {/* Header */}
              <div className="flex items-start gap-2">
                <span className="text-xl">{config.icon}</span>
                <div className="flex-1">
                  <h5 className="font-semibold text-foreground text-sm">
                    {rec.title}
                  </h5>
                  <p className="text-xs text-muted-foreground mt-1">
                    {rec.description}
                  </p>
                </div>
              </div>

              {/* Confidence */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-muted-foreground">
                  Confidence:
                </span>
                <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden max-w-24">
                  <div
                    className="h-full bg-secondary"
                    style={{ width: `${rec.confidence}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-foreground min-w-fit">
                  {rec.confidence}%
                </span>
              </div>

              {/* Reference */}
              <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                📚 {rec.reference}
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button size="sm" className="flex-1 bg-transparent" variant="outline">
                  <Check className="h-3 w-3 mr-1" />
                  Accept
                </Button>
                <Button size="sm" className="flex-1 bg-transparent" variant="outline">
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button size="sm" className="flex-1 bg-transparent" variant="outline">
                  <X className="h-3 w-3 mr-1" />
                  Reject
                </Button>
              </div>
            </div>
          </Card>
        );
      })}

      {/* Disclaimer */}
      <Card className="bg-primary/5 p-3 border-primary/20">
        <p className="text-xs text-primary font-medium leading-relaxed">
          <strong>Clinical Disclaimer:</strong> All AI recommendations are assistive only. Final clinical decisions rest solely with the treating physician. Cross-reference with current clinical guidelines.
        </p>
      </Card>
    </div>
  );
}
