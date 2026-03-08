import { config } from "dotenv";
config({ path: ".env" });
import { invokeClaude } from "../lib/ai/bedrock-client";

async function test() {
  try {
    console.log("Invoking Bedrock...");
    const result = await invokeClaude("You are a test AI.", "Say hello.", 0.2);
    console.log("Success! Result:", result);
  } catch (error: any) {
    console.error("Test failed:", error.message, error.name);
  }
}

test();
