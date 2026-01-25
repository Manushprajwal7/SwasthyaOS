# SwasthyaOS FHIR-Compliant Patient Types

This directory contains FHIR R4-compliant type definitions for SwasthyaOS, with extensions specific to the Indian healthcare context.

## Overview

The patient types in this module follow the [FHIR R4 Patient Resource specification](https://www.hl7.org/fhir/patient.html) while adding SwasthyaOS-specific extensions to support Indian healthcare delivery requirements.

## Key Features

- **FHIR R4 Compliance**: Full compliance with FHIR R4 Patient Resource specification
- **Indian Healthcare Context**: Extensions for Aadhar, ration cards, ABHA, and regional identifiers
- **Multi-Language Support**: Built-in support for 8 Indian languages
- **Rural/Urban Classification**: Specific fields for rural healthcare delivery
- **Insurance Integration**: Support for Ayushman Bharat and other Indian health schemes
- **Confidence Scoring**: Data quality and confidence metrics for all patient information
- **Audit Trail**: Complete access logging for compliance and security
- **Risk Stratification**: Patient risk profiling for proactive care

## Core Types

### FHIRPatient

The base FHIR R4 Patient resource with all standard fields:

```typescript
import { FHIRPatient } from "@/lib/types";

const patient: FHIRPatient = {
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
  telecom: [
    {
      system: "phone",
      value: "+91-9876543210",
      use: "mobile",
    },
  ],
};
```

### SwasthyaOSPatient

Extended patient type with Indian healthcare context:

```typescript
import { SwasthyaOSPatient } from "@/lib/types";

const patient: SwasthyaOSPatient = {
  resourceType: "Patient",
  id: "patient-002",
  active: true,
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

  // SwasthyaOS-specific extensions
  swasthyaOSExtensions: {
    aadharNumber: "1234-5678-9012",
    rationCardNumber: "UP-SIT-2024-12345",
    rationCardType: "BPL",
    primaryLanguage: "hi",
    ruralUrbanClassification: "rural",
    socioeconomicStatus: "below-poverty-line",
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
    dataConsent: {
      researchConsent: true,
      publicHealthConsent: true,
      aiTrainingConsent: true,
      consentDate: "2024-01-15",
      consentVersion: "1.0",
    },
  },

  // Confidence metrics
  confidenceMetrics: {
    overallConfidence: 95,
    demographicsConfidence: 100,
    medicalHistoryConfidence: 85,
    contactInfoConfidence: 100,
    identificationConfidence: 100,
    dataCompleteness: 90,
  },
};
```

## Identifier Helpers

Utility functions for creating standard identifiers:

```typescript
import {
  createAadharIdentifier,
  createSwasthyaOSIdentifier,
  createABHAIdentifier,
} from "@/lib/types";

// Aadhar identifier
const aadharId = createAadharIdentifier("1234-5678-9012");

// SwasthyaOS internal ID
const sosId = createSwasthyaOSIdentifier("SOS-2024-001");

// Ayushman Bharat Health Account
const abhaId = createABHAIdentifier("12-3456-7890-1234");

// Use in patient record
const patient: FHIRPatient = {
  resourceType: "Patient",
  identifier: [sosId, aadharId, abhaId],
  // ... other fields
};
```

## Validation Functions

Type guards and validation utilities:

```typescript
import {
  isFHIRCompliant,
  isSwasthyaOSPatient,
  getPrimaryName,
  getPrimaryPhone,
  calculateAge,
} from "@/lib/types";

// Check FHIR compliance
if (isFHIRCompliant(patientData)) {
  console.log("Valid FHIR patient");
}

// Check SwasthyaOS patient
if (isSwasthyaOSPatient(patientData)) {
  console.log("Valid SwasthyaOS patient with extensions");
}

// Extract primary name
const name = getPrimaryName(patient); // "Rajesh Kumar"

// Extract primary phone
const phone = getPrimaryPhone(patient); // "+91-9876543210"

// Calculate age
const age = calculateAge("1985-06-15"); // 38 (as of 2024)
```

## Clinical Events

Track patient clinical history:

```typescript
import { ClinicalEvent } from "@/lib/types";

const consultation: ClinicalEvent = {
  id: "event-001",
  timestamp: "2024-01-15T14:30:00Z",
  type: "consultation",
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
  source: "manual",
  providerId: "doctor-001",
  facilityId: "phc-001",
};

// Add to patient timeline
patient.timeline = [consultation];
```

## Risk Profiling

Patient risk stratification:

```typescript
import { PatientRiskProfile } from "@/lib/types";

const riskProfile: PatientRiskProfile = {
  overallRiskScore: 65,
  riskCategory: "medium",
  riskFactors: [
    {
      factor: "Diabetes",
      severity: "medium",
      confidence: 90,
      source: "medical-history",
      identifiedDate: "2023-06-01",
    },
    {
      factor: "Hypertension",
      severity: "high",
      confidence: 95,
      source: "recent-consultation",
      identifiedDate: "2024-01-10",
    },
  ],
  chronicConditions: ["Type 2 Diabetes", "Hypertension"],
  medicationAdherence: 75,
  lastAssessment: "2024-01-15T10:00:00Z",
};

patient.riskProfile = riskProfile;
```

## Audit Logging

Track all patient data access:

```typescript
import { AccessLogEntry } from "@/lib/types";

const accessLog: AccessLogEntry = {
  timestamp: "2024-01-15T14:30:00Z",
  userId: "user-001",
  userName: "Dr. Sharma",
  userRole: "doctor",
  action: "view",
  resourceType: "Patient",
  resourceId: "patient-002",
  ipAddress: "192.168.1.100",
  purpose: "Consultation",
  dataAccessed: ["demographics", "medicalHistory", "vitals"],
};

patient.accessLog = [accessLog];
```

## Data Confidence Metrics

Track data quality and completeness:

```typescript
import { PatientDataConfidence } from "@/lib/types";

const confidence: PatientDataConfidence = {
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

patient.confidenceMetrics = confidence;
```

## Indian Healthcare Extensions

### Aadhar Integration

```typescript
swasthyaOSExtensions: {
  aadharNumber: "1234-5678-9012",
  // ... other fields
}
```

### Ration Card Information

```typescript
swasthyaOSExtensions: {
  rationCardNumber: "UP-SIT-2024-12345",
  rationCardType: "BPL", // APL, BPL, AAY, other
  // ... other fields
}
```

### Language Preferences

```typescript
swasthyaOSExtensions: {
  primaryLanguage: "hi", // Hindi
  secondaryLanguages: ["en", "kn"], // English, Kannada
  // ... other fields
}
```

### Rural/Urban Classification

```typescript
swasthyaOSExtensions: {
  ruralUrbanClassification: "rural", // rural, urban, semi-urban
  assignedPHC: {
    reference: "Organization/phc-001",
    display: "Rampur Primary Health Center"
  },
  assignedASHA: {
    reference: "Practitioner/asha-001",
    display: "Sunita Devi"
  },
  // ... other fields
}
```

### Insurance Schemes

```typescript
swasthyaOSExtensions: {
  insuranceInfo: {
    hasInsurance: true,
    schemes: [
      {
        schemeName: "Ayushman Bharat",
        schemeId: "AB-UP-2024-12345",
        validFrom: "2024-01-01",
        validTo: "2025-12-31"
      },
      {
        schemeName: "CGHS",
        schemeId: "CGHS-2024-67890",
        validFrom: "2024-01-01",
        validTo: "2024-12-31"
      }
    ]
  },
  // ... other fields
}
```

### Disability Information

```typescript
swasthyaOSExtensions: {
  disabilityStatus: {
    hasDisability: true,
    disabilityType: ["Visual Impairment"],
    disabilityPercentage: 40,
    udidNumber: "UDID-1234567890"
  },
  // ... other fields
}
```

### Data Consent

```typescript
swasthyaOSExtensions: {
  dataConsent: {
    researchConsent: true,
    publicHealthConsent: true,
    aiTrainingConsent: false,
    consentDate: "2024-01-15",
    consentVersion: "1.0"
  },
  // ... other fields
}
```

## Best Practices

### 1. Always Use Type Guards

```typescript
// Good
if (isSwasthyaOSPatient(patient)) {
  const language = patient.swasthyaOSExtensions.primaryLanguage;
}

// Bad - may cause runtime errors
const language = patient.swasthyaOSExtensions.primaryLanguage;
```

### 2. Maintain Confidence Scores

```typescript
// Always update confidence metrics when modifying patient data
patient.confidenceMetrics = {
  ...patient.confidenceMetrics,
  lastVerified: new Date().toISOString(),
  verifiedBy: currentUserId,
};
```

### 3. Log All Access

```typescript
// Always log when accessing patient data
const newAccessLog: AccessLogEntry = {
  timestamp: new Date().toISOString(),
  userId: currentUser.id,
  userName: currentUser.name,
  userRole: currentUser.role,
  action: "view",
  resourceType: "Patient",
  resourceId: patient.id,
  dataAccessed: ["demographics", "vitals"],
};

patient.accessLog = [...(patient.accessLog || []), newAccessLog];
```

### 4. Use Standard Identifiers

```typescript
// Good - use helper functions
const identifiers = [
  createSwasthyaOSIdentifier(patientId),
  createAadharIdentifier(aadharNumber),
];

// Bad - manual creation prone to errors
const identifiers = [
  {
    system: "https://swasthyaos.in/patient",
    value: patientId,
  },
];
```

### 5. Validate Required Extensions

```typescript
// Ensure required SwasthyaOS extensions are present
function validateSwasthyaOSPatient(patient: SwasthyaOSPatient): boolean {
  return !!(
    patient.swasthyaOSExtensions &&
    patient.swasthyaOSExtensions.primaryLanguage &&
    patient.swasthyaOSExtensions.ruralUrbanClassification &&
    patient.swasthyaOSExtensions.dataConsent
  );
}
```

## Testing

Run the test suite:

```bash
# Install tsx if not already installed
npm install -D tsx

# Run tests
npx tsx lib/types/fhir-patient.test.ts
```

## Compliance

These types ensure compliance with:

- **FHIR R4**: Full compliance with HL7 FHIR R4 Patient Resource
- **Indian Healthcare Standards**: Support for Aadhar, ABHA, and government schemes
- **Data Protection**: Built-in consent management and audit trails
- **Accessibility**: Multi-language support for diverse populations
- **Clinical Standards**: ICD-10 coding support and evidence-based guidelines

## References

- [FHIR R4 Patient Resource](https://www.hl7.org/fhir/patient.html)
- [UIDAI Aadhar](https://uidai.gov.in)
- [Ayushman Bharat Digital Mission](https://abdm.gov.in)
- [National Digital Health Mission](https://ndhm.gov.in)
- SwasthyaOS Requirements Document (Requirement 4, 14)
- SwasthyaOS Design Document (Data Models section)

## Support

For questions or issues with the patient types, please refer to:

- SwasthyaOS Design Document
- SwasthyaOS Requirements Document
- FHIR R4 Specification
