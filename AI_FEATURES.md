# SwasthyaOS AI Features Documentation

## Overview

SwasthyaOS integrates Amazon Bedrock (Claude 3) to provide comprehensive AI-powered healthcare features across the platform. All AI features are designed with medical accuracy, safety, and regulatory compliance in mind using AWS Guardrails.

## 🚀 Implemented AI Features

### 1. AI Diagnosis Assistant (Clinician Workspace)

**Location**: `/clinician` → AI Assistant Tab

**Features**:

- Differential diagnosis suggestions based on symptoms
- ICD-10 code recommendations
- Confidence scoring (70-100%)
- Recommended diagnostic tests
- Clinical reasoning explanations

**API Endpoint**: `POST /api/ai/diagnosis`

**Usage**:

```typescript
const response = await fetch("/api/ai/diagnosis", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    symptoms: ["fever", "cough", "headache"],
    vitals: {
      temperature: 101.5,
      bloodPressure: "120/80",
      heartRate: 88,
    },
    patientHistory: "No chronic conditions",
  }),
});
```

**Response**:

```json
{
  "suggestions": [
    {
      "icd10Code": "J06.9",
      "condition": "Acute Upper Respiratory Infection",
      "confidence": 92,
      "reasoning": "Combination of fever, cough, and headache...",
      "recommendedTests": ["CBC", "Chest X-ray", "Throat swab"]
    }
  ]
}
```

### 2. Medication Suggestions

**API Endpoint**: `POST /api/ai/medication`

**Features**:

- Evidence-based medication recommendations
- Dosage and frequency guidance
- Drug interaction warnings
- Contraindication alerts
- Age-appropriate dosing

**Usage**:

```typescript
const response = await fetch("/api/ai/medication", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    diagnosis: "Acute Upper Respiratory Infection",
    patientAge: 34,
    allergies: ["Penicillin"],
  }),
});
```

### 3. Treatment Plan Generation

**API Endpoint**: `POST /api/ai/treatment-plan`

**Features**:

- Comprehensive treatment plans
- Lifestyle recommendations
- Follow-up schedules
- Red flag symptoms to monitor
- Integrated diagnosis and medication suggestions

### 4. Rural Decision Support (AarogyaPath)

**API Endpoint**: `POST /api/ai/rural-analysis`

**Features**:

- Symptom severity assessment
- Triage recommendations (treat-local/refer-phc/emergency)
- Simple language explanations for frontline workers
- Immediate action steps
- Confidence scoring

**Usage**:

```typescript
const response = await fetch("/api/ai/rural-analysis", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    symptoms: ["high fever", "difficulty breathing"],
    vitals: {
      temperature: 103,
      heartRate: 110,
      respiratoryRate: 28,
    },
  }),
});
```

**Response**:

```json
{
  "analysis": {
    "severity": "high",
    "action": "emergency",
    "reasoning": "High fever with respiratory distress requires immediate medical attention",
    "confidence": 95,
    "immediateSteps": [
      "Call emergency services immediately",
      "Keep patient calm and seated upright",
      "Monitor breathing continuously"
    ]
  }
}
```

### 5. Discharge Summary Generation

**API Endpoint**: `POST /api/ai/discharge-summary`

**Features**:

- Patient-friendly discharge summaries
- Multi-language support (English/Hindi)
- Clear medication instructions
- Follow-up care guidelines
- Warning signs to watch for

**Usage**:

```typescript
const response = await fetch("/api/ai/discharge-summary", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    patientName: "Meera Singh",
    diagnosis: "Acute Bronchitis",
    treatment: "Antibiotics and rest",
    medications: ["Azithromycin 500mg", "Paracetamol 500mg"],
    language: "hi", // or "en"
  }),
});
```

### 6. AI Medical Chat Assistant

**Location**: `/chat` → AI Assistant Tab

**Features**:

- Real-time medical consultation support
- Context-aware responses
- Role-based assistance (doctor/frontline/admin)
- Conversation history tracking
- Confidence scoring

**API Endpoint**: `POST /api/ai/chat`

**Usage**:

```typescript
const response = await fetch("/api/ai/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    messages: [{ role: "user", content: "What are the signs of dehydration?" }],
    userRole: "doctor",
  }),
});
```

### 7. SOAP Note Generation

**API Endpoint**: `POST /api/ai/soap-note`

**Features**:

- Automated Assessment and Plan generation
- ICD-10 code suggestions
- Based on Subjective and Objective findings

### 8. Population Health Anomaly Detection

**API Endpoint**: `POST /api/ai/detect-anomalies`

**Features**:

- Disease outbreak detection
- Geographic clustering analysis
- Severity assessment
- Public health recommendations
- Affected population estimates

**Usage**:

```typescript
const response = await fetch("/api/ai/detect-anomalies", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    districtData: [
      {
        district: "Bengaluru Urban",
        cases: 45,
        population: 12000000,
        syndrome: "Respiratory Infection",
        historicalAverage: 15,
      },
    ],
  }),
});
```

### 9. Automated Situation Reports

**API Endpoint**: `POST /api/ai/situation-report`

**Features**:

- Epidemiological summaries
- Key findings extraction
- Risk assessment
- Public health recommendations
- Data source tracking
- Limitation acknowledgment

## 🔒 Safety & Compliance

### Medical Safety Settings

All AI responses are configured with:

- **Temperature**: 0.4 (lower for consistent medical advice)
- **Safety filters**: Block harmful content
- **Disclaimers**: All responses include medical disclaimer
- **Confidence thresholds**: Minimum 70% for clinical suggestions

### Regulatory Compliance

- **HIPAA Compliance**: No PHI stored in AI requests
- **FHIR Standards**: Compatible data structures
- **Audit Trails**: All AI interactions logged
- **Human Oversight**: AI assists, humans decide
- **Transparency**: Confidence scores and reasoning provided

### Content Filtering

```typescript
const safetySettings = [
  {
    category: "HARM_CATEGORY_HARASSMENT",
    threshold: "BLOCK_MEDIUM_AND_ABOVE",
  },
  {
    category: "HARM_CATEGORY_HATE_SPEECH",
    threshold: "BLOCK_MEDIUM_AND_ABOVE",
  },
  {
    category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    threshold: "BLOCK_MEDIUM_AND_ABOVE",
  },
  {
    category: "HARM_CATEGORY_DANGEROUS_CONTENT",
    threshold: "BLOCK_ONLY_HIGH",
  },
];
```

## 📊 AI Performance Metrics

### Confidence Scoring

- **85-100%**: High confidence (green badge)
- **70-84%**: Medium confidence (yellow badge)
- **Below 70%**: Low confidence (not displayed to users)

### Response Times

- Diagnosis suggestions: ~3-5 seconds
- Chat responses: ~2-3 seconds
- Treatment plans: ~5-7 seconds
- Situation reports: ~4-6 seconds

## 🛠️ Technical Architecture

### File Structure

```
lib/ai/
├── bedrock-client.ts          # Amazon Bedrock AI initialization
├── medical-ai.ts              # Clinical AI functions
├── population-health-ai.ts    # Public health AI functions
└── chat-ai.ts                 # Chat AI functions

app/api/ai/
├── diagnosis/route.ts
├── medication/route.ts
├── treatment-plan/route.ts
├── rural-analysis/route.ts
├── discharge-summary/route.ts
├── chat/route.ts
├── soap-note/route.ts
├── detect-anomalies/route.ts
└── situation-report/route.ts

components/
├── clinician/ai-diagnosis-assistant.tsx
└── chat/ai-chat-interface.tsx
```

### Environment Variables

```env
AWS_REGION=ap-south-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
```

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install @aws-sdk/client-bedrock-runtime
```

### 2. Configure AWS Credentials

Create `.env` file:

```env
AWS_REGION=ap-south-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
```

### 3. Test AI Features

Navigate to:

- **Clinician Workspace** (`/clinician`) → AI Assistant tab
- **Chat** (`/chat`) → AI Assistant tab

### 4. API Testing

```bash
# Test diagnosis API
curl -X POST http://localhost:3000/api/ai/diagnosis \
  -H "Content-Type: application/json" \
  -d '{"symptoms":["fever","cough"],"vitals":{}}'
```

## 📝 Best Practices

### For Developers

1. **Always include disclaimers** in AI-generated content
2. **Validate inputs** before sending to AI
3. **Handle errors gracefully** with fallback messages
4. **Log AI interactions** for audit purposes
5. **Test with real medical scenarios**
6. **Monitor API usage** and costs

### For Healthcare Providers

1. **Verify AI suggestions** with clinical judgment
2. **Use confidence scores** as guidance
3. **Document AI-assisted decisions** in patient records
4. **Report inaccuracies** for system improvement
5. **Follow institutional protocols** for AI use

## 🔮 Future Enhancements

- [ ] Voice-to-text medical dictation
- [ ] Medical image analysis
- [ ] Drug interaction database integration
- [ ] Real-time vital signs monitoring
- [ ] Predictive analytics for patient outcomes
- [ ] Multi-modal AI (text + images + vitals)
- [ ] Regional language support expansion
- [ ] Offline AI capabilities

## 📞 Support

For AI feature issues or questions:

- Check API logs in browser console
- Verify AWS credentials are set correctly
- Review error messages in API responses
- Consult Amazon Bedrock documentation

## ⚠️ Important Disclaimers

1. **AI is assistive, not diagnostic**: Final medical decisions must be made by licensed healthcare professionals
2. **Not a replacement for clinical judgment**: AI suggestions should inform, not replace, professional expertise
3. **Continuous monitoring required**: AI models need regular validation and updates
4. **Patient safety first**: When in doubt, consult with senior medical staff
5. **Regulatory compliance**: Ensure local healthcare regulations permit AI-assisted care

---

**Version**: 1.0.0  
**Last Updated**: March 2026  
**AI Model**: Amazon Bedrock (Claude 3 Sonnet)  
**Status**: ✅ Production Ready
