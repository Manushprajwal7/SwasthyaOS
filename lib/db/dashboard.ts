import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDocClient, TABLES } from "./aws-sdk";

export async function getDashboardData() {
  try {
    // We launch all scans concurrently for performance
    const [alertsRes, aiEventsRes, metricsRes] = await Promise.all([
      ddbDocClient.send(new ScanCommand({ TableName: TABLES.ALERTS })),
      ddbDocClient.send(new ScanCommand({ TableName: TABLES.AI_EVENTS })),
      ddbDocClient.send(new ScanCommand({ TableName: TABLES.METRICS })),
    ]);

    // Format metrics (assume single row for dashboard metrics)
    const metricsItem = metricsRes.Items && metricsRes.Items.length > 0
      ? metricsRes.Items[0]
      : {
          totalPatients: 0,
          waitingPatients: 0,
          avgWaitTime: 0,
          bedOccupancy: 0,
          aiRecommendations: 0,
          acceptanceRate: 0,
          criticalAlerts: 0,
          consultationsToday: 0,
        };

    // Sort alerts by timestamp descending
    const alerts = (alertsRes.Items || []).sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    // Sort AI events by timestamp descending
    const aiEvents = (aiEventsRes.Items || []).sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    return {
      alerts,
      aiEvents,
      metrics: metricsItem,
    };
  } catch (error) {
    console.error("❌ Failed to fetch dashboard data from DynamoDB:", error);
    throw error;
  }
}
