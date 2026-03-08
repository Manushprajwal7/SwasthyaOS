import { NextResponse } from "next/server";
import { ddbDocClient, TABLES } from "@/lib/db/aws-sdk";
import { ScanCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";

export const dynamic = "force-dynamic";

// Fallback demo data for when database is unavailable
const getDemoData = () => ({
  message: "No active patient in consultation - Demo Mode",
  patient: null,
  history: [],
  status: "demo",
  demoData: true
});

// Demo patient for testing UI
const getDemoPatient = () => ({
  id: "demo-patient-001",
  name: "Rahul Kumar Sharma",
  age: 45,
  gender: "Male",
  phone: "+91-9876543210",
  email: "rahul.kumar@email.com",
  address: "123 Main Street, Civil Lines",
  city: "Nagpur",
  district: "Nagpur",
  state: "MH",
  pincode: "440001",
  bloodGroup: "O+",
  allergies: ["None reported"],
  status: "in-consultation",
  consultationId: "demo-consultation-001",
  assignedClinician: "Dr. Priya Singh",
  consultationStart: new Date().toISOString(),
  chiefComplaint: "Fever and cough for 3 days",
  vitals: {
    temperature: "38.5°C",
    bloodPressure: "120/80 mmHg",
    heartRate: "88 bpm",
    oxygenSaturation: "96%",
    respiratoryRate: "18 breaths/min"
  },
  initials: "RKS"
});

export async function GET() {
  try {
    // Check if AWS credentials are available
    try {
      // Test AWS connection with a simple operation
      await ddbDocClient.send(
        new ScanCommand({
          TableName: TABLES.PATIENTS,
          Limit: 1
        })
      );
    } catch (awsError: any) {
      console.error("⚠️ AWS Credentials not available, using demo data:", awsError.message);
      return NextResponse.json(getDemoData(), { status: 200 });
    }

    // 1. Find the active patient
    const scanResult = await ddbDocClient.send(
      new ScanCommand({
        TableName: TABLES.PATIENTS,
        FilterExpression: "#status = :status",
        ExpressionAttributeNames: { "#status": "status" },
        ExpressionAttributeValues: { ":status": "in-consultation" },
      })
    );

    if (!scanResult.Items || scanResult.Items.length === 0) {
      // Return demo patient for UI testing if no active patient
      return NextResponse.json({
        message: "No active patient in consultation - Showing demo patient",
        patient: getDemoPatient(),
        history: [],
        status: "demo"
      }, { status: 200 });
    }

    const patient = scanResult.Items[0];
    
    // Supplement fallback values if missing from DB for UI
    const enrichedPatient = {
      ...patient,
      district: patient.district || "Nagpur",
      state: patient.state || "MH",
      bloodGroup: patient.bloodGroup || "O+",
      allergies: patient.allergies || ["None reported"],
      initials: (patient.name as string)
        .split(" ")
        .map((n) => n[0])
        .join("")
        .substring(0, 2)
        .toUpperCase(),
    };

    // 2. Fetch history for this patient
    try {
      const historyResult = await ddbDocClient.send(
        new QueryCommand({
          TableName: TABLES.PATIENT_HISTORY,
          KeyConditionExpression: "patientId = :pid",
          ExpressionAttributeValues: {
            ":pid": patient.id,
          },
        })
      );

      const history = (historyResult.Items || []).sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      return NextResponse.json({
        patient: enrichedPatient,
        history,
        status: "success"
      });
    } catch (historyError: any) {
      console.error("⚠️ History fetch failed, returning patient only:", historyError.message);
      return NextResponse.json({
        patient: enrichedPatient,
        history: [],
        status: "partial",
        error: "History unavailable"
      }, { status: 200 });
    }
  } catch (error: any) {
    console.error("❌ API Error fetching clinician data:", error);
    
    // Return demo data instead of error
    return NextResponse.json({
      message: "System temporarily unavailable - Showing demo data",
      patient: getDemoPatient(),
      history: [],
      status: "demo",
      error: "Using demo data due to system issues"
    }, { status: 200 });
  }
}
