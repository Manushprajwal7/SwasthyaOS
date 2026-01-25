import { NextRequest, NextResponse } from "next/server";
import { generateSituationReport } from "@/lib/ai/population-health-ai";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { timeframe, districtData, alerts } = body;

    if (!timeframe || !districtData) {
      return NextResponse.json(
        { error: "Timeframe and district data are required" },
        { status: 400 },
      );
    }

    const report = await generateSituationReport(
      timeframe,
      districtData,
      alerts || [],
    );

    return NextResponse.json({ report });
  } catch (error) {
    console.error("Error generating situation report:", error);
    return NextResponse.json(
      { error: "Failed to generate situation report" },
      { status: 500 },
    );
  }
}
