import { TranslationKeys } from "./types";

export const hi: TranslationKeys = {
  // Navigation
  "nav.dashboard": "डैशबोर्ड",
  "nav.clinician": "चिकित्सक कार्यक्षेत्र",
  "nav.rural": "ग्रामीण निर्णय सहायता",
  "nav.population": "जनसंख्या स्वास्थ्य रडार",
  "nav.patients": "मरीज़",
  "nav.appointments": "अपॉइंटमेंट",
  "nav.inventory": "इन्वेंटरी",
  "nav.alerts": "अलर्ट",
  "nav.chat": "चैट",
  "nav.reports": "रिपोर्ट",
  "nav.audit": "ऑडिट और अनुपालन",
  "nav.settings": "सेटिंग्स",

  // Dashboard
  "dashboard.title": "डैशबोर्ड",
  "dashboard.subtitle":
    "नैदानिक स्थितिजन्य अवलोकन और AI-संचालित स्वास्थ्य बुद्धिमत्ता",
  "dashboard.consultations.today": "आज की परामर्श",
  "dashboard.consultations.pending": "लंबित दस्तावेज़ीकरण",
  "dashboard.alerts.generated": "AI अलर्ट जेनरेट किए गए",
  "dashboard.system.status": "सिस्टम स्थिति",
  "dashboard.system.accuracy": "AI मॉडल सटीकता",
  "dashboard.alerts.title": "सिस्टम अलर्ट",
  "dashboard.alerts.pending": "अलर्ट समीक्षा के लिए लंबित",
  "dashboard.consultations.recent": "हाल की परामर्श",
  "dashboard.health.signals": "क्षेत्रीय स्वास्थ्य संकेत",
  "dashboard.trust.score": "AI सिस्टम ट्रस्ट स्कोर",
  "dashboard.no.incidents": "✓ कोई गंभीर घटना का पता नहीं चला",
  "dashboard.monitoring.active":
    "सिस्टम निगरानी जारी है। सभी स्वास्थ्य कर्मचारी सक्रिय रूप से मरीजों की सेवा कर रहे हैं।",

  // Common
  "common.confidence": "विश्वास",
  "common.completed": "पूर्ण",
  "common.in-progress": "प्रगति में",
  "common.pending": "लंबित",
  "common.acknowledge": "स्वीकार करें",
  "common.details": "विवरण",
  "common.high": "उच्च",
  "common.medium": "मध्यम",
  "common.low": "कम",
  "common.critical": "गंभीर",
  "common.cases": "मामले",
  "common.increasing": "बढ़ रहा",
  "common.decreasing": "घट रहा",
  "common.stable": "स्थिर",
  "common.excellent": "उत्कृष्ट",
  "common.good": "अच्छा",
  "common.fair": "ठीक",
  "common.poor": "खराब",

  // Clinician Workspace
  "clinician.title": "चिकित्सक कार्यक्षेत्र",
  "clinician.subtitle":
    "AI-संचालित निर्णय सहायता के साथ एकीकृत नैदानिक दस्तावेज़ीकरण",
  "clinician.consultation.live": "लाइव परामर्श",
  "clinician.discharge.summary": "डिस्चार्ज सारांश",

  // Rural Decision Support
  "rural.title": "आरोग्यपथ: ग्रामीण निर्णय सहायता",
  "rural.subtitle":
    "फ्रंटलाइन स्वास्थ्य कर्मचारियों के लिए वॉयस-फर्स्ट नैदानिक मार्गदर्शन",
  "rural.symptom.intake": "लक्षण सेवन",
  "rural.vitals.input": "वाइटल्स इनपुट",
  "rural.decision.outcome": "निर्णय परिणाम",

  // Population Health
  "population.title": "जनस्वास्थ्यवॉच: जनसंख्या स्वास्थ्य रडार",
  "population.subtitle":
    "जिलों में वास्तविक समय महामारी विज्ञान निगरानी और AI-पहचान विसंगति का पता लगाना",
  "population.district.map": "जिला-स्तरीय हीट मैप",
  "population.surveillance.summary": "निगरानी सारांश",
  "population.districts.active": "सक्रिय जिले",
  "population.total.cases": "कुल मामले",
  "population.alerts": "अलर्ट",

  // Patient Management
  "patients.title": "मरीज़",
  "patients.search": "मरीज़ खोजें",
  "patients.register": "नया मरीज़ पंजीकृत करें",
  "patients.timeline": "मरीज़ टाइमलाइन",

  // Medical Terms
  "medical.fever": "बुखार",
  "medical.cough": "खांसी",
  "medical.headache": "सिरदर्द",
  "medical.nausea": "मतली",
  "medical.fatigue": "थकान",
  "medical.respiratory": "श्वसन",
  "medical.gastrointestinal": "गैस्ट्रोइंटेस्टाइनल",
  "medical.neurological": "न्यूरोलॉजिकल",
  "medical.cardiovascular": "हृदय संबंधी",
  "medical.temperature": "तापमान",
  "medical.blood.pressure": "रक्तचाप",
  "medical.heart.rate": "हृदय गति",
  "medical.respiratory.rate": "श्वसन दर",

  // Trust and AI
  "trust.ai.accuracy": "AI मॉडल सटीकता",
  "trust.data.quality": "डेटा गुणवत्ता",
  "trust.system.reliability": "सिस्टम विश्वसनीयता",
  "trust.security.score": "सुरक्षा स्कोर",
  "trust.overall.score": "समग्र ट्रस्ट स्कोर",
  "trust.system.trusted": "सिस्टम विश्वसनीय",
  "trust.model.version": "मॉडल संस्करण",
  "trust.last.updated": "अंतिम अपडेट",
  "trust.audit.status": "ऑडिट स्थिति",
  "trust.data.sources": "डेटा स्रोत",
  "trust.compliant": "अनुपालित",

  // Time and Dates
  "time.hours.ago": "घंटे पहले",
  "time.minutes.ago": "मिनट पहले",
  "time.yesterday": "कल",
  "time.today": "आज",
  "time.scheduled": "निर्धारित",

  // User Roles
  "role.doctor": "डॉ. राजेश कुमार",
  "role.frontline": "आशा कार्यकर्ता - प्रिया",
  "role.admin": "सार्वजनिक स्वास्थ्य अधिकारी",
  "role.switch": "भूमिका बदलें",

  // System Status
  "system.active": "सिस्टम सक्रिय",
  "system.notifications": "सूचनाएं",
  "system.ai.insights": "AI अंतर्दृष्टि",
  "system.sign.out": "साइन आउट",
};
