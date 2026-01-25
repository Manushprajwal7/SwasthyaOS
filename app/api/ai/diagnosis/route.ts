import { NextRequest, NextResponse } from "next/server";
import { generateDiagnosisSuggestions } from "@/lib/ai/medical-ai";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { symptoms, vitals, patientHistory } = body;

    if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
      return NextResponse.json(
        { error: "Symptoms are required" },
        { status: 400 },
      );
    }

    const suggestions = await generateDiagnosisSuggestions(
      symptoms,
      vitals,
      patientHistory,
    );

    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error("Error in diagnosis API:", error);
    return NextResponse.json(
      { error: "Failed to generate diagnosis suggestions" },
      { status: 500 },
    );
  }
}
