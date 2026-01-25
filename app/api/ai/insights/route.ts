import { NextRequest, NextResponse } from "next/server";
import { generateDashboardInsights } from "@/lib/ai/insights-ai";

export async function GET(request: NextRequest) {
  try {
    console.log("Generating AI insights...");

    const insights = await generateDashboardInsights();

    console.log("AI insights generated successfully");

    return NextResponse.json(insights);
  } catch (error) {
    console.error("Error in insights API:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to generate insights", details: errorMessage },
      { status: 500 },
    );
  }
}
