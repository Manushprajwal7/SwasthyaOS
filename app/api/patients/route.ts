import { NextResponse } from "next/server";
import { getAllPatients } from "@/lib/db/patients";

export async function GET() {
  try {
    const patients = await getAllPatients();
    return NextResponse.json(patients);
  } catch (error) {
    console.error("API Error fetching patients:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
