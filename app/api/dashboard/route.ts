import { NextResponse } from "next/server";
import { getDashboardData } from "@/lib/db/dashboard";
import { getAllPatients } from "@/lib/db/patients";
import { generateDemoMetrics, generateDemoAlerts, generateDemoAIEvents } from "@/lib/mock-data";

export const dynamic = "force-dynamic";

// Fallback data for when database is unavailable
const getFallbackData = () => ({
  alerts: generateDemoAlerts(),
  aiEvents: generateDemoAIEvents(),
  metrics: generateDemoMetrics(),
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
        status: dashboardData?.metrics ? "success" : "demo",
        lastUpdated: new Date().toISOString()
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
        ...getFallbackData(),
        status: "demo",
        lastUpdated: new Date().toISOString(),
        error: "Showing demo data - Database connection unavailable in production environment"
      },
      { status: 200 } // Return 200 with fallback data instead of 500
    );
  }
}
