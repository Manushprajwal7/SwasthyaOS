import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { S3Client } from "@aws-sdk/client-s3";

const region = process.env.AWS_REGION || "ap-south-1";

// Use IAM roles in production (Amplify), fallback to env vars for local development
const getCredentials = () => {
  // In production (Amplify), use IAM roles automatically
  if (process.env.NODE_ENV === 'production' || process.env.AMPLIFY_ENV) {
    return undefined; // Let AWS SDK use IAM role from environment
  }
  
  // Local development - use environment variables
  return {
    accessKeyId: process.env.Access_Key_ID || process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.Secret_Access_Key || process.env.AWS_SECRET_ACCESS_KEY || "",
  };
};

// DynamoDB Client
const ddbClient = new DynamoDBClient({ 
  region, 
  credentials: getCredentials() 
});

// DynamoDB Document Client (more convenient for JSON)
export const ddbDocClient = DynamoDBDocumentClient.from(ddbClient, {
  marshallOptions: {
    removeUndefinedValues: true,
  },
});

// S3 Client
export const s3Client = new S3Client({ 
  region, 
  credentials: getCredentials() 
});

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
