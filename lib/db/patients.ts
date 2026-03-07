import { GetCommand, PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDocClient, TABLES } from "./aws-sdk";

export interface Patient {
  id: string;
  uhid: string;
  abhaId: string;
  name: string;
  age: number;
  gender: string;
  lastVisit: string;
  status: "active" | "inactive" | "critical";
  bloodGroup?: string;
  phone?: string;
  district?: string;
}

// Official Mock Patient Data (from spec)
export const MOCK_PATIENTS: Patient[] = [
  {
    id: "P-2401",
    uhid: "UHID-MH-2024-001234",
    abhaId: "9123-4567-8901-2345",
    name: "Meera Singh",
    age: 34,
    gender: "F",
    lastVisit: "2024-01-24",
    status: "active",
    bloodGroup: "B+",
    phone: "+91 98765 43210",
    district: "Pune",
  },
  {
    id: "P-2402",
    uhid: "UHID-MH-2024-001235",
    abhaId: "8234-5678-9012-3456",
    name: "Ajay Kumar",
    age: 28,
    gender: "M",
    lastVisit: "2024-01-24",
    status: "critical",
    bloodGroup: "O+",
    phone: "+91 87654 32109",
    district: "Mumbai",
  },
  {
    id: "P-2403",
    uhid: "UHID-DL-2024-002145",
    abhaId: "7345-6789-0123-4567",
    name: "Priya Sharma",
    age: 45,
    gender: "F",
    lastVisit: "2024-01-23",
    status: "active",
    bloodGroup: "A+",
    phone: "+91 76543 21098",
    district: "Delhi",
  },
  {
    id: "P-2404",
    uhid: "UHID-KA-2024-003456",
    abhaId: "6456-7890-1234-5678",
    name: "Rajesh Patel",
    age: 52,
    gender: "M",
    lastVisit: "2024-01-22",
    status: "inactive",
    bloodGroup: "AB+",
    phone: "+91 65432 10987",
    district: "Bengaluru",
  },
  {
    id: "P-2405",
    uhid: "UHID-TN-2024-004567",
    abhaId: "5567-8901-2345-6789",
    name: "Lakshmi Naidu",
    age: 62,
    gender: "F",
    lastVisit: "2024-01-21",
    status: "active",
    bloodGroup: "O-",
    phone: "+91 54321 09876",
    district: "Chennai",
  },
  {
    id: "P-2406",
    uhid: "UHID-RJ-2024-005678",
    abhaId: "4678-9012-3456-7890",
    name: "Suresh Meena",
    age: 41,
    gender: "M",
    lastVisit: "2024-01-20",
    status: "active",
    bloodGroup: "B-",
    phone: "+91 43210 98765",
    district: "Jaipur",
  },
];

/**
 * Fetch all patients from DynamoDB with fallback to Mock Data
 */
export async function getAllPatients(): Promise<Patient[]> {
  console.log("🔍 Attempting to fetch patients from DynamoDB...");
  console.log(`🌍 Region: ${process.env.AWS_REGION}, Table: ${TABLES.PATIENTS}`);
  try {
    const result = await ddbDocClient.send(
      new ScanCommand({
        TableName: TABLES.PATIENTS,
      })
    );
    
    if (result.Items && result.Items.length > 0) {
      console.log(`✅ Successfully fetched ${result.Items.length} patients from DynamoDB!`);
      return result.Items as Patient[];
    }
    
    console.log("⚠️ DynamoDB returned empty result, falling back to mock data.");
    return MOCK_PATIENTS;
  } catch (error) {
    console.error("❌ DynamoDB Scan failed!", error);
    console.warn("🔄 Using fallback mock patients instead.");
    return MOCK_PATIENTS;
  }
}

/**
 * Fetch a single patient by ID
 */
export async function getPatientById(id: string): Promise<Patient | null> {
  console.log(`🔍 Attempting to fetch patient ${id} from DynamoDB...`);
  try {
    const result = await ddbDocClient.send(
      new GetCommand({
        TableName: TABLES.PATIENTS,
        Key: { id },
      })
    );
    
    if (result.Item) {
      console.log(`✅ Successfully fetched patient ${id} from DynamoDB!`);
      return result.Item as Patient;
    }
    
    console.log(`⚠️ Patient ${id} not found in DynamoDB, checking mock data.`);
    return MOCK_PATIENTS.find(p => p.id === id) || null;
  } catch (error) {
    console.error(`❌ Failed to fetch patient ${id} from DynamoDB:`, error);
    return MOCK_PATIENTS.find(p => p.id === id) || null;
  }
}

/**
 * Create or Update a patient record
 */
export async function savePatient(patient: Patient): Promise<void> {
  try {
    await ddbDocClient.send(
      new PutCommand({
        TableName: TABLES.PATIENTS,
        Item: patient,
      })
    );
  } catch (error) {
    console.error("Failed to save patient to DynamoDB:", error);
    throw error;
  }
}
