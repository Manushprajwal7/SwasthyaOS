// Language types for SwasthyaOS
export type Language = "en" | "hi" | "kn" | "ta" | "te" | "ml" | "gu" | "bn";

export interface LanguageInfo {
  code: Language;
  name: string;
  nativeName: string;
  direction: "ltr" | "rtl";
}

export const languages: LanguageInfo[] = [
  { code: "en", name: "English", nativeName: "English", direction: "ltr" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", direction: "ltr" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ", direction: "ltr" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்", direction: "ltr" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు", direction: "ltr" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം", direction: "ltr" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી", direction: "ltr" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা", direction: "ltr" },
];

export interface TranslationKeys {
  // Navigation
  "nav.dashboard": string;
  "nav.clinician": string;
  "nav.rural": string;
  "nav.population": string;
  "nav.patients": string;
  "nav.appointments": string;
  "nav.inventory": string;
  "nav.alerts": string;
  "nav.chat": string;
  "nav.reports": string;
  "nav.audit": string;
  "nav.settings": string;

  // Dashboard
  "dashboard.title": string;
  "dashboard.subtitle": string;
  "dashboard.consultations.today": string;
  "dashboard.consultations.pending": string;
  "dashboard.alerts.generated": string;
  "dashboard.system.status": string;
  "dashboard.system.accuracy": string;
  "dashboard.alerts.title": string;
  "dashboard.alerts.pending": string;
  "dashboard.consultations.recent": string;
  "dashboard.health.signals": string;
  "dashboard.trust.score": string;
  "dashboard.no.incidents": string;
  "dashboard.monitoring.active": string;

  // Common
  "common.confidence": string;
  "common.completed": string;
  "common.in-progress": string;
  "common.pending": string;
  "common.acknowledge": string;
  "common.details": string;
  "common.high": string;
  "common.medium": string;
  "common.low": string;
  "common.critical": string;
  "common.cases": string;
  "common.increasing": string;
  "common.decreasing": string;
  "common.stable": string;
  "common.excellent": string;
  "common.good": string;
  "common.fair": string;
  "common.poor": string;

  // Clinician Workspace
  "clinician.title": string;
  "clinician.subtitle": string;
  "clinician.consultation.live": string;
  "clinician.discharge.summary": string;

  // Rural Decision Support
  "rural.title": string;
  "rural.subtitle": string;
  "rural.symptom.intake": string;
  "rural.vitals.input": string;
  "rural.decision.outcome": string;

  // Population Health
  "population.title": string;
  "population.subtitle": string;
  "population.district.map": string;
  "population.surveillance.summary": string;
  "population.districts.active": string;
  "population.total.cases": string;
  "population.alerts": string;

  // Patient Management
  "patients.title": string;
  "patients.search": string;
  "patients.register": string;
  "patients.timeline": string;

  // Medical Terms
  "medical.fever": string;
  "medical.cough": string;
  "medical.headache": string;
  "medical.nausea": string;
  "medical.fatigue": string;
  "medical.respiratory": string;
  "medical.gastrointestinal": string;
  "medical.neurological": string;
  "medical.cardiovascular": string;
  "medical.temperature": string;
  "medical.blood.pressure": string;
  "medical.heart.rate": string;
  "medical.respiratory.rate": string;

  // Trust and AI
  "trust.ai.accuracy": string;
  "trust.data.quality": string;
  "trust.system.reliability": string;
  "trust.security.score": string;
  "trust.overall.score": string;
  "trust.system.trusted": string;
  "trust.model.version": string;
  "trust.last.updated": string;
  "trust.audit.status": string;
  "trust.data.sources": string;
  "trust.compliant": string;

  // Time and Dates
  "time.hours.ago": string;
  "time.minutes.ago": string;
  "time.yesterday": string;
  "time.today": string;
  "time.scheduled": string;

  // User Roles
  "role.doctor": string;
  "role.frontline": string;
  "role.admin": string;
  "role.switch": string;

  // System Status
  "system.active": string;
  "system.notifications": string;
  "system.ai.insights": string;
  "system.sign.out": string;
}
