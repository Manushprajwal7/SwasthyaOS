import { TranslationKeys } from "./types";

export const ml: TranslationKeys = {
  // Navigation
  "nav.dashboard": "ഡാഷ്ബോർഡ്",
  "nav.clinician": "ക്ലിനിഷ്യൻ വർക്ക്സ്പേസ്",
  "nav.rural": "ഗ്രാമീണ തീരുമാന പിന്തുണ",
  "nav.population": "ജനസംഖ്യാ ആരോഗ്യ റഡാർ",
  "nav.patients": "രോഗികൾ",
  "nav.appointments": "അപ്പോയിന്റ്മെന്റുകൾ",
  "nav.inventory": "ഇൻവെന്ററി",
  "nav.alerts": "മുന്നറിയിപ്പുകൾ",
  "nav.chat": "ചാറ്റ്",
  "nav.reports": "റിപ്പോർട്ടുകൾ",
  "nav.audit": "ഓഡിറ്റും അനുസരണവും",
  "nav.settings": "ക്രമീകരണങ്ങൾ",

  // Dashboard
  "dashboard.title": "ഡാഷ്ബോർഡ്",
  "dashboard.subtitle":
    "ക്ലിനിക്കൽ സാഹചര്യ അവലോകനവും AI-പ്രവർത്തിത ആരോഗ്യ സൂചനകളും",
  "dashboard.consultations.today": "ഇന്നത്തെ കൺസൾട്ടേഷനുകൾ",
  "dashboard.consultations.pending": "തീർപ്പാക്കാത്ത ഡോക്യുമെന്റേഷൻ",
  "dashboard.alerts.generated": "AI മുന്നറിയിപ്പുകൾ സൃഷ്ടിച്ചു",
  "dashboard.system.status": "സിസ്റ്റം നില",
  "dashboard.system.accuracy": "AI മോഡൽ കൃത്യത",
  "dashboard.alerts.title": "സിസ്റ്റം മുന്നറിയിപ്പുകൾ",
  "dashboard.alerts.pending": "അവലോകനത്തിനായി തീർപ്പാക്കാത്ത മുന്നറിയിപ്പുകൾ",
  "dashboard.consultations.recent": "സമീപകാല കൺസൾട്ടേഷനുകൾ",
  "dashboard.health.signals": "പ്രാദേശിക ആരോഗ്യ സിഗ്നലുകൾ",
  "dashboard.trust.score": "AI സിസ്റ്റം വിശ്വാസ സ്കോർ",
  "dashboard.no.incidents": "✓ ഗുരുതരമായ സംഭവങ്ങളൊന്നും കണ്ടെത്തിയില്ല",
  "dashboard.monitoring.active":
    "സിസ്റ്റം നിരീക്ഷണം സജീവമാണ്. എല്ലാ ആരോഗ്യ പ്രവർത്തകരും രോഗികളെ സേവിക്കുന്നു.",

  // Common
  "common.confidence": "വിശ്വാസം",
  "common.completed": "പൂർത്തിയായി",
  "common.in-progress": "പുരോഗമിക്കുന്നു",
  "common.pending": "തീർപ്പാക്കാത്തത്",
  "common.acknowledge": "അംഗീകരിക്കുക",
  "common.details": "വിശദാംശങ്ങൾ",
  "common.high": "ഉയർന്ന",
  "common.medium": "ഇടത്തരം",
  "common.low": "താഴ്ന്ന",
  "common.critical": "ഗുരുതരമായ",
  "common.cases": "കേസുകൾ",
  "common.increasing": "വർദ്ധിക്കുന്നു",
  "common.decreasing": "കുറയുന്നു",
  "common.stable": "സ്ഥിരമായ",
  "common.excellent": "മികച്ച",
  "common.good": "നല്ല",
  "common.fair": "ന്യായമായ",
  "common.poor": "മോശം",

  // Clinician Workspace
  "clinician.title": "ക്ലിനിഷ്യൻ വർക്ക്സ്പേസ്",
  "clinician.subtitle":
    "AI-പ്രവർത്തിത തീരുമാന പിന്തുണയോടുകൂടിയ സംയോജിത ക്ലിനിക്കൽ ഡോക്യുമെന്റേഷൻ",
  "clinician.consultation.live": "തത്സമയ കൺസൾട്ടേഷൻ",
  "clinician.discharge.summary": "ഡിസ്ചാർജ് സംഗ്രഹം",

  // Rural Decision Support
  "rural.title": "ആരോഗ്യപഥ്: ഗ്രാമീണ തീരുമാന പിന്തുണ",
  "rural.subtitle":
    "മുൻനിര ആരോഗ്യ പ്രവർത്തകർക്കുള്ള ശബ്ദ-ആദ്യ ക്ലിനിക്കൽ മാർഗ്ഗനിർദ്ദേശം",
  "rural.symptom.intake": "ലക്ഷണ സ്വീകരണം",
  "rural.vitals.input": "വൈറ്റൽസ് ഇൻപുട്ട്",
  "rural.decision.outcome": "തീരുമാന ഫലം",

  // Population Health
  "population.title": "ജനസ്വാസ്ഥ്യവാച്: ജനസംഖ്യാ ആരോഗ്യ റഡാർ",
  "population.subtitle":
    "ജില്ലകളിലുടനീളം തത്സമയ എപ്പിഡെമിയോളജിക്കൽ നിരീക്ഷണവും AI-കണ്ടെത്തിയ അസാധാരണത കണ്ടെത്തലും",
  "population.district.map": "ജില്ലാതല ഹീറ്റ്മാപ്പ്",
  "population.surveillance.summary": "നിരീക്ഷണ സംഗ്രഹം",
  "population.districts.active": "സജീവ ജില്ലകൾ",
  "population.total.cases": "മൊത്തം കേസുകൾ",
  "population.alerts": "മുന്നറിയിപ്പുകൾ",

  // Patient Management
  "patients.title": "രോഗികൾ",
  "patients.search": "രോഗികളെ തിരയുക",
  "patients.register": "പുതിയ രോഗിയെ രജിസ്റ്റർ ചെയ്യുക",
  "patients.timeline": "രോഗി ടൈംലൈൻ",

  // Medical Terms
  "medical.fever": "പനി",
  "medical.cough": "ചുമ",
  "medical.headache": "തലവേദന",
  "medical.nausea": "ഓക്കാനം",
  "medical.fatigue": "ക്ഷീണം",
  "medical.respiratory": "ശ്വസന",
  "medical.gastrointestinal": "ദഹനവ്യവസ്ഥ",
  "medical.neurological": "ന്യൂറോളജിക്കൽ",
  "medical.cardiovascular": "ഹൃദയ",
  "medical.temperature": "താപനില",
  "medical.blood.pressure": "രക്തസമ്മർദ്ദം",
  "medical.heart.rate": "ഹൃദയമിടിപ്പ്",
  "medical.respiratory.rate": "ശ്വസന നിരക്ക്",

  // Trust and AI
  "trust.ai.accuracy": "AI മോഡൽ കൃത്യത",
  "trust.data.quality": "ഡാറ്റ ഗുണനിലവാരം",
  "trust.system.reliability": "സിസ്റ്റം വിശ്വാസ്യത",
  "trust.security.score": "സുരക്ഷാ സ്കോർ",
  "trust.overall.score": "മൊത്തത്തിലുള്ള വിശ്വാസ സ്കോർ",
  "trust.system.trusted": "സിസ്റ്റം വിശ്വസനീയമാണ്",
  "trust.model.version": "മോഡൽ പതിപ്പ്",
  "trust.last.updated": "അവസാനം അപ്ഡേറ്റ് ചെയ്തത്",
  "trust.audit.status": "ഓഡിറ്റ് നില",
  "trust.data.sources": "ഡാറ്റ ഉറവിടങ്ങൾ",
  "trust.compliant": "അനുസരണമുള്ള",

  // Time and Dates
  "time.hours.ago": "മണിക്കൂറുകൾക്ക് മുമ്പ്",
  "time.minutes.ago": "മിനിറ്റുകൾക്ക് മുമ്പ്",
  "time.yesterday": "ഇന്നലെ",
  "time.today": "ഇന്ന്",
  "time.scheduled": "ഷെഡ്യൂൾ ചെയ്തത്",

  // User Roles
  "role.doctor": "ഡോ. രാജേഷ് കുമാർ",
  "role.frontline": "ആശാ വർക്കർ - പ്രിയ",
  "role.admin": "പൊതു ആരോഗ്യ ഉദ്യോഗസ്ഥൻ",
  "role.switch": "റോൾ മാറ്റുക",

  // System Status
  "system.active": "സിസ്റ്റം സജീവമാണ്",
  "system.notifications": "അറിയിപ്പുകൾ",
  "system.ai.insights": "AI സൂചനകൾ",
  "system.sign.out": "സൈൻ ഔട്ട്",
};
