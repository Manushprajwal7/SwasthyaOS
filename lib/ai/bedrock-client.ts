import { BedrockRuntimeClient } from "@aws-sdk/client-bedrock-runtime";

// Initialize Bedrock Runtime client
const region = process.env.AWS_REGION || "ap-south-1";

export const bedrockClient = new BedrockRuntimeClient({
  region,
  credentials: {
    accessKeyId: process.env.Access_Key_ID || "",
    secretAccessKey: process.env.Secret_Access_Key || "",
  },
});

// Model ID for Claude 3 Sonnet
export const BEDROCK_MODEL_ID = "anthropic.claude-3-sonnet-20240229-v1:0";

// Standard configuration for clinical AI agents
export const bedrockConfig = {
  anthropic_version: "bedrock-2023-05-31",
  max_tokens: 4096,
  temperature: 0.1, // Deterministic for medical safety
  top_p: 0.9,
};

/**
 * Helper to prepare common Bedrock payload for Claude 3
 */
export function prepareClaudePayload(prompt: string, systemPrompt?: string) {
  const messages = [
    {
      role: "user",
      content: [{ type: "text", text: prompt }],
    },
  ];

  return JSON.stringify({
    ...bedrockConfig,
    system: systemPrompt,
    messages,
  });
}
