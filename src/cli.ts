/* @source cursor @line_count 50  @branch feat/xxx*/
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerMarkdownToHtmlTool } from "./index.js";

async function startStdio() {
  const server = new McpServer({
    name: "markdown-to-html-mcp",
    version: "1.0.0",
  });
  registerMarkdownToHtmlTool(server);
  const transport = new StdioServerTransport();
  await server.connect(transport);
  process.stdin.resume();
}

async function startHttp() {
  const express = (await import("express")).default;
  const { StreamableHTTPServerTransport } = await import(
    "@modelcontextprotocol/sdk/server/streamableHttp.js"
  );
  const app = express();
  app.use(express.json());
  app.post(
    "/mcp",
    async (req: import("express").Request, res: import("express").Response) => {
      const server = new McpServer({
        name: "markdown-to-html-mcp",
        version: "1.0.0",
      });
      registerMarkdownToHtmlTool(server);
      const transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: undefined,
      });
      await server.connect(transport);
      await transport.handleRequest(req, res, req.body);
    }
  );
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`MCP HTTP server listening on port ${port}`);
  });
}

if (process.argv.includes("--http")) {
  startHttp();
} else {
  startStdio();
}
