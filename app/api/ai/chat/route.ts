import { NextRequest, NextResponse } from "next/server";
import { getMedicalChatResponse } from "@/lib/ai/chat-ai";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, userRole } = body;

    console.log("Chat API called with:", {
      messagesCount: messages?.length,
      userRole,
    });

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 },
      );
    }

    if (!userRole || !["doctor", "frontline", "admin"].includes(userRole)) {
      return NextResponse.json(
        { error: "Valid user role is required" },
        { status: 400 },
      );
    }

    const response = await getMedicalChatResponse(messages, userRole);
    console.log("Chat response generated successfully");

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Error in chat API:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to generate chat response", details: errorMessage },
      { status: 500 },
    );
  }
}
