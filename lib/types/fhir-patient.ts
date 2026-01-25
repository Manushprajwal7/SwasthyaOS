/**
 * FHIR-compliant Patient Types for SwasthyaOS
 *
 * This module defines patient data structures following FHIR R4 standards
 * with extensions for Indian healthcare context.
 *
 * References:
 * - FHIR R4 Patient Resource: https://www.hl7.org/fhir/patient.html
 * - Requirement 4: Patient Management System
 * - Requirement 14: Regulatory Compliance Framework
 */

// ============================================================================
// Base FHIR Types
// ============================================================================

/**
 * FHIR Resource metadata
 */
export interface FHIRMeta {
  versionId?: string;
  lastUpdated?: string;
  source?: string;
  profile?: string[];
  security?: FHIRCoding[];
  tag?: FHIRCoding[];
}

/**
 * FHIR Coding - represents a code defined by a terminology system
 */
export interface FHIRCoding {
  system?: string;
  version?: string;
  code?: string;
  display?: string;
  userSelected?: boolean;
}

/**
 * FHIR CodeableConcept - represents a value that is usually supplied by providing a reference to one or more terminologies
 */
export interface FHIRCodeableConcept {
  coding?: FHIRCoding[];
  text?: string;
}

/**
 * FHIR Identifier - an identifier intended for computation
 */
export interface FHIRIdentifier {
  use?: "usual" | "official" | "temp" | "secondary" | "old";
  type?: FHIRCodeableConcept;
  system?: string;
  value?: string;
  period?: FHIRPeriod;
  assigner?: FHIRReference;
}

/**
 * FHIR Period - a time period defined by a start and end date/time
 */
export interface FHIRPeriod {
  start?: string; // ISO 8601 datetime
  end?: string; // ISO 8601 datetime
}

/**
 * FHIR Reference - a reference from one resource to another
 */
export interface FHIRReference {
  reference?: string;
  type?: string;
  identifier?: FHIRIdentifier;
  display?: string;
}

/**
 * FHIR HumanName - a name of a human with text, parts and usage information
 */
export interface FHIRHumanName {
  use?:
    | "usual"
    | "official"
    | "temp"
    | "nickname"
    | "anonymous"
    | "old"
    | "maiden";
  text?: string;
  family?: string;
  given?: string[];
  prefix?: string[];
  suffix?: string[];
  period?: FHIRPeriod;
}

/**
 * FHIR ContactPoint - details for all kinds of technology-mediated contact points
 */
export interface FHIRContactPoint {
  system?: "phone" | "fax" | "email" | "pager" | "url" | "sms" | "other";
  value?: string;
  use?: "home" | "work" | "temp" | "old" | "mobile";
  rank?: number;
  period?: FHIRPeriod;
}

/**
 * FHIR Address - an address expressed using postal conventions
 */
export interface FHIRAddress {
  use?: "home" | "work" | "temp" | "old" | "billing";
  type?: "postal" | "physical" | "both";
  text?: string;
  line?: string[];
  city?: string;
  district?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  period?: FHIRPeriod;
}

/**
 * FHIR Attachment - content in a format defined elsewhere
 */
export interface FHIRAttachment {
  contentType?: string;
  language?: string;
  data?: string; // base64 encoded
  url?: string;
  size?: number;
  hash?: string; // base64 encoded SHA-1 hash
  title?: string;
  creation?: string; // ISO 8601 datetime
}

/**
 * FHIR Extension - optional extensions element
 */
export interface FHIRExtension {
  url: string;
  valueString?: string;
  valueBoolean?: boolean;
  valueInteger?: number;
  valueDecimal?: number;
  valueDateTime?: string;
  valueCode?: string;
  valueCoding?: FHIRCoding;
  valueCodeableConcept?: FHIRCodeableConcept;
  valueAttachment?: FHIRAttachment;
  valueReference?: FHIRReference;
}

// ============================================================================
// Patient-Specific FHIR Types
// ============================================================================

/**
 * FHIR Patient Contact - a contact party for the patient
 */
export interface FHIRPatientContact {
  relationship?: FHIRCodeableConcept[];
  name?: FHIRHumanName;
  telecom?: FHIRContactPoint[];
  address?: FHIRAddress;
  gender?: "male" | "female" | "other" | "unknown";
  organization?: FHIRReference;
  period?: FHIRPeriod;
}

/**
 * FHIR Patient Communication - languages which may be used to communicate with the patient
 */
export interface FHIRPatientCommunication {
  language: FHIRCodeableConcept;
  preferred?: boolean;
}

/**
 * FHIR Patient Link - link to another patient resource that concerns the same actual person
 */
export interface FHIRPatientLink {
  other: FHIRReference;
  type: "replaced-by" | "replaces" | "refer" | "seealso";
}

// ============================================================================
// SwasthyaOS Extensions for Indian Healthcare Context
// ============================================================================

/**
 * SwasthyaOS-specific patient extensions for Indian healthcare context
 */
export interface SwasthyaOSPatientExtensions {
  /**
   * Aadhar number (India's unique identification number)
   * System: https://uidai.gov.in
   */
  aadharNumber?: string;

  /**
   * Ration card number (for socioeconomic classification)
   * System: https://nfsa.gov.in
   */
  rationCardNumber?: string;

  /**
   * Ration card type (APL/BPL/AAY)
   */
  rationCardType?: "APL" | "BPL" | "AAY" | "other";

  /**
   * Primary language preference
   */
  primaryLanguage:
    | "en"
    | "hi"
    | "kn"
    | "ta"
    | "te"
    | "ml"
    | "gu"
    | "bn"
    | "other";

  /**
   * Secondary language preferences
   */
  secondaryLanguages?: string[];

  /**
   * Rural/Urban classification
   */
  ruralUrbanClassification: "rural" | "urban" | "semi-urban";

  /**
   * Primary Health Center (PHC) assignment
   */
  assignedPHC?: FHIRReference;

  /**
   * ASHA worker assignment (Accredited Social Health Activist)
   */
  assignedASHA?: FHIRReference;

  /**
   * Anganwadi center assignment (for maternal and child health)
   */
  assignedAnganwadi?: FHIRReference;

  /**
   * Socioeconomic status
   */
  socioeconomicStatus?:
    | "below-poverty-line"
    | "above-poverty-line"
    | "middle-income"
    | "high-income"
    | "unknown";

  /**
   * Education level
   */
  educationLevel?:
    | "none"
    | "primary"
    | "secondary"
    | "higher-secondary"
    | "graduate"
    | "post-graduate"
    | "unknown";

  /**
   * Occupation
   */
  occupation?: string;

  /**
   * Religion (optional, for cultural sensitivity in care)
   */
  religion?: string;

  /**
   * Caste category (for government scheme eligibility)
   */
  casteCategory?:
    | "general"
    | "obc"
    | "sc"
    | "st"
    | "other"
    | "prefer-not-to-say";

  /**
   * Disability status
   */
  disabilityStatus?: {
    hasDisability: boolean;
    disabilityType?: string[];
    disabilityPercentage?: number;
    udidNumber?: string; // Unique Disability ID
  };

  /**
   * Insurance information
   */
  insuranceInfo?: {
    hasInsurance: boolean;
    schemes?: Array<{
      schemeName: string; // e.g., "Ayushman Bharat", "CGHS", "ESIC"
      schemeId: string;
      validFrom?: string;
      validTo?: string;
    }>;
  };

  /**
   * Emergency contact with relationship
   */
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
    alternatePhone?: string;
  };

  /**
   * Consent for data sharing
   */
  dataConsent?: {
    researchConsent: boolean;
    publicHealthConsent: boolean;
    aiTrainingConsent: boolean;
    consentDate: string;
    consentVersion: string;
  };
}

// ============================================================================
// Core FHIR Patient Resource
// ============================================================================

/**
 * FHIR R4 Patient Resource
 *
 * Demographics and other administrative information about an individual receiving care or other health-related services.
 */
export interface FHIRPatient {
  /**
   * Resource type - always "Patient"
   */
  resourceType: "Patient";

  /**
   * Logical id of this artifact
   */
  id?: string;

  /**
   * Metadata about the resource
   */
  meta?: FHIRMeta;

  /**
   * A set of rules under which this content was created
   */
  implicitRules?: string;

  /**
   * Language of the resource content
   */
  language?: string;

  /**
   * An identifier for this patient
   */
  identifier?: FHIRIdentifier[];

  /**
   * Whether this patient's record is in active use
   */
  active?: boolean;

  /**
   * A name associated with the patient
   */
  name?: FHIRHumanName[];

  /**
   * A contact detail for the individual
   */
  telecom?: FHIRContactPoint[];

  /**
   * Administrative Gender
   */
  gender?: "male" | "female" | "other" | "unknown";

  /**
   * The date of birth for the individual
   */
  birthDate?: string; // YYYY-MM-DD format

  /**
   * Indicates if the individual is deceased
   */
  deceasedBoolean?: boolean;
  deceasedDateTime?: string;

  /**
   * An address for the individual
   */
  address?: FHIRAddress[];

  /**
   * Marital (civil) status of a patient
   */
  maritalStatus?: FHIRCodeableConcept;

  /**
   * Whether patient is part of a multiple birth
   */
  multipleBirthBoolean?: boolean;
  multipleBirthInteger?: number;

  /**
   * Image of the patient
   */
  photo?: FHIRAttachment[];

  /**
   * A contact party for the patient
   */
  contact?: FHIRPatientContact[];

  /**
   * A language which may be used to communicate with the patient
   */
  communication?: FHIRPatientCommunication[];

  /**
   * Patient's nominated primary care provider
   */
  generalPractitioner?: FHIRReference[];

  /**
   * Organization that is the custodian of the patient record
   */
  managingOrganization?: FHIRReference;

  /**
   * Link to another patient resource that concerns the same actual person
   */
  link?: FHIRPatientLink[];

  /**
   * Extensions for SwasthyaOS-specific data
   */
  extension?: FHIRExtension[];
}

// ============================================================================
// SwasthyaOS Patient (Extended FHIR Patient)
// ============================================================================

/**
 * SwasthyaOS Patient - extends FHIR Patient with Indian healthcare context
 *
 * This is the primary patient type used throughout SwasthyaOS.
 * It combines FHIR R4 compliance with extensions specific to Indian healthcare delivery.
 */
export interface SwasthyaOSPatient extends FHIRPatient {
  /**
   * SwasthyaOS-specific extensions
   */
  swasthyaOSExtensions: SwasthyaOSPatientExtensions;

  /**
   * Patient timeline - chronological clinical events
   */
  timeline?: ClinicalEvent[];

  /**
   * Confidence metrics for patient data quality
   */
  confidenceMetrics?: PatientDataConfidence;

  /**
   * Access log for audit trail
   */
  accessLog?: AccessLogEntry[];

  /**
   * Tags for quick filtering and categorization
   */
  tags?: string[];

  /**
   * Risk stratification
   */
  riskProfile?: PatientRiskProfile;
}

// ============================================================================
// Supporting Types for SwasthyaOS Patient
// ============================================================================

/**
 * Clinical Event - represents a clinical interaction or observation
 */
export interface ClinicalEvent {
  id: string;
  timestamp: string; // ISO 8601 datetime
  type:
    | "consultation"
    | "diagnosis"
    | "treatment"
    | "referral"
    | "lab-result"
    | "imaging"
    | "vaccination"
    | "admission"
    | "discharge";
  title: string;
  description?: string;
  data: any; // Type-specific data
  confidence: number; // 0-100
  source: "manual" | "ai-assisted" | "imported" | "automated";
  providerId?: string;
  facilityId?: string;
  attachments?: FHIRAttachment[];
  relatedEvents?: string[]; // IDs of related events
}

/**
 * Patient Data Confidence - metrics for data quality and completeness
 */
export interface PatientDataConfidence {
  overallConfidence: number; // 0-100
  demographicsConfidence: number;
  medicalHistoryConfidence: number;
  contactInfoConfidence: number;
  identificationConfidence: number;
  lastVerified?: string; // ISO 8601 datetime
  verifiedBy?: string; // User ID
  dataCompleteness: number; // 0-100 percentage
  missingCriticalFields?: string[];
}

/**
 * Access Log Entry - audit trail for patient data access
 */
export interface AccessLogEntry {
  timestamp: string; // ISO 8601 datetime
  userId: string;
  userName: string;
  userRole: string;
  action: "view" | "create" | "update" | "delete" | "export" | "print";
  resourceType: string;
  resourceId?: string;
  ipAddress?: string;
  deviceInfo?: string;
  purpose?: string;
  dataAccessed?: string[]; // Fields accessed
}

/**
 * Patient Risk Profile - stratification for proactive care
 */
export interface PatientRiskProfile {
  overallRiskScore: number; // 0-100
  riskCategory: "low" | "medium" | "high" | "critical";
  riskFactors: RiskFactor[];
  chronicConditions?: string[];
  recentHospitalizations?: number;
  medicationAdherence?: number; // 0-100
  socialDeterminantsScore?: number; // 0-100
  lastAssessment: string; // ISO 8601 datetime
  nextAssessmentDue?: string; // ISO 8601 datetime
}

/**
 * Risk Factor - individual risk factor contributing to overall risk
 */
export interface RiskFactor {
  factor: string;
  severity: "low" | "medium" | "high";
  confidence: number; // 0-100
  source: string;
  identifiedDate: string;
  notes?: string;
}

// ============================================================================
// Patient Identifier Types for India
// ============================================================================

/**
 * Creates a FHIR identifier for Aadhar number
 */
export function createAadharIdentifier(aadharNumber: string): FHIRIdentifier {
  return {
    use: "official",
    type: {
      coding: [
        {
          system: "http://terminology.hl7.org/CodeSystem/v2-0203",
          code: "NI",
          display: "National unique individual identifier",
        },
      ],
      text: "Aadhar Number",
    },
    system: "https://uidai.gov.in",
    value: aadharNumber,
  };
}

/**
 * Creates a FHIR identifier for SwasthyaOS internal patient ID
 */
export function createSwasthyaOSIdentifier(patientId: string): FHIRIdentifier {
  return {
    use: "usual",
    type: {
      coding: [
        {
          system: "http://terminology.hl7.org/CodeSystem/v2-0203",
          code: "MR",
          display: "Medical record number",
        },
      ],
      text: "SwasthyaOS Patient ID",
    },
    system: "https://swasthyaos.in/patient",
    value: patientId,
  };
}

/**
 * Creates a FHIR identifier for Ayushman Bharat Health Account (ABHA)
 */
export function createABHAIdentifier(abhaNumber: string): FHIRIdentifier {
  return {
    use: "official",
    type: {
      coding: [
        {
          system: "http://terminology.hl7.org/CodeSystem/v2-0203",
          code: "NH",
          display: "National Health Plan Identifier",
        },
      ],
      text: "Ayushman Bharat Health Account",
    },
    system: "https://healthid.ndhm.gov.in",
    value: abhaNumber,
  };
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Validates if a patient object is FHIR-compliant
 */
export function isFHIRCompliant(patient: any): patient is FHIRPatient {
  return (
    patient &&
    patient.resourceType === "Patient" &&
    (patient.identifier || patient.name || patient.telecom)
  );
}

/**
 * Validates if a patient object is a SwasthyaOS patient
 */
export function isSwasthyaOSPatient(
  patient: any,
): patient is SwasthyaOSPatient {
  return (
    isFHIRCompliant(patient) &&
    patient.swasthyaOSExtensions &&
    patient.swasthyaOSExtensions.primaryLanguage &&
    patient.swasthyaOSExtensions.ruralUrbanClassification
  );
}

/**
 * Extracts primary name from FHIR patient
 */
export function getPrimaryName(patient: FHIRPatient): string {
  if (!patient.name || patient.name.length === 0) {
    return "Unknown Patient";
  }

  const primaryName =
    patient.name.find((n) => n.use === "official" || n.use === "usual") ||
    patient.name[0];

  if (primaryName.text) {
    return primaryName.text;
  }

  const parts: string[] = [];
  if (primaryName.prefix) parts.push(...primaryName.prefix);
  if (primaryName.given) parts.push(...primaryName.given);
  if (primaryName.family) parts.push(primaryName.family);
  if (primaryName.suffix) parts.push(...primaryName.suffix);

  return parts.join(" ") || "Unknown Patient";
}

/**
 * Extracts primary phone number from FHIR patient
 */
export function getPrimaryPhone(patient: FHIRPatient): string | undefined {
  if (!patient.telecom || patient.telecom.length === 0) {
    return undefined;
  }

  const phoneContact = patient.telecom.find(
    (t) => t.system === "phone" && (t.use === "mobile" || t.use === "home"),
  );

  return phoneContact?.value;
}

/**
 * Calculates age from birth date
 */
export function calculateAge(birthDate: string): number | undefined {
  if (!birthDate) return undefined;

  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
}

/**
 * Formats patient identifier for display
 */
export function formatIdentifier(identifier: FHIRIdentifier): string {
  const type =
    identifier.type?.text || identifier.type?.coding?.[0]?.display || "ID";
  return `${type}: ${identifier.value}`;
}

// ============================================================================
// Type Guards
// ============================================================================

/**
 * Type guard for checking if deceased is boolean
 */
export function isDeceasedBoolean(
  patient: FHIRPatient,
): patient is FHIRPatient & { deceasedBoolean: boolean } {
  return patient.deceasedBoolean !== undefined;
}

/**
 * Type guard for checking if deceased is datetime
 */
export function isDeceasedDateTime(
  patient: FHIRPatient,
): patient is FHIRPatient & { deceasedDateTime: string } {
  return patient.deceasedDateTime !== undefined;
}

/**
 * Type guard for checking if multiple birth is boolean
 */
export function isMultipleBirthBoolean(
  patient: FHIRPatient,
): patient is FHIRPatient & { multipleBirthBoolean: boolean } {
  return patient.multipleBirthBoolean !== undefined;
}

/**
 * Type guard for checking if multiple birth is integer
 */
export function isMultipleBirthInteger(
  patient: FHIRPatient,
): patient is FHIRPatient & { multipleBirthInteger: number } {
  return patient.multipleBirthInteger !== undefined;
}
