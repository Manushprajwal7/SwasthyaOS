import { NextRequest, NextResponse } from 'next/server';
import { generatePDFReport, PDFReportData } from '@/lib/pdf-generator';

export async function POST(request: NextRequest) {
  try {
    const { reportId, reportTitle, dateRange } = await request.json();
    
    // Generate PDF content for the specific report
    const reportContent = getReportSpecificContent(reportId);
    
    // Create proper PDF
    const pdfData: PDFReportData = {
      title: reportTitle,
      dateRange: `${dateRange.start} to ${dateRange.end}`,
      generatedOn: new Date().toLocaleString(),
      content: reportContent
    };
    
    const pdfBuffer = generatePDFReport(pdfData);
    
    return new NextResponse(Buffer.from(pdfBuffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${reportTitle.toLowerCase().replace(/\s+/g, '-')}-${dateRange.start}-to-${dateRange.end}.pdf"`,
      },
    });
  } catch (error) {
    console.error('Export patient report error:', error);
    return NextResponse.json({ error: 'Failed to export report' }, { status: 500 });
  }
}

function getReportSpecificContent(reportId: string): string {
  switch (reportId) {
    case 'individual':
      return `
INDIVIDUAL PATIENT REPORTS SUMMARY

Total Patients: 2,847
Total Consultations: 5,124
Average Consultations per Patient: 1.8

TOP DIAGNOSES:
1. Hypertension (234 cases)
2. Diabetes (189 cases)  
3. Respiratory Infections (156 cases)
4. Gastrointestinal Issues (123 cases)
5. Musculoskeletal Problems (98 cases)

DEMOGRAPHIC BREAKDOWN:
Age Groups:
- 0-18 years: 234 patients (8.2%)
- 19-45 years: 1,234 patients (43.3%)
- 46-65 years: 890 patients (31.3%)
- 65+ years: 489 patients (17.2%)

Gender Distribution:
- Male: 1,423 patients (50.0%)
- Female: 1,424 patients (50.0%)

RECENT CONSULTATIONS:
- Emergency: 432 consultations
- Routine: 3,456 consultations  
- Follow-up: 1,236 consultations
      `;

    case 'followup':
      return `
FOLLOW-UP STATUS REPORTS SUMMARY

Total Follow-ups Required: 2,255
Completed Follow-ups: 1,923 (85.2%)
Pending Follow-ups: 287 (12.7%)
Overdue Follow-ups: 45 (2.0%)

FOLLOW-UP COMPLETION BY CATEGORY:
High Risk Patients: 45/45 (100%)
Medium Risk Patients: 456/500 (91.2%)
Low Risk Patients: 1,422/1,710 (83.2%)

AVERAGE FOLLOW-UP TIMES:
- High Risk: 1.2 days
- Medium Risk: 2.8 days
- Low Risk: 4.5 days

FOLLOW-UP METHODS:
- Phone Call: 1,234 (64.2%)
- In-Person: 456 (23.7%)
- Video Consultation: 233 (12.1%)

MISSED APPOINTMENTS:
Total Missed: 287
Reasons:
- Forgot: 123 (42.9%)
- Transportation: 67 (23.3%)
- Work Commitment: 56 (19.5%)
- Other: 41 (14.3%)
      `;

    case 'prescription':
      return `
PRESCRIPTION REPORTS SUMMARY

Total Prescriptions: 3,421
Unique Patients: 2,156
Average Prescriptions per Patient: 1.6

MEDICATION ADHERENCE:
Fully Adherent: 2,673 patients (78.1%)
Partially Adherent: 567 patients (16.6%)
Non-Adherent: 189 patients (5.3%)

TOP PRESCRIBED MEDICATIONS:
1. Paracetamol - 456 prescriptions
2. Amoxicillin - 387 prescriptions
3. Metformin - 345 prescriptions
4. Amlodipine - 298 prescriptions
5. Ibuprofen - 234 prescriptions

PRESCRIPTION BY THERAPEUTIC CLASS:
- Analgesics: 789 (23.1%)
- Antibiotics: 678 (19.8%)
- Antihypertensives: 567 (16.6%)
- Antidiabetics: 456 (13.3%)
- Others: 931 (27.2%)

ADVERSE DRUG REACTIONS:
Total ADRs Reported: 156
Severe: 12 (7.7%)
Moderate: 67 (42.9%)
Mild: 77 (49.4%)

DRUG INTERACTIONS:
Potential Interactions Identified: 23
Clinically Significant: 5 (21.7%)
Managed Appropriately: 23 (100%)
      `;

    case 'referral':
      return `
REFERRAL REPORTS SUMMARY

Total Referrals: 432
Unique Patients Referred: 389
Acceptance Rate: 87.0%

REFERRAL BY SPECIALTY:
1. Cardiology: 89 referrals (20.6%)
2. Orthopedics: 78 referrals (18.1%)
3. Neurology: 67 referrals (15.5%)
4. Gastroenterology: 56 referrals (13.0%)
5. Pulmonology: 45 referrals (10.4%)
6. Others: 97 referrals (22.4%)

REFERRAL OUTCOMES:
Accepted: 376 (87.0%)
Declined: 34 (7.9%)
Pending: 22 (5.1%)

WAITING TIMES:
Average Wait Time: 5.7 days
Urgent Referrals: 1.2 days
Routine Referrals: 7.8 days

REFERRAL SOURCES:
Primary Care Physicians: 345 (79.9%)
Emergency Department: 67 (15.5%)
Self-Referral: 20 (4.6%)

EMERGENCY REFERRALS:
Total Emergency Referrals: 67
Seen Within 24 Hours: 89.6%
Average Time to Seen: 4.3 hours
      `;

    case 'outcome':
      return `
PATIENT OUTCOME REPORTS SUMMARY

Total Cases Tracked: 2,847
Follow-up Completion Rate: 94.2%

OUTCOME DISTRIBUTION:
Fully Recovered: 2,221 patients (78.0%)
Significantly Improved: 513 patients (18.0%)
No Change: 114 patients (4.0%)
Deteriorated: 12 patients (0.4%)
Mortality: 14 patients (0.5%)

OUTCOMES BY CONDITION:
Hypertension:
- Controlled: 189/234 (80.8%)
- Improved: 34/234 (14.5%)
- Unchanged: 11/234 (4.7%)

Diabetes:
- Controlled: 145/189 (76.7%)
- Improved: 28/189 (14.8%)
- Unchanged: 16/189 (8.5%)

Respiratory Infections:
- Resolved: 134/156 (85.9%)
- Improved: 18/156 (11.5%)
- Unchanged: 4/156 (2.6%)

QUALITY OF LIFE INDICATORS:
Patient Satisfaction Score: 94/100
Functional Status Improvement: 87%
Return to Work/School: 78%
Readmission Rate (30 days): 3.2%

COMPLICATION RATES:
Treatment Complications: 23 (0.8%)
Hospital Acquired Infections: 12 (0.4%)
Medication Errors: 3 (0.1%)
      `;

    case 'demographics':
      return `
DEMOGRAPHICS & RISK STRATIFICATION REPORT SUMMARY

Total Patient Population: 2,847

AGE DISTRIBUTION:
0-18 years: 234 patients (8.2%)
19-45 years: 1,234 patients (43.3%)
46-65 years: 890 patients (31.3%)
65+ years: 489 patients (17.2%)

GENDER DISTRIBUTION:
Male: 1,423 patients (50.0%)
Female: 1,424 patients (50.0%)

RISK STRATIFICATION:
High Risk: 234 patients (8.2%)
- Chronic conditions: 156 patients
- Multiple comorbidities: 78 patients

Medium Risk: 891 patients (31.3%)
- Single chronic condition: 456 patients
- Lifestyle risk factors: 435 patients

Low Risk: 1,722 patients (60.5%)
- Generally healthy: 1,234 patients
- Minor health issues: 488 patients

SOCIOECONOMIC STATUS:
Low Income: 1,234 patients (43.3%)
Middle Income: 1,423 patients (50.0%)
High Income: 190 patients (6.7%)

EDUCATION LEVEL:
No Formal Education: 234 patients (8.2%)
Primary Education: 567 patients (19.9%)
Secondary Education: 1,234 patients (43.3%)
Higher Education: 812 patients (28.5%)

GEOGRAPHIC DISTRIBUTION:
Urban: 1,456 patients (51.1%)
Rural: 1,391 patients (48.9%)

HEALTH INSURANCE COVERAGE:
Insured: 1,892 patients (66.4%)
Uninsured: 955 patients (33.6%)
      `;

    default:
      return `Report content for ${reportId} is not available.`;
  }
}
