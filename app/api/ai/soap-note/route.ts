import { NextRequest, NextResponse } from "next/server";
import { generateSOAPNote } from "@/lib/ai/chat-ai";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { subjective, objective, vitalSigns } = body;

    if (!subjective || !objective) {
      return NextResponse.json(
        { error: "Subjective and objective findings are required" },
        { status: 400 },
      );
    }

    const soapNote = await generateSOAPNote(subjective, objective, vitalSigns);

    return NextResponse.json({ soapNote });
  } catch (error) {
    console.error("Error generating SOAP note:", error);
    return NextResponse.json(
      { error: "Failed to generate SOAP note" },
      { status: 500 },
    );
  }
}
