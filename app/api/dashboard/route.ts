import { NextResponse } from "next/server";
import { getDashboardData } from "@/lib/db/dashboard";
import { getAllPatients } from "@/lib/db/patients";

export const dynamic = "force-dynamic";

// Fallback data for when database is unavailable
const getFallbackData = () => ({
  alerts: [
    {
      id: "1",
      type: "warning",
      message: "Database connection temporarily unavailable",
      timestamp: new Date().toISOString(),
      severity: "medium"
    }
  ],
  aiEvents: [
    {
      id: "1",
      type: "system",
      event: "Dashboard initialized with fallback data",
      timestamp: new Date().toISOString(),
      confidence: 0.95
    }
  ],
  metrics: {
    totalPatients: 0,
    waitingPatients: 0,
    avgWaitTime: 0,
    bedOccupancy: 0,
    aiRecommendations: 0,
    acceptanceRate: 0,
    criticalAlerts: 0,
    consultationsToday: 0,
  },
  patients: []
});

export async function GET() {
  try {
    const [dashboardData, patients] = await Promise.all([
      getDashboardData().catch(err => {
        console.error("⚠️ Dashboard data fetch failed, using fallback:", err.message);
        return getFallbackData();
      }),
      getAllPatients().catch(err => {
        console.error("⚠️ Patients data fetch failed, using fallback:", err.message);
        return [];
      })
    ]);

    // Construct unified payload
    return NextResponse.json(
      {
        alerts: dashboardData.alerts || getFallbackData().alerts,
        aiEvents: dashboardData.aiEvents || getFallbackData().aiEvents,
        metrics: dashboardData.metrics || getFallbackData().metrics,
        patients: patients || [],
        status: dashboardData?.metrics ? "success" : "fallback"
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error: any) {
    console.error("❌ API Error fetching dashboard data:", error);
    
    // Return fallback data instead of error
    const fallbackData = getFallbackData();
    return NextResponse.json(
      { 
        ...fallbackData,
        status: "error",
        error: "Using fallback data due to database connectivity issues"
      },
      { status: 200 } // Return 200 with fallback data instead of 500
    );
  }
}
