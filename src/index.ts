/* @source cursor @line_count 26  @branch feat/xxx*/
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
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

export type MarkdownToHtmlArgs = { markdown: string }; 