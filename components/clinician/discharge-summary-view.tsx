'use client';

import React, { useState } from 'react';
import { Download, Globe, FileText, Printer as Print } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function DischargeSummaryView() {
  const [language, setLanguage] = useState('en');
  const [showPatientVersion, setShowPatientVersion] = useState(false);

  const dischargeSummary = {
    en: {
      title: 'Discharge Summary',
      patientName: 'Ajay Kumar',
      patientId: 'P-2402',
      admissionDate: '2024-01-23',
      dischargeDate: '2024-01-24',
      diagnosis: 'Acute Respiratory Infection (ICD-10: J20.9)',
      summary: 'Patient was admitted with chief complaints of fever, cough, and breathing difficulty. Clinical examination revealed bilateral crackles in lungs. Chest X-ray showed mild pneumonic consolidation. Treated with antibiotics and supportive care. Patient showed improvement and is fit for discharge.',
      medications: [
        'Azithromycin 500mg twice daily for 5 days',
        'Paracetamol 500mg as needed for fever',
        'Cough syrup - 10ml thrice daily',
      ],
      followUp: 'Follow-up consultation in 1 week. Repeat chest X-ray if symptoms persist.',
      restrictions: 'Rest for 3 days. Avoid strenuous activities.',
    },
    hi: {
      title: 'छुट्टी के समय का सारांश',
      patientName: 'अजय कुमार',
      patientId: 'P-2402',
      admissionDate: '2024-01-23',
      dischargeDate: '2024-01-24',
      diagnosis: 'तीव्र श्वसन संक्रमण (ICD-10: J20.9)',
      summary: 'रोगी बुखार, खांसी और सांस लेने में कठिनाई की शिकायत के साथ भर्ती हुए। नैदानिक परीक्षण से फेफड़ों में द्विपक्षीय क्रैकल्स पाए गए। छाती का एक्स-रे हल्के निमोनिक संघनन को दिखाता है। एंटीबायोटिक्स और सहायक देखभाल से इलाज किया गया। रोगी में सुधार हुआ है और छुट्टी के लिए तैयार है।',
      medications: [
        'एज़िथ्रोमाइसिन 500mg दिन में दो बार 5 दिनों के लिए',
        'पेरासिटामोल 500mg आवश्यकता अनुसार',
        'खांसी की दवा - 10ml दिन में तीन बार',
      ],
      followUp: '1 हफ्ते में फॉलो-अप परामर्श। अगर लक्षण बने रहें तो छाती का एक्स-रे दोहराएं।',
      restrictions: '3 दिनों के लिए आराम करें। कठोर व्यायाम से बचें।',
    },
  };

  const content = dischargeSummary[language as keyof typeof dischargeSummary];

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Controls */}
      <div className="flex flex-wrap gap-3">
        {/* Language Selector */}
        <div className="flex gap-2">
          <Button
            variant={language === 'en' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setLanguage('en')}
          >
            <Globe className="h-4 w-4 mr-1" />
            English
          </Button>
          <Button
            variant={language === 'hi' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setLanguage('hi')}
          >
            <Globe className="h-4 w-4 mr-1" />
            हिन्दी
          </Button>
        </div>

        {/* View Toggle */}
        <Button
          variant={showPatientVersion ? 'default' : 'outline'}
          size="sm"
          onClick={() => setShowPatientVersion(!showPatientVersion)}
        >
          {showPatientVersion ? 'Doctor View' : 'Patient Friendly'}
        </Button>

        {/* Actions */}
        <div className="ml-auto flex gap-2">
          <Button variant="outline" size="sm">
            <Print className="h-4 w-4 mr-1" />
            Print
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" />
            Download PDF
          </Button>
        </div>
      </div>

      {/* Discharge Summary Document */}
      <Card className="p-8 print:p-0">
        {/* Header */}
        <div className="text-center border-b border-border pb-6 mb-6">
          <h1 className="text-2xl font-bold text-primary">{content.title}</h1>
          <p className="text-sm text-muted-foreground mt-2">
            SwasthyaOS Clinical Record
          </p>
        </div>

        {/* Patient Information */}
        <div className="grid grid-cols-2 gap-6 mb-8 pb-8 border-b border-border">
          <div>
            <p className="text-xs font-semibold text-muted-foreground">
              PATIENT NAME
            </p>
            <p className="text-lg font-semibold text-foreground">
              {content.patientName}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground">
              PATIENT ID
            </p>
            <p className="text-lg font-mono text-foreground">
              {content.patientId}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground">
              ADMISSION DATE
            </p>
            <p className="text-base text-foreground">{content.admissionDate}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground">
              DISCHARGE DATE
            </p>
            <p className="text-base text-foreground">{content.dischargeDate}</p>
          </div>
        </div>

        {/* Clinical Content */}
        <div className="space-y-6">
          {/* Diagnosis */}
          <div>
            <h3 className="text-sm font-bold text-primary mb-2">PRIMARY DIAGNOSIS</h3>
            <p className="text-foreground">{content.diagnosis}</p>
          </div>

          {/* Summary */}
          <div>
            <h3 className="text-sm font-bold text-primary mb-2">CLINICAL SUMMARY</h3>
            <p className="text-foreground leading-relaxed text-justify">
              {content.summary}
            </p>
          </div>

          {/* Medications */}
          <div>
            <h3 className="text-sm font-bold text-primary mb-3">
              DISCHARGE MEDICATIONS
            </h3>
            <div className="space-y-2 rounded-lg bg-muted/50 p-4">
              {content.medications.map((med, i) => (
                <div key={i} className="flex gap-3">
                  <span className="font-semibold text-primary min-w-fit">
                    {i + 1}.
                  </span>
                  <p className="text-foreground">{med}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Follow-up */}
          <div>
            <h3 className="text-sm font-bold text-primary mb-2">
              FOLLOW-UP INSTRUCTIONS
            </h3>
            <p className="text-foreground">{content.followUp}</p>
          </div>

          {/* Restrictions */}
          <div>
            <h3 className="text-sm font-bold text-primary mb-2">
              POST-DISCHARGE RESTRICTIONS
            </h3>
            <p className="text-foreground">{content.restrictions}</p>
          </div>
        </div>

        {/* Footer Disclaimer */}
        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground leading-relaxed">
            This discharge summary has been generated using SwasthyaOS Clinical Documentation System. Please ensure all information is accurate. Patient should follow all prescribed medications and follow-up appointments as recommended.
          </p>
        </div>
      </Card>

      {/* Legal Disclaimer */}
      <Card className="bg-warning/5 border-warning/20 p-6">
        <h4 className="font-semibold text-warning mb-2">Legal & Medical Disclaimer</h4>
        <p className="text-sm text-foreground leading-relaxed">
          This document is a medical record and should be treated as confidential. Any changes to this summary should be made only by authorized clinical personnel. The patient must retain a copy for their personal health records.
        </p>
      </Card>
    </div>
  );
}
