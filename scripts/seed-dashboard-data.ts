import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

import { DynamoDBClient, CreateTableCommand, ResourceInUseException } from "@aws-sdk/client-dynamodb";
import { PutCommand } from "@aws-sdk/lib-dynamodb";

const region = process.env.AWS_REGION || "ap-south-1";
const credentials = {
  accessKeyId: process.env.Access_Key_ID || "",
  secretAccessKey: process.env.Secret_Access_Key || "",
};

const ddbClient = new DynamoDBClient({ region, credentials });

async function seedDashboardData() {
  const { ddbDocClient, TABLES } = await import("../lib/db/aws-sdk");

  console.log("🚀 Starting Dashboard Data Seeding...");
  console.log(`Region: ${region}`);

  // 1. Create Tables if they don't exist
  const tablesToCreate = [
    {
      TableName: TABLES.ALERTS,
      KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
      AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],
      BillingMode: "PAY_PER_REQUEST",
    },
    {
      TableName: TABLES.AI_EVENTS,
      KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
      AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],
      BillingMode: "PAY_PER_REQUEST",
    },
    {
      TableName: TABLES.METRICS,
      KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
      AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],
      BillingMode: "PAY_PER_REQUEST",
    },
  ];

  for (const tableParams of tablesToCreate) {
    try {
      console.log(`Checking table: ${tableParams.TableName}...`);
      await ddbClient.send(new CreateTableCommand(tableParams as any));
      console.log(`✅ Created table: ${tableParams.TableName}`);
      // Simple wait to ensure table is active before writing (in a real scenario we'd poll DescribeTable)
      await new Promise((resolve) => setTimeout(resolve, 5000));
    } catch (error: any) {
      if (error instanceof ResourceInUseException || error.name === "ResourceInUseException") {
        console.log(`ℹ️ Table ${tableParams.TableName} already exists.`);
      } else {
        console.error(`❌ Error creating table ${tableParams.TableName}:`, error);
        throw error;
      }
    }
  }

  // 2. Mock Data
  const alerts = [
    {
      id: `A-1`,
      type: "critical",
      title: "Critical patient requiring immediate attention - Ward 3",
      description: "Auto-detected by SwasthyaOS surveillance system",
      severity: "critical",
      timestamp: new Date().toISOString(),
      acknowledged: false,
    },
    {
      id: `A-2`,
      type: "outbreak",
      title: "Dengue cluster detected in Pune - 12 cases in 48h",
      description: "Auto-detected by SwasthyaOS surveillance system",
      severity: "critical",
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      district: "Pune",
      acknowledged: false,
    },
    {
      id: `A-3`,
      type: "inventory",
      title: "Paracetamol stock below threshold - reorder needed",
      description: "Auto-detected by SwasthyaOS surveillance system",
      severity: "warning",
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      acknowledged: false,
    },
  ];

  const aiEvents = [
    {
      id: `AI-1`,
      type: "diagnosis",
      message: "Suspected Dengue Fever - recommend NS1 antigen test",
      confidence: 87,
      awsService: "Bedrock",
      timestamp: new Date().toISOString(),
      latencyMs: 450,
    },
    {
      id: `AI-2`,
      type: "prescription",
      message: "Generated Rx: Azithromycin 500mg OD x 3 days",
      confidence: 92,
      awsService: "Bedrock",
      timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
      latencyMs: 320,
    },
    {
      id: `AI-3`,
      type: "alert",
      message: "Drug interaction detected: Metformin + contrast dye",
      confidence: 98,
      awsService: "Comprehend",
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      latencyMs: 210,
    },
    {
      id: `AI-4`,
      type: "insight",
      message: "Pattern: 23% increase in ILI cases this week",
      confidence: 85,
      awsService: "SageMaker",
      timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      latencyMs: 510,
    },
  ];

  const metricsObj = {
    id: "dashboard-metrics",
    totalPatients: 847,
    waitingPatients: 5,
    avgWaitTime: 23,
    bedOccupancy: 78,
    aiRecommendations: 156,
    acceptanceRate: 87.6,
    criticalAlerts: 2,
    consultationsToday: 89,
    updatedAt: new Date().toISOString(),
  };

  // 3. Seed the data
  console.log("🌱 Seeding Alerts...");
  for (const alert of alerts) {
    try {
      await ddbDocClient.send(new PutCommand({ TableName: TABLES.ALERTS, Item: alert }));
    } catch (e) {
      console.error(`❌ Failed to seed alert ${alert.id}:`, e);
    }
  }

  console.log("🌱 Seeding AI Events...");
  for (const event of aiEvents) {
    try {
      await ddbDocClient.send(new PutCommand({ TableName: TABLES.AI_EVENTS, Item: event }));
    } catch (e) {
      console.error(`❌ Failed to seed AI event ${event.id}:`, e);
    }
  }

  console.log("🌱 Seeding Metrics...");
  try {
    await ddbDocClient.send(new PutCommand({ TableName: TABLES.METRICS, Item: metricsObj }));
  } catch (e) {
    console.error(`❌ Failed to seed metrics:`, e);
  }

  console.log("\n✨ Dashboard Data Seeding Complete!");
}

seedDashboardData().catch((err) => {
  console.error("Critical error during dashboard data seeding:", err);
  process.exit(1);
});
