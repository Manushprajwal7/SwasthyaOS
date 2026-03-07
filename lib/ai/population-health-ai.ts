import { InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import { bedrockClient, BEDROCK_MODEL_ID, prepareClaudePayload } from "./bedrock-client";

export interface HealthAnomaly {
  district: string;
  syndrome: string;
  severity: "low" | "medium" | "high" | "critical";
  confidence: number;
  affectedPopulation: number;
  trend: "increasing" | "decreasing" | "stable";
  reasoning: string;
  recommendations: string[];
}

export interface SituationReport {
  summary: string;
  keyFindings: string[];
  riskAssessment: string;
  recommendations: string[];
  dataSources: string[];
  limitations: string[];
}

/**
 * Detect health anomalies in population data
 */
export async function detectHealthAnomalies(
  districtData: Array<{
    district: string;
    cases: number;
    population: number;
    syndrome: string;
    historicalAverage: number;
  }>,
): Promise<HealthAnomaly[]> {
  const prompt = `You are a public health AI analyzing disease surveillance data.
Analyze the following district health data for anomalies and potential outbreaks.

Data:
${JSON.stringify(districtData, null, 2)}

For each significant anomaly detected, provide:
1. District name
2. Syndrome/condition
3. Severity level (low/medium/high/critical)
4. Confidence score (0-100%)
5. Estimated affected population
6. Trend (increasing/decreasing/stable)
7. Reasoning for the alert
8. Public health recommendations

Consider:
- Cases significantly above historical average
- Rapid increase in cases
- Geographic clustering
- Population at risk

Format as JSON array:
[{
  "district": "string",
  "syndrome": "string",
  "severity": "string",
  "confidence": number,
  "affectedPopulation": number,
  "trend": "string",
  "reasoning": "string",
  "recommendations": ["rec1", "rec2"]
}]`;

  try {
    const payload = prepareClaudePayload(prompt);
    const command = new InvokeModelCommand({
      modelId: BEDROCK_MODEL_ID,
      contentType: "application/json",
      accept: "application/json",
      body: payload,
    });

    const result = await bedrockClient.send(command);
    const responseBody = JSON.parse(new TextDecoder().decode(result.body));
    const text = responseBody.content[0].text;
    const jsonMatch = text.match(/\[[\s\S]*\]/);

    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }

    return [];
  } catch (error) {
    console.error("Error detecting health anomalies:", error);
    return [];
  }
}

/**
 * Generate automated situation report
 */
export async function generateSituationReport(
  timeframe: string,
  districtData: any[],
  alerts: HealthAnomaly[],
): Promise<SituationReport> {
  const prompt = `Generate an epidemiological situation report for public health officials.

Timeframe: ${timeframe}
Districts Monitored: ${districtData.length}
Active Alerts: ${alerts.length}

District Data Summary:
${JSON.stringify(districtData.slice(0, 10), null, 2)}

Active Alerts:
${JSON.stringify(alerts, null, 2)}

Provide a comprehensive situation report including:
1. Executive summary (2-3 sentences)
2. Key findings (3-5 bullet points)
3. Risk assessment
4. Public health recommendations
5. Data sources used
6. Limitations of the analysis

Format as JSON:
{
  "summary": "string",
  "keyFindings": ["finding1", "finding2"],
  "riskAssessment": "string",
  "recommendations": ["rec1", "rec2"],
  "dataSources": ["source1", "source2"],
  "limitations": ["limit1", "limit2"]
}`;

  try {
    const payload = prepareClaudePayload(prompt);
    const command = new InvokeModelCommand({
      modelId: BEDROCK_MODEL_ID,
      contentType: "application/json",
      accept: "application/json",
      body: payload,
    });

    const result = await bedrockClient.send(command);
    const responseBody = JSON.parse(new TextDecoder().decode(result.body));
    const text = responseBody.content[0].text;
    const jsonMatch = text.match(/\{[\s\S]*\}/);

    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch (error) {
    console.error("Error generating situation report:", error);
  }

  return {
    summary: "Unable to generate situation report",
    keyFindings: [],
    riskAssessment: "Analysis unavailable",
    recommendations: [],
    dataSources: [],
    limitations: ["AI analysis unavailable"],
  };
}

/**
 * Predict disease outbreak risk
 */
export async function predictOutbreakRisk(
  syndrome: string,
  currentCases: number,
  historicalData: number[],
  seasonalFactors: string[],
): Promise<{
  riskLevel: "low" | "medium" | "high" | "critical";
  probability: number;
  timeframe: string;
  reasoning: string;
  preventiveMeasures: string[];
}> {
  const prompt = `Analyze outbreak risk for the following disease surveillance data.

Syndrome: ${syndrome}
Current Cases: ${currentCases}
Historical Data (past weeks): ${historicalData.join(", ")}
Seasonal Factors: ${seasonalFactors.join(", ")}

Assess:
1. Risk level (low/medium/high/critical)
2. Probability of outbreak (0-100%)
3. Expected timeframe
4. Reasoning for assessment
5. Preventive measures to recommend

Format as JSON:
{
  "riskLevel": "string",
  "probability": number,
  "timeframe": "string",
  "reasoning": "string",
  "preventiveMeasures": ["measure1", "measure2"]
}`;

  try {
    const payload = prepareClaudePayload(prompt);
    const command = new InvokeModelCommand({
      modelId: BEDROCK_MODEL_ID,
      contentType: "application/json",
      accept: "application/json",
      body: payload,
    });

    const result = await bedrockClient.send(command);
    const responseBody = JSON.parse(new TextDecoder().decode(result.body));
    const text = responseBody.content[0].text;
    const jsonMatch = text.match(/\{[\s\S]*\}/);

    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch (error) {
    console.error("Error predicting outbreak risk:", error);
  }

  return {
    riskLevel: "medium",
    probability: 0,
    timeframe: "Unknown",
    reasoning: "Unable to assess risk",
    preventiveMeasures: ["Monitor situation closely"],
  };
}
