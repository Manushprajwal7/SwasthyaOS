import { NextResponse } from "next/server";
import { getDashboardData } from "@/lib/db/dashboard";
import { getAllPatients } from "@/lib/db/patients";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [dashboardData, patients] = await Promise.all([
      getDashboardData(),
      getAllPatients(),
    ]);

    // Construct unified payload
    return NextResponse.json(
      {
        alerts: dashboardData.alerts,
        aiEvents: dashboardData.aiEvents,
        metrics: dashboardData.metrics,
        patients: patients,
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error: any) {
    console.error("❌ API Error fetching dashboard data:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: error.message },
      { status: 500 }
    );
  }
}
