import { NextRequest, NextResponse } from "next/server";
import { analyzeRuralSymptoms } from "@/lib/ai/medical-ai";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { symptoms, vitals } = body;

    if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
      return NextResponse.json(
        { error: "Symptoms are required" },
        { status: 400 },
      );
    }

    const analysis = await analyzeRuralSymptoms(symptoms, vitals);

    return NextResponse.json({ analysis });
  } catch (error) {
    console.error("Error in rural analysis API:", error);
    return NextResponse.json(
      { error: "Failed to analyze symptoms" },
      { status: 500 },
    );
  }
}
