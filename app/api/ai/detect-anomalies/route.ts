import { NextRequest, NextResponse } from "next/server";
import { detectHealthAnomalies } from "@/lib/ai/population-health-ai";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { districtData } = body;

    if (!districtData || !Array.isArray(districtData)) {
      return NextResponse.json(
        { error: "District data array is required" },
        { status: 400 },
      );
    }

    const anomalies = await detectHealthAnomalies(districtData);

    return NextResponse.json({ anomalies });
  } catch (error) {
    console.error("Error detecting anomalies:", error);
    return NextResponse.json(
      { error: "Failed to detect health anomalies" },
      { status: 500 },
    );
  }
}
