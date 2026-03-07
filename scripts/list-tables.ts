import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

import { ListTablesCommand } from "@aws-sdk/client-dynamodb";

async function listTables() {
  const { ddbDocClient } = await import("../lib/db/aws-sdk");
  
  console.log("Checking tables in region:", process.env.AWS_REGION || "ap-south-1");
  try {
    const result = await ddbDocClient.send(new ListTablesCommand({}));
    console.log("Found tables:", result.TableNames);
  } catch (err) {
    console.error("Error listing tables:", err);
  }
}

listTables();
