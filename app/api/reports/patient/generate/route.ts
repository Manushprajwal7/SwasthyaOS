import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { reportId, reportTitle, dateRange } = await request.json();
    
    // Generate report content based on report type
    const reportContent = generateReportContent(reportId, reportTitle, dateRange);
    
    return NextResponse.json({ 
      success: true,
      message: `${reportTitle} generated successfully`,
      reportId,
      data: reportContent
    });
  } catch (error) {
    console.error('Generate patient report error:', error);
    return NextResponse.json({ error: 'Failed to generate report' }, { status: 500 });
  }
}

function generateReportContent(reportId: string, reportTitle: string, dateRange: any) {
  const baseContent = {
    title: reportTitle,
    dateRange: `${dateRange.start} to ${dateRange.end}`,
    generatedOn: new Date().toLocaleString(),
    reportId
  };

  switch (reportId) {
    case 'individual':
      return {
        ...baseContent,
        totalPatients: 2847,
        totalConsultations: 5124,
        averageConsultationsPerPatient: 1.8,
        topDiagnoses: ['Hypertension', 'Diabetes', 'Respiratory Infections'],
        demographics: {
          ageGroups: { '0-18': 234, '19-45': 1234, '46-65': 890, '65+': 489 },
          gender: { male: 1423, female: 1424 }
        }
      };

    case 'followup':
      return {
        ...baseContent,
        completed: 1923,
        pending: 287,
        overdue: 45,
        completionRate: '67.5%',
        averageFollowUpTime: '3.2 days',
        riskCategories: { high: 45, medium: 123, low: 119 }
      };

    case 'prescription':
      return {
        ...baseContent,
        totalPrescriptions: 3421,
        adherenceRate: '91%',
        topMedications: ['Paracetamol', 'Amoxicillin', 'Metformin'],
        sideEffectsReported: 156,
        drugInteractions: 23
      };

    case 'referral':
      return {
        ...baseContent,
        totalReferrals: 432,
        acceptanceRate: '87%',
        topSpecialties: ['Cardiology', 'Orthopedics', 'Neurology'],
        averageWaitTime: '5.7 days',
        emergencyReferrals: 67
      };

    case 'outcome':
      return {
        ...baseContent,
        recovered: '78%',
        improved: '18%',
        unchanged: '4%',
        mortality: '0.5%',
        readmissionRate: '3.2%',
        patientSatisfaction: '94%'
      };

    case 'demographics':
      return {
        ...baseContent,
        totalPatients: 2847,
        riskStratification: { high: 234, medium: 891, low: 1722 },
        comorbidities: ['Hypertension', 'Diabetes', 'Asthma'],
        socioeconomicStatus: { low: 1234, middle: 1423, high: 190 }
      };

    default:
      return baseContent;
  }
}
