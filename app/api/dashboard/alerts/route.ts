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

    return NextResponse.json({ success: true, id, acknowledged });
  } catch (error: any) {
    console.error("❌ Failed to update alert:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: error.message },
      { status: 500 }
    );
  }
}
