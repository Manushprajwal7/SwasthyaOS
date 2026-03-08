import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

const region = process.env.AWS_REGION || "ap-south-1";

// Create credentials object safely
const getCredentials = () => {
  if (process.env.Access_Key_ID && process.env.Secret_Access_Key) {
    return {
      accessKeyId: process.env.Access_Key_ID,
      secretAccessKey: process.env.Secret_Access_Key,
    };
  }
  return undefined; // Let AWS SDK fallback to other credential providers
};

export const bedrockClient = new BedrockRuntimeClient({
  region,
  ...(getCredentials() && { credentials: getCredentials() }),
});

export const BEDROCK_MODEL_ID = process.env.BEDROCK_MODEL_ID || "anthropic.claude-3-sonnet-20240229-v1:0";

/**
 * Helper to invoke Claude 3 via Amazon Bedrock
 * @param systemPrompt The system instructions
 * @param userPrompt The user prompt
 * @param temperature Temperature for generation (default: 0.2)
 * @returns The generated text
 */
export async function invokeClaude(systemPrompt: string, userPrompt: string, temperature = 0.2): Promise<string> {
  const payload = {
    anthropic_version: "bedrock-2023-05-31",
    max_tokens: 2000,
    temperature: temperature,
    system: systemPrompt,
    messages: [
      {
        role: "user",
        content: [{ type: "text", text: userPrompt }],
      },
    ],
  };

  const command = new InvokeModelCommand({
    contentType: "application/json",
    accept: "application/json",
    modelId: BEDROCK_MODEL_ID,
    body: JSON.stringify(payload),
  });

  try {
    const response = await bedrockClient.send(command);
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));

    if (responseBody.content && responseBody.content.length > 0) {
      return responseBody.content[0].text;
    }

    throw new Error("Invalid response format from Bedrock");
  } catch (error) {
    console.error("Bedrock invocation failed:", error);
    throw error;
  }
}
