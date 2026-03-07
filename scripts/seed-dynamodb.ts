import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

import { PutCommand } from "@aws-sdk/lib-dynamodb";

/**
 * Script to seed DynamoDB with initial patient records
 * Run with: npx tsx scripts/seed-dynamodb.ts
 */
async function seedPatients() {
  // Dynamically import to ensure env vars are loaded first
  const { ddbDocClient, TABLES } = await import("../lib/db/aws-sdk");
  const { MOCK_PATIENTS } = await import("../lib/db/patients");

  console.log("🚀 Starting DynamoDB Seeding...");
  console.log(`Region: ${process.env.AWS_REGION || "ap-south-1"}`);
  console.log(`Table: ${TABLES.PATIENTS}`);

  for (const patient of MOCK_PATIENTS) {
    try {
      await ddbDocClient.send(
        new PutCommand({
          TableName: TABLES.PATIENTS,
          Item: patient,
        })
      );
      console.log(`✅ Seeded patient: ${patient.name} (${patient.uhid})`);
    } catch (error) {
      console.error(`❌ Failed to seed patient ${patient.name}:`, error);
    }
  }

  console.log("\n✨ Seeding Complete!");
}

// Run the script
seedPatients().catch((err) => {
  console.error("Critical error during seeding:", err);
  process.exit(1);
});
