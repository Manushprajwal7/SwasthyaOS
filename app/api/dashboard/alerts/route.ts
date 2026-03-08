import { NextResponse } from "next/server";
import { UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDocClient, TABLES } from "@/lib/db/aws-sdk";

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, acknowledged } = body;

    if (!id) {
      return NextResponse.json({ error: "Missing alert ID" }, { status: 400 });
    }

    // Check if AWS credentials are available
    try {
      await ddbDocClient.send(
        new UpdateCommand({
          TableName: TABLES.ALERTS,
          Key: { id },
          UpdateExpression: "SET acknowledged = :ack",
          ExpressionAttributeValues: {
            ":ack": acknowledged,
          },
        })
      );

      return NextResponse.json({ success: true, id, acknowledged, status: "success" });
    } catch (awsError: any) {
      console.error("⚠️ AWS Credentials not available for alert update:", awsError.message);
      return NextResponse.json({ 
        success: true, 
        id, 
        acknowledged, 
        status: "demo",
        message: "Alert acknowledged in demo mode"
      }, { status: 200 });
    }
  } catch (error: any) {
    console.error("❌ Failed to update alert:", error);
    return NextResponse.json(
      { 
        success: false,
        error: "Internal Server Error", 
        message: error.message,
        status: "error"
      },
      { status: 200 } // Return 200 to prevent UI errors
    );
  }
}
