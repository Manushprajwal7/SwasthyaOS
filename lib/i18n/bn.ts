import { TranslationKeys } from "./types";

export const bn: TranslationKeys = {
  // Navigation
  "nav.dashboard": "ড্যাশবোর্ড",
  "nav.clinician": "চিকিৎসক কর্মক্ষেত্র",
  "nav.rural": "গ্রামীণ সিদ্ধান্ত সহায়তা",
  "nav.population": "জনসংখ্যা স্বাস্থ্য রাডার",
  "nav.patients": "রোগীরা",
  "nav.appointments": "অ্যাপয়েন্টমেন্ট",
  "nav.inventory": "ইনভেন্টরি",
  "nav.alerts": "সতর্কতা",
  "nav.chat": "চ্যাট",
  "nav.reports": "রিপোর্ট",
  "nav.audit": "অডিট এবং সম্মতি",
  "nav.settings": "সেটিংস",

  // Dashboard
  "dashboard.title": "ড্যাশবোর্ড",
  "dashboard.subtitle":
    "ক্লিনিক্যাল পরিস্থিতি সংক্ষিপ্ত বিবরণ এবং AI-চালিত স্বাস্থ্য অন্তর্দৃষ্টি",
  "dashboard.consultations.today": "আজকের পরামর্শ",
  "dashboard.consultations.pending": "মুলতুবি ডকুমেন্টেশন",
  "dashboard.alerts.generated": "AI সতর্কতা তৈরি হয়েছে",
  "dashboard.system.status": "সিস্টেম অবস্থা",
  "dashboard.system.accuracy": "AI মডেল নির্ভুলতা",
  "dashboard.alerts.title": "সিস্টেম সতর্কতা",
  "dashboard.alerts.pending": "পর্যালোচনার জন্য মুলতুবি সতর্কতা",
  "dashboard.consultations.recent": "সাম্প্রতিক পরামর্শ",
  "dashboard.health.signals": "আঞ্চলিক স্বাস্থ্য সংকেত",
  "dashboard.trust.score": "AI সিস্টেম বিশ্বাস স্কোর",
  "dashboard.no.incidents": "✓ কোনো গুরুতর ঘটনা সনাক্ত করা হয়নি",
  "dashboard.monitoring.active":
    "সিস্টেম পর্যবেক্ষণ সক্রিয়। সমস্ত স্বাস্থ্যকর্মী রোগীদের সেবা করছেন।",

  // Common
  "common.confidence": "আত্মবিশ্বাস",
  "common.completed": "সম্পন্ন",
  "common.in-progress": "চলমান",
  "common.pending": "মুলতুবি",
  "common.acknowledge": "স্বীকার করুন",
  "common.details": "বিস্তারিত",
  "common.high": "উচ্চ",
  "common.medium": "মাঝারি",
  "common.low": "নিম্ন",
  "common.critical": "গুরুতর",
  "common.cases": "মামলা",
  "common.increasing": "বৃদ্ধি পাচ্ছে",
  "common.decreasing": "হ্রাস পাচ্ছে",
  "common.stable": "স্থিতিশীল",
  "common.excellent": "চমৎকার",
  "common.good": "ভাল",
  "common.fair": "ন্যায্য",
  "common.poor": "দুর্বল",

  // Clinician Workspace
  "clinician.title": "চিকিৎসক কর্মক্ষেত্র",
  "clinician.subtitle":
    "AI-চালিত সিদ্ধান্ত সহায়তা সহ সমন্বিত ক্লিনিক্যাল ডকুমেন্টেশন",
  "clinician.consultation.live": "লাইভ পরামর্শ",
  "clinician.discharge.summary": "ডিসচার্জ সারাংশ",

  // Rural Decision Support
  "rural.title": "আরোগ্যপথ: গ্রামীণ সিদ্ধান্ত সহায়তা",
  "rural.subtitle":
    "ফ্রন্টলাইন স্বাস্থ্যকর্মীদের জন্য ভয়েস-প্রথম ক্লিনিক্যাল নির্দেশনা",
  "rural.symptom.intake": "লক্ষণ গ্রহণ",
  "rural.vitals.input": "ভাইটাল ইনপুট",
  "rural.decision.outcome": "সিদ্ধান্ত ফলাফল",

  // Population Health
  "population.title": "জনস্বাস্থ্যবাচ: জনসংখ্যা স্বাস্থ্য রাডার",
  "population.subtitle":
    "জেলা জুড়ে রিয়েল-টাইম মহামারী সংক্রান্ত নজরদারি এবং AI-সনাক্ত অসঙ্গতি সনাক্তকরণ",
  "population.district.map": "জেলা-স্তরের হিটম্যাপ",
  "population.surveillance.summary": "নজরদারি সারাংশ",
  "population.districts.active": "সক্রিয় জেলা",
  "population.total.cases": "মোট মামলা",
  "population.alerts": "সতর্কতা",

  // Patient Management
  "patients.title": "রোগীরা",
  "patients.search": "রোগী খুঁজুন",
  "patients.register": "নতুন রোগী নিবন্ধন করুন",
  "patients.timeline": "রোগী টাইমলাইন",

  // Medical Terms
  "medical.fever": "জ্বর",
  "medical.cough": "কাশি",
  "medical.headache": "মাথাব্যথা",
  "medical.nausea": "বমি বমি ভাব",
  "medical.fatigue": "ক্লান্তি",
  "medical.respiratory": "শ্বাসযন্ত্র",
  "medical.gastrointestinal": "পরিপাক",
  "medical.neurological": "স্নায়বিক",
  "medical.cardiovascular": "হৃদযন্ত্র",
  "medical.temperature": "তাপমাত্রা",
  "medical.blood.pressure": "রক্তচাপ",
  "medical.heart.rate": "হৃদস্পন্দন",
  "medical.respiratory.rate": "শ্বাস-প্রশ্বাসের হার",

  // Trust and AI
  "trust.ai.accuracy": "AI মডেল নির্ভুলতা",
  "trust.data.quality": "ডেটা গুণমান",
  "trust.system.reliability": "সিস্টেম নির্ভরযোগ্যতা",
  "trust.security.score": "নিরাপত্তা স্কোর",
  "trust.overall.score": "সামগ্রিক বিশ্বাস স্কোর",
  "trust.system.trusted": "সিস্টেম বিশ্বস্ত",
  "trust.model.version": "মডেল সংস্করণ",
  "trust.last.updated": "সর্বশেষ আপডেট",
  "trust.audit.status": "অডিট অবস্থা",
  "trust.data.sources": "ডেটা উৎস",
  "trust.compliant": "সম্মতিপূর্ণ",

  // Time and Dates
  "time.hours.ago": "ঘন্টা আগে",
  "time.minutes.ago": "মিনিট আগে",
  "time.yesterday": "গতকাল",
  "time.today": "আজ",
  "time.scheduled": "নির্ধারিত",

  // User Roles
  "role.doctor": "ডাঃ রাজেশ কুমার",
  "role.frontline": "আশা কর্মী - প্রিয়া",
  "role.admin": "জনস্বাস্থ্য কর্মকর্তা",
  "role.switch": "ভূমিকা পরিবর্তন করুন",

  // System Status
  "system.active": "সিস্টেম সক্রিয়",
  "system.notifications": "বিজ্ঞপ্তি",
  "system.ai.insights": "AI অন্তর্দৃষ্টি",
  "system.sign.out": "সাইন আউট",
};
