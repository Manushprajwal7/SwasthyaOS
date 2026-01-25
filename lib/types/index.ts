/**
 * SwasthyaOS Type Definitions
 *
 * Central export point for all type definitions used in SwasthyaOS.
 * This module provides FHIR-compliant types and SwasthyaOS-specific extensions.
 */

// FHIR Patient Types
export * from "./fhir-patient";

// Re-export commonly used types for convenience
export type {
  FHIRPatient,
  SwasthyaOSPatient,
  SwasthyaOSPatientExtensions,
  ClinicalEvent,
  PatientDataConfidence,
  AccessLogEntry,
  PatientRiskProfile,
  RiskFactor,
  FHIRIdentifier,
  FHIRHumanName,
  FHIRContactPoint,
  FHIRAddress,
  FHIRCodeableConcept,
  FHIRCoding,
} from "./fhir-patient";
