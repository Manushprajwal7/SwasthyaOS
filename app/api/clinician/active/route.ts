import { NextResponse } from "next/server";
import { ddbDocClient, TABLES } from "@/lib/db/aws-sdk";
import { ScanCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
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
      return NextResponse.json(
        { message: "No active patient in consultation", patient: null, history: [] },
        { status: 200 }
      );
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
    });
  } catch (error: any) {
    console.error("❌ API Error fetching clinician data:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: error.message },
      { status: 500 }
    );
  }
}
