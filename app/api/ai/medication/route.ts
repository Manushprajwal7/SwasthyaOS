import { NextRequest, NextResponse } from "next/server";
import { generateMedicationSuggestions } from "@/lib/ai/medical-ai";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { diagnosis, patientAge, allergies } = body;

    if (!diagnosis || !patientAge) {
      return NextResponse.json(
        { error: "Diagnosis and patient age are required" },
        { status: 400 },
      );
    }

    const suggestions = await generateMedicationSuggestions(
      diagnosis,
      patientAge,
      allergies,
    );

    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error("Error in medication API:", error);
    return NextResponse.json(
      { error: "Failed to generate medication suggestions" },
      { status: 500 },
    );
  }
}
