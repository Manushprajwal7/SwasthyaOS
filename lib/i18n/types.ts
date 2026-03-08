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
  "nav.ambulance_automation": string;

  // Ambulance Automation
  "ambulance.title": string;
  "ambulance.tabs.overview": string;
  "ambulance.tabs.schedule": string;
  "ambulance.tabs.forecast": string;
  "ambulance.tabs.fleet": string;
  "ambulance.tabs.report": string;
  "ambulance.kpi.active": string;
  "ambulance.kpi.calls": string;
  "ambulance.kpi.response_time": string;
  "ambulance.kpi.critical": string;
  "ambulance.kpi.hospital_alerts": string;
  "ambulance.map.title": string;
  "ambulance.analytics.efficiency": string;
  "ambulance.analytics.dispatch_success": string;
  "ambulance.analytics.utilization": string;
  "ambulance.forecast.next_12h": string;

  // Common
  "common.name": string;
  "common.print": string;
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
  "dashboard.greeting.morning": string;
  "dashboard.greeting.afternoon": string;
  "dashboard.greeting.evening": string;
  "dashboard.dr.kumar": string;
  "dashboard.sync.realtime": string;
  "dashboard.performance.title": string;
  "dashboard.drift.index": string;
  "dashboard.alert.critical": string;
  "dashboard.alert.critical_plural": string;
  "dashboard.alert.acknowledge": string;
  "dashboard.signals.title": string;

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
  "system.name": string;
  "system.version": string;
  "system.region": string;
  "system.all.operational": string;
  "system.platform.name": string;
  "system.collapse": string;
  "system.expand": string;
  "system.active_user": string;

  // Bedrock Report
  "report.button": string;
  "report.loading.title": string;
  "report.loading.subtitle": string;
  "report.header.title": string;
  "report.header.date": string;
  "report.header.powered": string;
  "report.download": string;
  "report.metric.patients": string;
  "report.metric.consultations": string;
  "report.metric.alerts": string;
  "report.metric.efficiency": string;
  "report.chart.syndrome.title": string;
  "report.chart.syndrome.live": string;
  "report.chart.syndrome.current": string;
  "report.chart.syndrome.baseline": string;
  "report.chart.geo.title": string;
  "report.chart.geo.subtitle": string;
  "report.chart.trend.title": string;
  "report.chart.trend.subtitle": string;
  "report.insights.title": string;
  "report.footer.verified": string;
  "report.footer.secure_id": string;
  "report.error.title": string;
  "report.error.subtitle": string;
  "report.error.retry": string;

  // Inventory
  "inventory.title": string;
  "inventory.sync": string;
  "inventory.metric.items": string;
  "inventory.metric.active": string;
  "inventory.metric.low": string;
  "inventory.metric.below_threshold": string;
  "inventory.metric.expiring": string;
  "inventory.metric.days_30": string;
  "inventory.metric.value": string;
  "inventory.metric.estimated": string;
  "inventory.tabs.active": string;
  "inventory.tabs.audit": string;
  "inventory.search": string;
  "inventory.clear": string;
  "inventory.receive": string;
  "inventory.alerts": string;

  // Alerts
  "alerts.title": string;
  "alerts.sync": string;
  "alerts.metric.critical": string;
  "alerts.metric.immediate": string;
  "alerts.metric.unread": string;
  "alerts.metric.awaiting": string;
  "alerts.metric.total": string;
  "alerts.metric.record": string;
  "alerts.metric.response": string;
  "alerts.metric.average": string;
  "alerts.empty.title": string;
  "alerts.empty.subtitle": string;
  "alerts.mark_read": string;
  "alerts.delete": string;
  "alerts.begin_intervention": string;
  "alerts.view_report": string;
  "alerts.mark_all": string;
  "alerts.reliability": string;
  "alerts.trends": string;

  // Clinician
  "clinician.title": string;
  "clinician.command_center": string;
  "clinician.session_active": string;
  "clinician.no_patient": string;
  "clinician.waiting": string;
  "clinician.refresh": string;
  "clinician.loading": string;
  "clinician.quick_actions": string;
  "clinician.add_vitals": string;
  "clinician.attach_report": string;
  "clinician.schedule": string;
  "clinician.voice_capture": string;
  "clinician.stop_recording": string;
  "clinician.recent_visits": string;
  "clinician.no_history": string;
  "clinician.prescriptions": string;
  "clinician.discharge_summary": string;
  "clinician.discharge_review": string;
  "clinician.allergies": string;

  // Clinician Voice Capture
  "clinician.voice_capture.title": string;
  "clinician.voice_capture.recording": string;
  "clinician.voice_capture.continue": string;
  "clinician.voice_capture.info": string;

  // Clinician SOAP
  "clinician.soap.title": string;
  "clinician.soap.subjective": string;
  "clinician.soap.objective": string;
  "clinician.soap.assessment": string;
  "clinician.soap.plan": string;
  "clinician.soap.subjective_placeholder": string;
  "clinician.soap.objective_placeholder": string;
  "clinician.soap.assessment_placeholder": string;
  "clinician.soap.plan_placeholder": string;
  "clinician.soap.ai_drafted": string;
  "clinician.soap.ai_edited": string;
  "clinician.soap.characters": string;
  "clinician.soap.save": string;
  "clinician.soap.tip": string;

  // Clinician Recommendations
  "clinician.recs.title": string;
  "clinician.recs.empty": string;
  "clinician.recs.none": string;
  "clinician.recs.diagnosis": string;
  "clinician.recs.medication": string;
  "clinician.recs.referral": string;
  "clinician.recs.score": string;
  "clinician.recs.accept": string;
  "clinician.recs.disclaimer": string;

  // Clinician Rx
  "clinician.rx.title": string;
  "clinician.rx.subtitle": string;
  "clinician.rx.search": string;
  "clinician.rx.active": string;
  "clinician.rx.drug": string;
  "clinician.rx.dose": string;
  "clinician.rx.frequency": string;
  "clinician.rx.duration": string;
  "clinician.rx.route": string;
  "clinician.rx.interaction": string;
  "clinician.rx.pmjay": string;
  "clinician.rx.covered": string;
  "clinician.rx.not_covered": string;
  "clinician.rx.generic_notice": string;
  "clinician.rx.save": string;
  "clinician.rx.print": string;
  "clinician.rx.interaction_check": string;
  "clinician.rx.no_interaction": string;
  "clinician.rx.pmjay_status": string;
  "clinician.rx.pmjay_covered_count": string;
  "clinician.rx.total_value": string;
  "clinician.rx.patient_pays": string;
  "clinician.rx.pediatric": string;
  "clinician.rx.weight_based": string;
  "clinician.rx.enable": string;

  // Clinician Discharge
  "clinician.discharge.title": string;
  "clinician.discharge.adm_date": string;
  "clinician.discharge.dis_date": string;
  "clinician.discharge.diagnosis_title": string;
  "clinician.discharge.summary_title": string;
  "clinician.discharge.meds_title": string;
  "clinician.discharge.followup_title": string;
  "clinician.discharge.restrictions_title": string;
  "clinician.discharge.footer": string;
  "clinician.discharge.legal_title": string;
  "clinician.discharge.legal_desc": string;
  "clinician.discharge.doctor_view": string;
  "clinician.discharge.patient_view": string;
  "clinician.discharge.download": string;
}
