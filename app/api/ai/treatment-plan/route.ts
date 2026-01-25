import { NextRequest, NextResponse } from "next/server";
import { generateTreatmentPlan } from "@/lib/ai/medical-ai";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { symptoms, vitals, patientAge, patientHistory } = body;

    if (!symptoms || !Array.isArray(symptoms) || !patientAge) {
      return NextResponse.json(
        { error: "Symptoms and patient age are required" },
        { status: 400 },
      );
    }

    const treatmentPlan = await generateTreatmentPlan(
      symptoms,
      vitals,
      patientAge,
      patientHistory,
    );

    return NextResponse.json({ treatmentPlan });
  } catch (error) {
    console.error("Error in treatment plan API:", error);
    return NextResponse.json(
      { error: "Failed to generate treatment plan" },
      { status: 500 },
    );
  }
}
