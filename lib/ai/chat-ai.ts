import { invokeClaude } from "./bedrock-client";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface ChatResponse {
  message: string;
  confidence: number;
  sources?: string[];
  disclaimer: string;
}

/**
 * Medical consultation chat assistant
 */
export async function getMedicalChatResponse(
  messages: ChatMessage[],
  userRole: "doctor" | "frontline" | "admin",
): Promise<ChatResponse> {
  const roleContext = {
    doctor:
      "You are assisting a licensed medical doctor with clinical decision support.",
    frontline:
      "You are assisting a frontline health worker with basic medical guidance.",
    admin:
      "You are assisting a healthcare administrator with system and policy questions.",
  };

  const conversationHistory = messages
    .map(
      (msg) => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`,
    )
    .join("\n");

  const prompt = `${roleContext[userRole]}

Conversation history:
${conversationHistory}

Provide a helpful, accurate response. Include:
1. Clear answer to the question
2. Relevant medical information
3. Any important warnings or considerations

IMPORTANT: 
- Always emphasize that this is AI-assisted information
- Recommend consulting with qualified healthcare professionals for final decisions
- If the question is outside medical scope, politely redirect

Keep responses concise and professional.`;

  try {
    const response = await invokeClaude("You are a medical consultation chat assistant.", prompt);

    return {
      message: response,
      confidence: 85,
      disclaimer:
        "This information is AI-generated and should not replace professional medical advice.",
    };
  } catch (error) {
    console.error("Error in medical chat:", error);
    return {
      message:
        "I apologize, but I'm unable to process your request at the moment. Please consult with a healthcare professional.",
      confidence: 0,
      disclaimer: "AI service temporarily unavailable.",
    };
  }
}

/**
 * Generate medical documentation from voice/text input
 */
export async function generateSOAPNote(
  subjective: string,
  objective: string,
  vitalSigns?: any,
): Promise<{
  assessment: string;
  plan: string;
  icd10Codes: string[];
}> {
  const prompt = `Generate a medical SOAP note Assessment and Plan based on the following:

Subjective: ${subjective}
Objective: ${objective}
${vitalSigns ? `Vital Signs: ${JSON.stringify(vitalSigns)}` : ""}

Provide:
1. Assessment (differential diagnosis)
2. Plan (treatment recommendations)
3. Relevant ICD-10 codes

Format as JSON:
{
  "assessment": "string",
  "plan": "string",
  "icd10Codes": ["code1", "code2"]
}`;

  try {
    const text = await invokeClaude("You are an AI generating medical SOAP notes. Return JSON.", prompt);
    const jsonMatch = text.match(/\{[\s\S]*\}/);

    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch (error) {
    console.error("Error generating SOAP note:", error);
  }

  return {
    assessment: "Unable to generate assessment",
    plan: "Please complete manually",
    icd10Codes: [],
  };
}
