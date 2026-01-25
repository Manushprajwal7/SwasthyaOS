import { NextRequest, NextResponse } from "next/server";
import { generateDischargeSummary } from "@/lib/ai/medical-ai";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { patientName, diagnosis, treatment, medications, language } = body;

    if (!patientName || !diagnosis || !treatment) {
      return NextResponse.json(
        { error: "Patient name, diagnosis, and treatment are required" },
        { status: 400 },
      );
    }

    const summary = await generateDischargeSummary(
      patientName,
      diagnosis,
      treatment,
      medications || [],
      language || "en",
    );

    return NextResponse.json({ summary });
  } catch (error) {
    console.error("Error in discharge summary API:", error);
    return NextResponse.json(
      { error: "Failed to generate discharge summary" },
      { status: 500 },
    );
  }
}
