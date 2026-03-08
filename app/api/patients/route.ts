import { NextResponse } from "next/server";
import { getAllPatients } from "@/lib/db/patients";

export async function GET() {
  try {
    const patients = await getAllPatients();
    return NextResponse.json({
      patients,
      status: patients.length > 0 ? "success" : "demo",
      count: patients.length,
      lastUpdated: new Date().toISOString()
    });
  } catch (error: any) {
    console.error("❌ API Error fetching patients:", error);
    return NextResponse.json(
      { 
        patients: [],
        status: "error",
        count: 0,
        error: "Failed to fetch patients",
        lastUpdated: new Date().toISOString()
      },
      { status: 200 } // Return 200 to prevent UI errors
    );
  }
}
