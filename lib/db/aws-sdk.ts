import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { S3Client } from "@aws-sdk/client-s3";

const region = process.env.AWS_REGION || "ap-south-1";
const credentials = {
  accessKeyId: process.env.Access_Key_ID || "",
  secretAccessKey: process.env.Secret_Access_Key || "",
};

// DynamoDB Client
const ddbClient = new DynamoDBClient({ region, credentials });

// DynamoDB Document Client (more convenient for JSON)
export const ddbDocClient = DynamoDBDocumentClient.from(ddbClient, {
  marshallOptions: {
    removeUndefinedValues: true,
  },
});

// S3 Client
export const s3Client = new S3Client({ region, credentials });

// Table Names (configurable via env)
export const TABLES = {
  PATIENTS: process.env.DYNAMODB_TABLE_PATIENTS || "Swasthya_Patients",
  APPOINTMENTS: process.env.DYNAMODB_TABLE_APPOINTMENTS || "Swasthya_Appointments",
  ALERTS: process.env.DYNAMODB_TABLE_ALERTS || "Swasthya_Alerts",
  AUDIT_LOGS: process.env.DYNAMODB_TABLE_AUDIT_LOGS || "Swasthya_AuditLogs",
  AI_EVENTS: process.env.DYNAMODB_TABLE_AI_EVENTS || "Swasthya_AIEvents",
  METRICS: process.env.DYNAMODB_TABLE_METRICS || "Swasthya_Metrics",
  PATIENT_HISTORY: process.env.DYNAMODB_TABLE_PATIENT_HISTORY || "Swasthya_PatientHistory",
};

// S3 Bucket Names
export const BUCKETS = {
  CLINICAL_DOCS: process.env.S3_BUCKET_DOCS || "swasthya-clinical-documents",
};
