import { NextRequest, NextResponse } from 'next/server';
import { generatePDFReport, PDFReportData } from '@/lib/pdf-generator';

export async function POST(request: NextRequest) {
  try {
    const { reportTitle, dateRange } = await request.json();
    
    // Generate PDF content for epidemiological report
    const reportContent = getEpidemiologicalReportContent(reportTitle);
    
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
    console.error('Export epidemiological report error:', error);
    return NextResponse.json({ error: 'Failed to export report' }, { status: 500 });
  }
}

function getEpidemiologicalReportContent(reportTitle: string): string {
  switch (reportTitle) {
    case 'Syndrome Surveillance Report':
      return `
SYNDROME SURVEILLANCE SUMMARY
Reporting Period: Weekly Analysis
Total Syndromic Events: 479

KEY SYNDROMES TRACKED:

1. INFLUENZA-LIKE ILLNESS (ILI)
   Cases This Week: 156
   Change from Previous Week: +12%
   Age Distribution:
   - 0-4 years: 34 cases (21.8%)
   - 5-17 years: 45 cases (28.8%)
   - 18-64 years: 56 cases (35.9%)
   - 65+ years: 21 cases (13.5%)

2. GASTROENTERITIS
   Cases This Week: 89
   Change from Previous Week: -5%
   Symptoms Distribution:
   - Diarrhea: 89 cases (100%)
   - Vomiting: 67 cases (75.3%)
   - Fever: 34 cases (38.2%)
   - Dehydration: 12 cases (13.5%)

3. RESPIRATORY INFECTIONS (NON-ILI)
   Cases This Week: 234
   Change from Previous Week: +8%
   Severity Classification:
   - Mild: 189 cases (80.8%)
   - Moderate: 39 cases (16.7%)
   - Severe: 6 cases (2.6%)

SPATIAL DISTRIBUTION:
- Urban Areas: 312 cases (65.1%)
- Rural Areas: 167 cases (34.9%)

TEMPORAL TRENDS:
- Peak Day: Wednesday (89 cases)
- Lowest Day: Sunday (45 cases)
- Weekly Average: 68 cases/day

ALERT THRESHOLDS:
- ILI: Below alert threshold
- Gastroenteritis: Below alert threshold
- Respiratory: Below alert threshold
      `;

    case 'Disease Incidence Analysis':
      return `
DISEASE INCIDENCE ANALYSIS
Period: Monthly Analysis
Total Notifiable Diseases: 135 cases

1. MALARIA
   New Cases: 45
   Incidence Rate: 2.3 per 1,000 population
   Change from Last Month: +8%
   Species Distribution:
   - P. falciparum: 23 cases (51.1%)
   - P. vivax: 18 cases (40.0%)
   - P. malariae: 4 cases (8.9%)

2. DENGUE
   New Cases: 23
   Incidence Rate: 1.2 per 1,000 population
   Change from Last Month: -15%
   Severity:
   - Dengue Fever: 19 cases (82.6%)
   - Dengue Hemorrhagic Fever: 4 cases (17.4%)

3. TYPHOID FEVER
   New Cases: 67
   Incidence Rate: 3.4 per 1,000 population
   Change from Last Month: +22%
   Age Groups Affected:
   - 5-15 years: 34 cases (50.7%)
   - 16-45 years: 23 cases (34.3%)
   - 46+ years: 10 cases (14.9%)

GEOGRAPHIC HOTSPOTS:
- District North: Malaria cluster (23 cases)
- District South: Typhoid cluster (34 cases)
- District East: Dengue cases concentrated (15 cases)

RISK FACTORS IDENTIFIED:
- Stagnant water sources: 45 locations
- Food handling practices: 23 establishments
- Vector breeding sites: 67 locations
      `;

    case 'Outbreak Investigation Reports':
      return `
OUTBREAK INVESTIGATION SUMMARY
Active Outbreaks Under Investigation: 2

OUTBREAK #1: ACUTE GASTROENTERITIS
Location: Village North, District Central
Date Started: December 10, 2024
Cases Identified: 89
Age Groups Affected:
- 0-5 years: 34 cases (38.2%)
- 6-18 years: 23 cases (25.8%)
- 19+ years: 32 cases (36.0%)

Clinical Features:
- Diarrhea: 89 cases (100%)
- Vomiting: 67 cases (75.3%)
- Fever: 45 cases (50.6%)
- Dehydration: 12 cases (13.5%)

Laboratory Results:
- Stool samples tested: 45
- Positive for Rotavirus: 23 (51.1%)
- Positive for E. coli: 12 (26.7%)
- Negative: 10 (22.2%)

Control Measures Implemented:
- Water purification: 3 water sources treated
- Health education: 5 community sessions
- Medical camps: 2 mobile clinics deployed
- Surveillance: Active case finding ongoing

Attack Rate: 3.2%
Case Fatality Rate: 0%
Reproduction Number (R₀): 1.8

OUTBREAK #2: MEASLES
Location: Urban Slum Area, District West
Date Started: December 15, 2024
Cases Identified: 67
Vaccination Status:
- Unvaccinated: 45 cases (67.2%)
- Partially vaccinated: 15 cases (22.4%)
- Fully vaccinated: 7 cases (10.4%)

Age Distribution:
- 6-11 months: 12 cases (17.9%)
- 1-5 years: 45 cases (67.2%)
- 6+ years: 10 cases (14.9%)

Complications:
- Pneumonia: 8 cases (11.9%)
- Encephalitis: 2 cases (3.0%)
- Deaths: 2 cases (3.0%)

Response Activities:
- Vaccination campaign: 234 children vaccinated
- Case isolation: 45 cases isolated
- Contact tracing: 234 contacts identified
- Vitamin A distribution: 156 children covered
      `;

    case 'Vaccination Campaign Reports':
      return `
VACCINATION CAMPAIGN PERFORMANCE REPORT
Campaign Period: December 1-31, 2024
Target Population: 5,000 children

OVERALL PERFORMANCE:
Total Children Vaccinated: 4,287
Coverage Rate: 92.3%
Children Not Vaccinated: 713 (14.3%)

VACCINES ADMINISTERED:
1. BCG (Tuberculosis): 456 doses
2. OPV (Polio): 1,234 doses
3. DPT-HepB-Hib: 1,456 doses
4. Measles: 890 doses
5. Vitamin A: 1,234 doses

AGE-SPECIFIC COVERAGE:
- 0-11 months: 89.2%
- 12-23 months: 94.5%
- 24-59 months: 91.8%

GEOGRAPHIC COVERAGE:
- Urban Areas: 95.6%
- Rural Areas: 88.9%
- Hard-to-Reach Areas: 76.3%

ADVERSE EVENTS FOLLOWING IMMUNIZATION (AEFI):
Total AEFI Cases: 12
Severity Classification:
- Mild: 10 cases (83.3%)
- Moderate: 2 cases (16.7%)
- Severe: 0 cases (0%)
- Deaths: 0 cases

Most Common AEFIs:
- Fever: 8 cases (66.7%)
- Local Swelling: 6 cases (50.0%)
- Irritability: 4 cases (33.3%)

COLD CHAIN MONITORING:
- Temperature Excursions: 0
- Equipment Functionality: 100%
- Vaccine Wastage: 2.3%

LOGISTICS:
- Vaccine Supply: Adequate
- Syringe Availability: Adequate
- Safety Box Availability: Adequate
- Waste Management: Compliant

CHALLENGES IDENTIFIED:
- Hard-to-reach population access
- Vaccine hesitancy in certain communities
- Transportation difficulties during rainy season

SUCCESS FACTORS:
- Strong community engagement
- Effective social mobilization
- Adequate funding and resources
- Trained healthcare workers
      `;

    case 'Antimicrobial Resistance Surveillance':
      return `
ANTIMICROBIAL RESISTANCE SURVEILLANCE REPORT
Period: Quarterly Analysis (Q4 2024)
Total Isolates Tested: 1,234

OVERALL RESISTANCE TRENDS:
Overall Susceptibility Rate: 78%
Overall Resistance Rate: 22%
Emerging Resistance Patterns: 3 new strains

KEY PATHOGENS AND RESISTANCE:

1. STAPHYLOCOCCUS AUREUS
   Total Isolates: 234
   MRSA Prevalence: 34%
   Antibiotic Susceptibility:
   - Penicillin: 15% susceptible
   - Oxacillin: 66% susceptible
   - Vancomycin: 99% susceptible
   - Clindamycin: 78% susceptible

2. ESCHERICHIA COLI
   Total Isolates: 345
   ESBL Producers: 45%
   Antibiotic Susceptibility:
   - Amoxicillin: 12% susceptible
   - Ceftriaxone: 55% susceptible
   - Ciprofloxacin: 67% susceptible
   - Nitrofurantoin: 89% susceptible

3. KLEBSIELLA PNEUMONIAE
   Total Isolates: 156
   Carbapenem Resistance: 12%
   Antibiotic Susceptibility:
   - Imipenem: 88% susceptible
   - Meropenem: 87% susceptible
   - Piperacillin-tazobactam: 67% susceptible
   - Gentamicin: 78% susceptible

4. PSEUDOMONAS AERUGINOSA
   Total Isolates: 123
   Multi-drug Resistant: 23%
   Antibiotic Susceptibility:
   - Ceftazidime: 67% susceptible
   - Cefepime: 71% susceptible
   - Piperacillin-tazobactam: 72% susceptible
   - Carbapenems: 89% susceptible

RESISTANCE BY SPECIMEN TYPE:
- Blood cultures: 34% resistance
- Urine cultures: 19% resistance
- Wound cultures: 28% resistance
- Respiratory cultures: 25% resistance

EMERGING RESISTANCE CONCERNS:
1. Carbapenem-resistant Enterobacteriaceae (CRE)
   - 12 isolates identified
   - 67% mortality rate

2. Vancomycin-resistant Enterococci (VRE)
   - 8 isolates identified
   - All from urinary specimens

3. Extended-spectrum beta-lactamase (ESBL) E. coli
   - 156 isolates identified
   - 45% increase from previous quarter

ANTIBIOTIC CONSUMPTION PATTERNS:
Total DDD/1000 patient-days: 89.5
Most Consumed:
1. Amoxicillin-clavulanate: 23.4 DDD
2. Ciprofloxacin: 18.7 DDD
3. Ceftriaxone: 15.6 DDD

RECOMMENDATIONS:
- Strengthen antibiotic stewardship
- Enhance laboratory capacity
- Implement infection control measures
- Monitor antibiotic consumption
- Conduct regular susceptibility testing
      `;

    case 'Environmental Health Reports':
      return `
ENVIRONMENTAL HEALTH SURVEILLANCE REPORT
Period: Monthly Analysis (December 2024)
Total Inspections Conducted: 156

WATER QUALITY MONITORING:
Water Sources Tested: 89
Compliance Rate: 94%
Parameters Monitored:
- pH Level: 94% compliant
- Turbidity: 96% compliant
- Residual Chlorine: 92% compliant
- Coliform Bacteria: 95% compliant

Non-Compliant Sources: 5
Issues Identified:
- Insufficient chlorination: 3 sources
- Bacterial contamination: 2 sources
Corrective Actions: All sources treated and re-tested

AIR QUALITY ASSESSMENT:
Monitoring Stations: 12
Average Air Quality Index (AQI): 45 (Good)
PM2.5 Levels: 12-35 μg/m³
PM10 Levels: 25-68 μg/m³
NO2 Levels: 15-45 ppb
SO2 Levels: 8-25 ppb

Trend Analysis:
- Improvement from previous month (AQI: 52)
- Contributing factors: Reduced industrial activity
- Seasonal impact: Lower pollution due to rainfall

SANITATION FACILITIES:
Facilities Inspected: 234
Compliance Rate: 87%
Issues Identified:
- Poor waste management: 23 facilities
- Inadequate handwashing facilities: 12 facilities
- Improper sewage disposal: 8 facilities

FOOD SAFETY INSPECTIONS:
Food Establishments Inspected: 67
Compliance Rate: 91%
Violations Found:
- Temperature control issues: 8 establishments
- Poor hygiene practices: 5 establishments
- Pest infestation: 2 establishments

VECTOR CONTROL ACTIVITIES:
Areas Treated: 45
Larvicidal Operations: 234 sites
Adulticidal Operations: 67 sites
Breeding Sites Destroyed: 156

Disease Vectors Monitored:
- Mosquitoes: Density reduced by 45%
- Flies: Density reduced by 32%
- Rodents: Activity reduced by 28%

ENVIRONMENTAL INCIDENTS:
Total Incidents: 12
Chemical Spills: 3
Water Contamination: 5
Air Pollution Events: 4

Response Time:
- Average response time: 2.3 hours
- All incidents resolved within 24 hours

CLIMATE AND HEALTH IMPACT:
Temperature Anomalies: +1.2°C above average
Rainfall: 23% above normal
Flood Events: 2 minor floods
Health Impacts:
- Waterborne diseases: 23 cases
- Respiratory illnesses: 45 cases
- Vector-borne diseases: 12 cases

RECOMMENDATIONS:
1. Strengthen water quality monitoring
2. Improve air quality surveillance
3. Enhance food safety enforcement
4. Scale up vector control measures
5. Develop climate adaptation strategies
6. Strengthen emergency response capacity
      `;

    default:
      return `Report content for ${reportTitle} is not available.`;
  }
}
