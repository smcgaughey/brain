// Test script for per-user MCP endpoint (authenticated)
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";

const MCP_URL = "https://brainstem.cc/mcp/66e64220-2136-4951-982d-71770db10689";
const BEARER_TOKEN = process.env.BRAINSTEM_TOKEN || "7df9396a-dbf3-4f5a-bd0f-b337659c152d";

async function main() {
  console.log("Connecting to:", MCP_URL);

  const transport = new SSEClientTransport(new URL(MCP_URL), {
    requestInit: {
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    },
  });
  const client = new Client({ name: "test-client", version: "1.0.0" });

  await client.connect(transport);
  console.log("Connected!");

  const tools = await client.listTools();
  console.log("\n=== Available Tools ===");
  console.log(JSON.stringify(tools, null, 2));

  await client.close();
}

main().catch(console.error);
