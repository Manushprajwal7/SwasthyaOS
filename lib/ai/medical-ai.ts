import { geminiModel, safetySettings, generationConfig } from "./gemini-client";

export interface DiagnosisSuggestion {
  icd10Code: string;
  condition: string;
  confidence: number;
  reasoning: string;
  recommendedTests: string[];
}

export interface MedicationSuggestion {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  confidence: number;
  interactions: string[];
  contraindications: string[];
}

export interface TreatmentPlan {
  diagnosis: DiagnosisSuggestion[];
  medications: MedicationSuggestion[];
  lifestyle: string[];
  followUp: string;
  redFlags: string[];
}

/**
 * Generate ICD-10 diagnosis suggestions based on symptoms
 */
export async function generateDiagnosisSuggestions(
  symptoms: string[],
  vitals?: { temperature?: number; bloodPressure?: string; heartRate?: number },
  patientHistory?: string,
): Promise<DiagnosisSuggestion[]> {
  const prompt = `You are a medical AI assistant helping doctors with differential diagnosis. 
Based on the following information, suggest the top 3 most likely diagnoses with ICD-10 codes.

Symptoms: ${symptoms.join(", ")}
${vitals ? `Vitals: Temperature: ${vitals.temperature}°F, BP: ${vitals.bloodPressure}, HR: ${vitals.heartRate} bpm` : ""}
${patientHistory ? `Patient History: ${patientHistory}` : ""}

For each diagnosis, provide:
1. ICD-10 code
2. Condition name
3. Confidence score (0-100%)
4. Brief reasoning
5. Recommended diagnostic tests

Format your response as JSON array with this structure:
[{
  "icd10Code": "string",
  "condition": "string",
  "confidence": number,
  "reasoning": "string",
  "recommendedTests": ["test1", "test2"]
}]

IMPORTANT: Only provide medical information for educational purposes. Always recommend consulting with a qualified healthcare professional.`;

  try {
    const result = await geminiModel.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      safetySettings,
      generationConfig,
    });

    const response = result.response;
    const text = response.text();

    // Extract JSON from response
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }

    return [];
  } catch (error) {
    console.error("Error generating diagnosis suggestions:", error);
    return [];
  }
}

/**
 * Generate medication suggestions based on diagnosis
 */
export async function generateMedicationSuggestions(
  diagnosis: string,
  patientAge: number,
  allergies?: string[],
): Promise<MedicationSuggestion[]> {
  const prompt = `You are a medical AI assistant helping doctors with medication recommendations.
Based on the diagnosis and patient information, suggest appropriate medications.

Diagnosis: ${diagnosis}
Patient Age: ${patientAge} years
${allergies && allergies.length > 0 ? `Known Allergies: ${allergies.join(", ")}` : "No known allergies"}

For each medication, provide:
1. Medication name (generic)
2. Dosage
3. Frequency
4. Duration
5. Confidence score (0-100%)
6. Potential drug interactions
7. Contraindications

Format your response as JSON array:
[{
  "name": "string",
  "dosage": "string",
  "frequency": "string",
  "duration": "string",
  "confidence": number,
  "interactions": ["drug1", "drug2"],
  "contraindications": ["condition1", "condition2"]
}]

IMPORTANT: This is for educational purposes only. Final prescription decisions must be made by licensed healthcare professionals.`;

  try {
    const result = await geminiModel.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      safetySettings,
      generationConfig,
    });

    const response = result.response;
    const text = response.text();

    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }

    return [];
  } catch (error) {
    console.error("Error generating medication suggestions:", error);
    return [];
  }
}

/**
 * Generate comprehensive treatment plan
 */
export async function generateTreatmentPlan(
  symptoms: string[],
  vitals: any,
  patientAge: number,
  patientHistory?: string,
): Promise<TreatmentPlan> {
  const diagnoses = await generateDiagnosisSuggestions(
    symptoms,
    vitals,
    patientHistory,
  );

  if (diagnoses.length === 0) {
    return {
      diagnosis: [],
      medications: [],
      lifestyle: [],
      followUp: "Consult with healthcare provider",
      redFlags: [],
    };
  }

  const primaryDiagnosis = diagnoses[0];
  const medications = await generateMedicationSuggestions(
    primaryDiagnosis.condition,
    patientAge,
  );

  const prompt = `Based on the diagnosis of ${primaryDiagnosis.condition}, provide:
1. Lifestyle recommendations (3-5 items)
2. Follow-up schedule
3. Red flag symptoms to watch for (warning signs)

Format as JSON:
{
  "lifestyle": ["recommendation1", "recommendation2"],
  "followUp": "follow-up schedule",
  "redFlags": ["warning1", "warning2"]
}`;

  try {
    const result = await geminiModel.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      safetySettings,
      generationConfig,
    });

    const text = result.response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);

    if (jsonMatch) {
      const additional = JSON.parse(jsonMatch[0]);
      return {
        diagnosis: diagnoses,
        medications,
        lifestyle: additional.lifestyle || [],
        followUp: additional.followUp || "Follow up in 1 week",
        redFlags: additional.redFlags || [],
      };
    }
  } catch (error) {
    console.error("Error generating treatment plan:", error);
  }

  return {
    diagnosis: diagnoses,
    medications,
    lifestyle: [],
    followUp: "Follow up in 1 week",
    redFlags: [],
  };
}

/**
 * Analyze patient symptoms for rural health workers
 */
export async function analyzeRuralSymptoms(
  symptoms: string[],
  vitals: any,
): Promise<{
  severity: "low" | "medium" | "high" | "critical";
  action: "treat-local" | "refer-phc" | "emergency";
  reasoning: string;
  confidence: number;
  immediateSteps: string[];
}> {
  const prompt = `You are an AI assistant for rural health workers with limited medical training.
Analyze these symptoms and vitals to determine the appropriate action.

Symptoms: ${symptoms.join(", ")}
Vitals: ${JSON.stringify(vitals)}

Provide:
1. Severity level (low/medium/high/critical)
2. Recommended action (treat-local/refer-phc/emergency)
3. Clear reasoning in simple language
4. Confidence score (0-100%)
5. Immediate steps the health worker should take

Format as JSON:
{
  "severity": "string",
  "action": "string",
  "reasoning": "string",
  "confidence": number,
  "immediateSteps": ["step1", "step2"]
}`;

  try {
    const result = await geminiModel.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      safetySettings,
      generationConfig,
    });

    const text = result.response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);

    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch (error) {
    console.error("Error analyzing rural symptoms:", error);
  }

  return {
    severity: "medium",
    action: "refer-phc",
    reasoning: "Unable to analyze. Please refer to PHC for evaluation.",
    confidence: 0,
    immediateSteps: ["Monitor patient", "Refer to nearest PHC"],
  };
}

/**
 * Generate discharge summary
 */
export async function generateDischargeSummary(
  patientName: string,
  diagnosis: string,
  treatment: string,
  medications: string[],
  language: "en" | "hi" = "en",
): Promise<string> {
  const languageInstruction =
    language === "hi"
      ? "Generate the summary in Hindi language."
      : "Generate the summary in English language.";

  const prompt = `Generate a patient-friendly discharge summary.

Patient: ${patientName}
Diagnosis: ${diagnosis}
Treatment Provided: ${treatment}
Medications: ${medications.join(", ")}

${languageInstruction}

Include:
1. Brief explanation of the condition
2. Treatment received
3. Medication instructions
4. Follow-up care
5. Warning signs to watch for
6. Lifestyle recommendations

Use simple, clear language that patients can understand.`;

  try {
    const result = await geminiModel.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      safetySettings,
      generationConfig,
    });

    return result.response.text();
  } catch (error) {
    console.error("Error generating discharge summary:", error);
    return "Unable to generate discharge summary. Please consult with your healthcare provider.";
  }
}
