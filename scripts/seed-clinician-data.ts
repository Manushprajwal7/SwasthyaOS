import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

import { DynamoDBClient, CreateTableCommand, ResourceInUseException } from "@aws-sdk/client-dynamodb";
import { PutCommand, UpdateCommand, GetCommand } from "@aws-sdk/lib-dynamodb";

const region = process.env.AWS_REGION || "ap-south-1";
const credentials = {
  accessKeyId: process.env.Access_Key_ID || "",
  secretAccessKey: process.env.Secret_Access_Key || "",
};

const ddbClient = new DynamoDBClient({ region, credentials });

async function seedClinicianData() {
  const { ddbDocClient, TABLES } = await import("../lib/db/aws-sdk");

  console.log("🚀 Starting Clinician Data Seeding...");

  // 1. Create PatientHistory Table
  try {
    console.log(`Checking table: ${TABLES.PATIENT_HISTORY}...`);
    await ddbClient.send(
      new CreateTableCommand({
        TableName: TABLES.PATIENT_HISTORY,
        KeySchema: [
          { AttributeName: "patientId", KeyType: "HASH" },
          { AttributeName: "visitId", KeyType: "RANGE" }
        ],
        AttributeDefinitions: [
          { AttributeName: "patientId", AttributeType: "S" },
          { AttributeName: "visitId", AttributeType: "S" }
        ],
        BillingMode: "PAY_PER_REQUEST",
      })
    );
    console.log(`✅ Created table: ${TABLES.PATIENT_HISTORY}`);
    await new Promise((resolve) => setTimeout(resolve, 5000));
  } catch (error: any) {
    if (error instanceof ResourceInUseException || error.name === "ResourceInUseException") {
      console.log(`ℹ️ Table ${TABLES.PATIENT_HISTORY} already exists.`);
    } else {
      console.error(`❌ Error creating table:`, error);
      throw error;
    }
  }

  // 2. Ensure an active patient exists with rich info
  const activePatientId = "P-2401"; // Meera Singh
  try {
    await ddbDocClient.send(
      new UpdateCommand({
        TableName: TABLES.PATIENTS,
        Key: { id: activePatientId },
        UpdateExpression: "SET #status = :status, bloodGroup = :bg, allergies = :allergies",
        ExpressionAttributeNames: { "#status": "status" },
        ExpressionAttributeValues: {
          ":status": "in-consultation",
          ":bg": "B+",
          ":allergies": ["Penicillin", "Dust Mites"],
        },
      })
    );
    console.log(`✅ Updated patient ${activePatientId} to active/in-consultation with metadata`);
  } catch (error) {
    console.error("❌ Failed to update active patient:", error);
  }

  // 3. Seed Mock History for that patient
  const mockHistory = [
    {
      patientId: activePatientId,
      visitId: "V-2023-10-15",
      date: "2023-10-15",
      reason: "Diabetes Review",
      summary: "HbA1c: 7.2% | Medication adjusted",
      notes: "Patient advised on diet control.",
    },
    {
      patientId: activePatientId,
      visitId: "V-2023-07-22",
      date: "2023-07-22",
      reason: "Annual Physical",
      summary: "All vitals normal",
      notes: "Routine checkup completed.",
    },
    {
      patientId: "P-2402",
      visitId: "V-2024-01-10",
      date: "2024-01-10",
      reason: "Fever and Cough",
      summary: "Prescribed antibiotics",
      notes: "Suspected viral infection.",
    }
  ];

  console.log("🌱 Seeding Patient History...");
  for (const history of mockHistory) {
    try {
      await ddbDocClient.send(
        new PutCommand({
          TableName: TABLES.PATIENT_HISTORY,
          Item: history,
        })
      );
    } catch (e) {
      console.error(`❌ Failed to seed history for ${history.patientId}:`, e);
    }
  }

  console.log("\n✨ Clinician Data Seeding Complete!");
}

seedClinicianData().catch((err) => {
  console.error("Critical error during clinician data seeding:", err);
  process.exit(1);
});
