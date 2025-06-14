/* @source cursor @line_count 53  @branch main*/
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { marked } from "marked";

/**
 * 注册 markdownToHtml MCP 工具到指定 server
 */
export function registerMarkdownToHtmlTool(server: McpServer) {
  server.tool(
    "markdownToHtml",
    {
      markdown: z.string().describe("要转换为HTML的Markdown文本")
    },
    async ({ markdown }) => ({
      content: [
        {
          type: "text",
          text: await marked.parse(markdown)
        }
      ]
    })
  );
}

// 允许独立运行
if (process.argv[1] && process.argv[1].endsWith("markdown-to-html-mcp.ts")) {
  const server = new McpServer({
    name: "markdown-to-html-mcp",
    version: "1.0.0"
  });
  registerMarkdownToHtmlTool(server);
  const transport = new StdioServerTransport();
  (async () => {
    await server.connect(transport);
    process.stdin.resume();
  })();
}

// 导出类型，便于类型检查
export type {}; 