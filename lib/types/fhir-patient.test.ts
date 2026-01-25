/**
 * Unit Tests for FHIR Patient Types
 *
 * These tests validate the FHIR-compliant patient types and utility functions.
 * Run with: npx tsx lib/types/fhir-patient.test.ts
 */

import {
  FHIRPatient,
  SwasthyaOSPatient,
  createAadharIdentifier,
  createSwasthyaOSIdentifier,
  createABHAIdentifier,
  isFHIRCompliant,
  isSwasthyaOSPatient,
  getPrimaryName,
  getPrimaryPhone,
  calculateAge,
  formatIdentifier,
} from "./fhir-patient";

// Test counter
let testsPassed = 0;
let testsFailed = 0;

function assert(condition: boolean, message: string) {
  if (condition) {
    console.log(`✓ ${message}`);
    testsPassed++;
  } else {
    console.error(`✗ ${message}`);
    testsFailed++;
  }
}

function assertEquals(actual: any, expected: any, message: string) {
  const isEqual = JSON.stringify(actual) === JSON.stringify(expected);
  assert(isEqual, message);
  if (!isEqual) {
    console.error(`  Expected: ${JSON.stringify(expected)}`);
    console.error(`  Actual: ${JSON.stringify(actual)}`);
  }
}

console.log("Running FHIR Patient Type Tests...\n");

// ============================================================================
// Test 1: Basic FHIR Patient Creation
// ============================================================================
console.log("Test Suite 1: Basic FHIR Patient Creation");

const basicPatient: FHIRPatient = {
  resourceType: "Patient",
  id: "patient-001",
  active: true,
  name: [
    {
      use: "official",
      family: "Kumar",
      given: ["Rajesh"],
      text: "Rajesh Kumar",
    },
  ],
  gender: "male",
  birthDate: "1985-06-15",
};

assert(
  basicPatient.resourceType === "Patient",
  "Patient resource type is correct",
);
assert(basicPatient.id === "patient-001", "Patient ID is set correctly");
assert(basicPatient.active === true, "Patient is active");
assert(
  basicPatient.name?.[0]?.family === "Kumar",
  "Patient family name is correct",
);

// ============================================================================
// Test 2: FHIR Identifier Creation
// ============================================================================
console.log("\nTest Suite 2: FHIR Identifier Creation");

const aadharId = createAadharIdentifier("1234-5678-9012");
assert(
  aadharId.system === "https://uidai.gov.in",
  "Aadhar identifier system is correct",
);
assert(
  aadharId.value === "1234-5678-9012",
  "Aadhar identifier value is correct",
);
assert(aadharId.use === "official", "Aadhar identifier use is official");

const swasthyaOSId = createSwasthyaOSIdentifier("SOS-2024-001");
assert(
  swasthyaOSId.system === "https://swasthyaos.in/patient",
  "SwasthyaOS identifier system is correct",
);
assert(
  swasthyaOSId.value === "SOS-2024-001",
  "SwasthyaOS identifier value is correct",
);

const abhaId = createABHAIdentifier("12-3456-7890-1234");
assert(
  abhaId.system === "https://healthid.ndhm.gov.in",
  "ABHA identifier system is correct",
);
assert(
  abhaId.value === "12-3456-7890-1234",
  "ABHA identifier value is correct",
);

// ============================================================================
// Test 3: SwasthyaOS Patient with Extensions
// ============================================================================
console.log("\nTest Suite 3: SwasthyaOS Patient with Extensions");

const swasthyaOSPatient: SwasthyaOSPatient = {
  resourceType: "Patient",
  id: "patient-002",
  active: true,
  identifier: [
    createSwasthyaOSIdentifier("SOS-2024-002"),
    createAadharIdentifier("9876-5432-1098"),
  ],
  name: [
    {
      use: "official",
      family: "Devi",
      given: ["Lakshmi"],
      text: "Lakshmi Devi",
    },
  ],
  gender: "female",
  birthDate: "1990-03-20",
  telecom: [
    {
      system: "phone",
      value: "+91-9876543210",
      use: "mobile",
    },
  ],
  address: [
    {
      use: "home",
      type: "physical",
      line: ["Village Rampur"],
      city: "Rampur",
      district: "Sitapur",
      state: "Uttar Pradesh",
      postalCode: "261001",
      country: "India",
    },
  ],
  swasthyaOSExtensions: {
    aadharNumber: "9876-5432-1098",
    rationCardNumber: "UP-SIT-2024-12345",
    rationCardType: "BPL",
    primaryLanguage: "hi",
    secondaryLanguages: ["en"],
    ruralUrbanClassification: "rural",
    socioeconomicStatus: "below-poverty-line",
    educationLevel: "primary",
    occupation: "Farmer",
    insuranceInfo: {
      hasInsurance: true,
      schemes: [
        {
          schemeName: "Ayushman Bharat",
          schemeId: "AB-UP-2024-12345",
          validFrom: "2024-01-01",
          validTo: "2025-12-31",
        },
      ],
    },
    emergencyContact: {
      name: "Ramesh Devi",
      relationship: "Spouse",
      phone: "+91-9876543211",
    },
    dataConsent: {
      researchConsent: true,
      publicHealthConsent: true,
      aiTrainingConsent: true,
      consentDate: "2024-01-15",
      consentVersion: "1.0",
    },
  },
  confidenceMetrics: {
    overallConfidence: 95,
    demographicsConfidence: 100,
    medicalHistoryConfidence: 85,
    contactInfoConfidence: 100,
    identificationConfidence: 100,
    lastVerified: "2024-01-15T10:30:00Z",
    verifiedBy: "user-001",
    dataCompleteness: 90,
  },
};

assert(
  swasthyaOSPatient.swasthyaOSExtensions.primaryLanguage === "hi",
  "Primary language is Hindi",
);
assert(
  swasthyaOSPatient.swasthyaOSExtensions.ruralUrbanClassification === "rural",
  "Patient is from rural area",
);
assert(
  swasthyaOSPatient.swasthyaOSExtensions.rationCardType === "BPL",
  "Patient has BPL ration card",
);
assert(
  swasthyaOSPatient.swasthyaOSExtensions.insuranceInfo?.hasInsurance === true,
  "Patient has insurance",
);

// ============================================================================
// Test 4: Validation Functions
// ============================================================================
console.log("\nTest Suite 4: Validation Functions");

assert(isFHIRCompliant(basicPatient), "Basic patient is FHIR compliant");
assert(
  isFHIRCompliant(swasthyaOSPatient),
  "SwasthyaOS patient is FHIR compliant",
);
assert(
  !isFHIRCompliant({ resourceType: "Observation" }),
  "Non-patient resource is not FHIR patient compliant",
);
assert(!isFHIRCompliant({}), "Empty object is not FHIR compliant");

assert(
  isSwasthyaOSPatient(swasthyaOSPatient),
  "SwasthyaOS patient is recognized",
);
assert(
  !isSwasthyaOSPatient(basicPatient),
  "Basic FHIR patient is not SwasthyaOS patient",
);

// ============================================================================
// Test 5: Utility Functions
// ============================================================================
console.log("\nTest Suite 5: Utility Functions");

const name1 = getPrimaryName(basicPatient);
assertEquals(
  name1,
  "Rajesh Kumar",
  "Primary name extraction works with text field",
);

const name2 = getPrimaryName(swasthyaOSPatient);
assertEquals(
  name2,
  "Lakshmi Devi",
  "Primary name extraction works for SwasthyaOS patient",
);

const phone = getPrimaryPhone(swasthyaOSPatient);
assertEquals(phone, "+91-9876543210", "Primary phone extraction works");

const noPhone = getPrimaryPhone(basicPatient);
assertEquals(noPhone, undefined, "Returns undefined when no phone available");

const age = calculateAge("1985-06-15");
const currentYear = new Date().getFullYear();
const expectedAge = currentYear - 1985;
assert(
  age !== undefined && age >= expectedAge - 1 && age <= expectedAge,
  "Age calculation is correct",
);

const formattedId = formatIdentifier(aadharId);
assert(
  formattedId.includes("1234-5678-9012"),
  "Identifier formatting includes value",
);

// ============================================================================
// Test 6: Clinical Event Structure
// ============================================================================
console.log("\nTest Suite 6: Clinical Event Structure");

const clinicalEvent = {
  id: "event-001",
  timestamp: "2024-01-15T14:30:00Z",
  type: "consultation" as const,
  title: "General Checkup",
  description: "Routine health checkup",
  data: {
    chiefComplaint: "Fever and cough",
    vitals: {
      temperature: 101.5,
      bloodPressure: "120/80",
      heartRate: 78,
    },
  },
  confidence: 95,
  source: "manual" as const,
  providerId: "doctor-001",
  facilityId: "phc-001",
};

assert(clinicalEvent.type === "consultation", "Clinical event type is correct");
assert(clinicalEvent.confidence === 95, "Clinical event confidence is set");
assert(clinicalEvent.source === "manual", "Clinical event source is manual");

// ============================================================================
// Test 7: Patient Risk Profile
// ============================================================================
console.log("\nTest Suite 7: Patient Risk Profile");

const riskProfile = {
  overallRiskScore: 65,
  riskCategory: "medium" as const,
  riskFactors: [
    {
      factor: "Diabetes",
      severity: "medium" as const,
      confidence: 90,
      source: "medical-history",
      identifiedDate: "2023-06-01",
    },
    {
      factor: "Hypertension",
      severity: "high" as const,
      confidence: 95,
      source: "recent-consultation",
      identifiedDate: "2024-01-10",
    },
  ],
  chronicConditions: ["Type 2 Diabetes", "Hypertension"],
  recentHospitalizations: 1,
  medicationAdherence: 75,
  socialDeterminantsScore: 60,
  lastAssessment: "2024-01-15T10:00:00Z",
  nextAssessmentDue: "2024-04-15T10:00:00Z",
};

assert(riskProfile.overallRiskScore === 65, "Risk score is set correctly");
assert(riskProfile.riskCategory === "medium", "Risk category is medium");
assert(riskProfile.riskFactors.length === 2, "Two risk factors are present");
assert(
  riskProfile.chronicConditions?.length === 2,
  "Two chronic conditions are listed",
);

// ============================================================================
// Test 8: Access Log Entry
// ============================================================================
console.log("\nTest Suite 8: Access Log Entry");

const accessLog = {
  timestamp: "2024-01-15T14:30:00Z",
  userId: "user-001",
  userName: "Dr. Sharma",
  userRole: "doctor",
  action: "view" as const,
  resourceType: "Patient",
  resourceId: "patient-002",
  ipAddress: "192.168.1.100",
  deviceInfo: "Chrome/Windows",
  purpose: "Consultation",
  dataAccessed: ["demographics", "medicalHistory", "vitals"],
};

assert(accessLog.action === "view", "Access log action is view");
assert(accessLog.userRole === "doctor", "Access log user role is doctor");
assert(accessLog.dataAccessed?.length === 3, "Three data fields were accessed");

// ============================================================================
// Test 9: Patient Data Confidence
// ============================================================================
console.log("\nTest Suite 9: Patient Data Confidence");

const confidence = {
  overallConfidence: 85,
  demographicsConfidence: 95,
  medicalHistoryConfidence: 75,
  contactInfoConfidence: 90,
  identificationConfidence: 100,
  lastVerified: "2024-01-15T10:30:00Z",
  verifiedBy: "user-001",
  dataCompleteness: 80,
  missingCriticalFields: ["allergies", "emergencyContact"],
};

assert(confidence.overallConfidence === 85, "Overall confidence is 85%");
assert(
  confidence.identificationConfidence === 100,
  "Identification confidence is 100%",
);
assert(
  confidence.missingCriticalFields?.length === 2,
  "Two critical fields are missing",
);

// ============================================================================
// Test 10: Complex Patient with Full Data
// ============================================================================
console.log("\nTest Suite 10: Complex Patient with Full Data");

const complexPatient: SwasthyaOSPatient = {
  resourceType: "Patient",
  id: "patient-003",
  meta: {
    versionId: "1",
    lastUpdated: "2024-01-15T10:00:00Z",
    profile: [
      "https://swasthyaos.in/fhir/StructureDefinition/SwasthyaOSPatient",
    ],
  },
  active: true,
  identifier: [
    createSwasthyaOSIdentifier("SOS-2024-003"),
    createAadharIdentifier("1111-2222-3333"),
    createABHAIdentifier("12-3456-7890-1234"),
  ],
  name: [
    {
      use: "official",
      family: "Singh",
      given: ["Amit", "Kumar"],
      prefix: ["Mr."],
      text: "Mr. Amit Kumar Singh",
    },
  ],
  telecom: [
    {
      system: "phone",
      value: "+91-9999888877",
      use: "mobile",
      rank: 1,
    },
    {
      system: "email",
      value: "amit.singh@example.com",
      use: "home",
    },
  ],
  gender: "male",
  birthDate: "1980-12-25",
  address: [
    {
      use: "home",
      type: "physical",
      line: ["House No. 123", "Sector 15"],
      city: "Noida",
      district: "Gautam Buddha Nagar",
      state: "Uttar Pradesh",
      postalCode: "201301",
      country: "India",
    },
  ],
  maritalStatus: {
    coding: [
      {
        system: "http://terminology.hl7.org/CodeSystem/v3-MaritalStatus",
        code: "M",
        display: "Married",
      },
    ],
  },
  contact: [
    {
      relationship: [
        {
          coding: [
            {
              system: "http://terminology.hl7.org/CodeSystem/v2-0131",
              code: "C",
              display: "Emergency Contact",
            },
          ],
        },
      ],
      name: {
        text: "Priya Singh",
      },
      telecom: [
        {
          system: "phone",
          value: "+91-9999888866",
          use: "mobile",
        },
      ],
    },
  ],
  communication: [
    {
      language: {
        coding: [
          {
            system: "urn:ietf:bcp:47",
            code: "hi",
            display: "Hindi",
          },
        ],
      },
      preferred: true,
    },
    {
      language: {
        coding: [
          {
            system: "urn:ietf:bcp:47",
            code: "en",
            display: "English",
          },
        ],
      },
      preferred: false,
    },
  ],
  swasthyaOSExtensions: {
    aadharNumber: "1111-2222-3333",
    rationCardNumber: "UP-GBN-2024-54321",
    rationCardType: "APL",
    primaryLanguage: "hi",
    secondaryLanguages: ["en"],
    ruralUrbanClassification: "urban",
    socioeconomicStatus: "middle-income",
    educationLevel: "graduate",
    occupation: "Software Engineer",
    religion: "Hindu",
    casteCategory: "general",
    disabilityStatus: {
      hasDisability: false,
    },
    insuranceInfo: {
      hasInsurance: true,
      schemes: [
        {
          schemeName: "Corporate Health Insurance",
          schemeId: "CHI-2024-12345",
          validFrom: "2024-01-01",
          validTo: "2024-12-31",
        },
        {
          schemeName: "Ayushman Bharat",
          schemeId: "AB-UP-2024-54321",
          validFrom: "2024-01-01",
          validTo: "2025-12-31",
        },
      ],
    },
    emergencyContact: {
      name: "Priya Singh",
      relationship: "Spouse",
      phone: "+91-9999888866",
      alternatePhone: "+91-9999888855",
    },
    dataConsent: {
      researchConsent: true,
      publicHealthConsent: true,
      aiTrainingConsent: false,
      consentDate: "2024-01-10",
      consentVersion: "1.0",
    },
  },
  timeline: [
    {
      id: "event-001",
      timestamp: "2024-01-10T09:00:00Z",
      type: "consultation",
      title: "Annual Health Checkup",
      description: "Routine annual physical examination",
      data: {
        vitals: {
          temperature: 98.6,
          bloodPressure: "120/80",
          heartRate: 72,
          weight: 75,
          height: 175,
        },
      },
      confidence: 100,
      source: "manual",
      providerId: "doctor-001",
      facilityId: "hospital-001",
    },
  ],
  confidenceMetrics: {
    overallConfidence: 98,
    demographicsConfidence: 100,
    medicalHistoryConfidence: 95,
    contactInfoConfidence: 100,
    identificationConfidence: 100,
    lastVerified: "2024-01-10T09:00:00Z",
    verifiedBy: "user-001",
    dataCompleteness: 95,
  },
  riskProfile: {
    overallRiskScore: 25,
    riskCategory: "low",
    riskFactors: [],
    chronicConditions: [],
    recentHospitalizations: 0,
    medicationAdherence: 100,
    socialDeterminantsScore: 85,
    lastAssessment: "2024-01-10T09:00:00Z",
    nextAssessmentDue: "2025-01-10T09:00:00Z",
  },
  tags: ["annual-checkup", "corporate-insurance", "urban-patient"],
};

assert(
  complexPatient.identifier?.length === 3,
  "Complex patient has 3 identifiers",
);
assert(
  complexPatient.communication?.length === 2,
  "Complex patient has 2 communication languages",
);
assert(
  complexPatient.swasthyaOSExtensions.insuranceInfo?.schemes?.length === 2,
  "Complex patient has 2 insurance schemes",
);
assert(
  complexPatient.timeline?.length === 1,
  "Complex patient has 1 clinical event",
);
assert(complexPatient.tags?.length === 3, "Complex patient has 3 tags");
assert(
  isSwasthyaOSPatient(complexPatient),
  "Complex patient is valid SwasthyaOS patient",
);

// ============================================================================
// Test Summary
// ============================================================================
console.log("\n" + "=".repeat(60));
console.log("Test Summary");
console.log("=".repeat(60));
console.log(`Total Tests: ${testsPassed + testsFailed}`);
console.log(`Passed: ${testsPassed}`);
console.log(`Failed: ${testsFailed}`);
console.log("=".repeat(60));

if (testsFailed === 0) {
  console.log("\n✓ All tests passed!");
  process.exit(0);
} else {
  console.error(`\n✗ ${testsFailed} test(s) failed!`);
  process.exit(1);
}
