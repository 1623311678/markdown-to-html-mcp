# @hun-dun/markdown-to-html-mcp

## 项目简介

本项目基于 [modelcontextprotocol/typescript-sdk](https://github.com/modelcontextprotocol/typescript-sdk) 实现 Markdown 转 HTML 的 MCP 服务端，支持 npx/全局命令一键启动、远程 HTTP/Streamable HTTP 调用，并可被 Cursor 等 MCP 客户端直接调用。

## 特性
- 支持 ESM/CJS 双产物，适配多种 Node.js 环境
- 一键 npx/全局命令启动（stdio）
- 支持 HTTP/Streamable HTTP 服务
- 结构现代，类型安全，源码位于 `src/`，产物位于 `dist/`（ESM）和 `dist-cjs/`（CJS）
- bin/主入口均指向 CJS 产物，兼容性强
- 可被 Cursor、curl、代码等多种方式远程调用

## 快速开始

### 安装依赖
```bash
npm install
```

### 构建产物
```bash
npm run build
```

### 本地启动（stdio）
```bash
npx ts-node src/cli.ts
# 或
npm run start
```

### 启动 HTTP 服务
```bash
npx ts-node src/cli.ts --http
# 或
node dist-cjs/cli.js --http
```

### 作为全局命令/被 Cursor 调用
```bash
npx @hun-dun/markdown-to-html-mcp
# 或
markdown-to-html-mcp
```

### 远程 HTTP/Streamable HTTP 调用
```bash
curl -X POST http://localhost:3000/mcp -H 'Content-Type: application/json' -H 'Accept: application/json, text/event-stream' -d '{"tool":"markdownToHtml","input":{"markdown":"# Hello"}}'
```

### ESM/CJS 产物说明
- ESM 产物位于 `dist/`，入口 `dist/index.js`
- CJS 产物位于 `dist-cjs/`，入口 `dist-cjs/index.js`
- bin/主入口均指向 CJS 产物，兼容 npx/全局命令

## MCP 工具注册与调用
- `registerMarkdownToHtmlTool(server)` 注册 markdownToHtml 工具，参数为 markdown，返回 HTML。
- CLI 支持 stdio 和 HTTP 两种模式。

## 在 Cursor 中调用

本工具可直接集成到 Cursor，支持本地（stdio）和远程（http）两种方式：

### 方式一：本地调用（stdio，推荐本地开发/临时调用）

在 `.cursor/config.json` 中添加如下配置：

```json
{
  "mcp": [
    {
      "name": "@hun-dun/markdown-to-html-mcp (本地 npx)",
      "type": "stdio",
      "command": "npx",
      "args": ["@hun-dun/markdown-to-html-mcp"]
    }
  ]
}
```
- Cursor 会自动用 npx 下载并调用你的包，适合本地/临时场景。
- 不需要你手动启动服务端。
- 结果会直接在 Cursor 工具面板中展示。

### 方式二：远程调用（http，推荐云端/团队共享）

1. 启动 HTTP 服务：
   ```bash
   npx @hun-dun/markdown-to-html-mcp --http
   # 或 PORT=8080 npx @hun-dun/markdown-to-html-mcp --http
   ```
2. 在 `.cursor/config.json` 中添加如下配置：

```json
{
  "mcp": [
    {
      "name": "@hun-dun/markdown-to-html-mcp (remote)",
      "type": "http",
      "url": "http://localhost:3000/mcp"
    }
  ]
}
```
- 适合你用 `npx @hun-dun/markdown-to-html-mcp --http` 启动服务后，供多台机器/团队成员/云端调用。
- 结果会直接在 Cursor 工具面板中展示。

## 常见问题
- ts-node 运行 .ts 文件报 "Unknown file extension .ts"——需加 `--loader ts-node/esm`
- node 运行 dist/index.js 报 "exports is not defined in ES module scope"——需用 CommonJS 产物并移除 package.json 的 "type": "module"，或用 .cjs 后缀
- StreamableHTTPServerTransport 构造参数报错，需根据 SDK 版本传递正确 options

## 适用场景
- 本地开发、测试
- 远程 HTTP/Streamable HTTP 服务
- Cursor、MCP 客户端一键集成
- 代码/脚本/命令行调用

## License
MIT
