'use client';

import React, { useState } from 'react';
import { Lightbulb, Check, X, Edit } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from '@/contexts/language-context';

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
  const { toast } = useToast();
  const { t } = useLanguage();
  const [dismissedRecs, setDismissedRecs] = useState<string[]>([]);
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
    diagnosis: { icon: '🔍', label: t("clinician.recs.diagnosis"), color: 'bg-secondary/10' },
    medication: { icon: '💊', label: t("clinician.recs.medication"), color: 'bg-primary/10' },
    referral: { icon: '→', label: t("clinician.recs.referral"), color: 'bg-accent/10' },
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-foreground flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-accent" />
          {t("clinician.recs.title")}
        </h4>
      </div>

      {!hasContent && (
        <Card className="p-6 text-center">
          <p className="text-sm text-muted-foreground">
            {t("clinician.recs.empty")}
          </p>
        </Card>
      )}

      {hasContent && recommendations.filter(r => !dismissedRecs.includes(r.id)).length === 0 && (
        <Card className="p-6 text-center">
          <p className="text-sm text-muted-foreground">
            {t("clinician.recs.none")}
          </p>
        </Card>
      )}

      {recommendations.filter(r => !dismissedRecs.includes(r.id)).map((rec) => {
        const config = typeConfig[rec.type];
        return (
          <Card key={rec.id} className={`p-4 border-l-4 border-l-secondary/60 dark:border-l-secondary/40 shadow-sm hover:shadow-md transition-shadow group bg-white dark:bg-slate-900 border-border`}>
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start gap-3">
                <span className={`text-xl p-2 rounded-lg ${config.color} shrink-0 leading-none flex items-center justify-center`}>{config.icon}</span>
                <div className="flex-1 mt-0.5">
                  <h5 className="font-semibold text-foreground text-sm tracking-tight group-hover:text-primary transition-colors">
                    {rec.title}
                  </h5>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                    {rec.description}
                  </p>
                </div>
              </div>

              {/* Confidence & Ref Row */}
              <div className="flex items-center justify-between gap-4 pt-1">
                <div className="flex items-center gap-2 flex-1">
                   <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                    {t("clinician.recs.score")}
                  </span>
                  <div className="flex-1 h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden max-w-[80px]">
                    <div
                      className="h-full bg-gradient-to-r from-teal-400 to-emerald-500"
                      style={{ width: `${rec.confidence}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 min-w-fit">
                    {rec.confidence}%
                  </span>
                </div>
                
                <div className="text-[10px] text-muted-foreground font-medium truncate max-w-[120px]" title={rec.reference}>
                   {rec.reference}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2 border-t border-border mt-2">
                <Button 
                  size="sm" 
                  className="flex-1 h-8 bg-green-50 hover:bg-green-100 text-green-700 dark:bg-green-950/30 dark:hover:bg-green-900/50 dark:text-green-400 border-0 transition-colors" 
                  variant="outline"
                  onClick={() => {
                    setDismissedRecs([...dismissedRecs, rec.id]);
                    toast({ title: "Recommendation Accepted", description: `${rec.title} added to plan.` });
                  }}
                >
                   <Check className="h-3.5 w-3.5 mr-1" />
                  {t("clinician.recs.accept")}
                </Button>
                <Button 
                  size="sm" 
                  className="w-8 h-8 p-0 shrink-0 text-muted-foreground hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" 
                  variant="ghost"
                  onClick={() => toast({ title: "Edit Recommendation", description: "Opening editor module..." })}
                >
                  <Edit className="h-3.5 w-3.5" />
                </Button>
                <Button 
                  size="sm" 
                  className="w-8 h-8 p-0 shrink-0 text-muted-foreground hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30 dark:hover:text-red-400 transition-colors" 
                  variant="ghost"
                  onClick={() => {
                    setDismissedRecs([...dismissedRecs, rec.id]);
                    toast({ title: "Recommendation Dismissed" });
                  }}
                >
                  <X className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </Card>
        );
      })}

      {/* Disclaimer */}
       <Card className="bg-primary/5 p-3 border-primary/20">
        <p className="text-xs text-primary font-medium leading-relaxed">
          {t("clinician.recs.disclaimer")}
        </p>
      </Card>
    </div>
  );
}
