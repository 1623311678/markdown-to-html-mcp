/* @source cursor @line_count 13  @branch main*/
import { z } from "zod";
import { marked } from "marked";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

/**
 * 注册 markdownToHtml MCP 工具到指定 server
 */
export function registerMarkdownToHtmlTool(server: McpServer) {
  server.tool(
    "markdownToHtml",
    {
      markdown: z.string().describe("要转换为HTML的Markdown文本"),
    },
    async ({ markdown }: { markdown: string }) => ({
      content: [
        {
          type: "text",
          text: String(marked.parse(markdown)),
        },
      ],
    })
  );
}