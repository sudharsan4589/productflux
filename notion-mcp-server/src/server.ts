import express from 'express';
import { ModelContextProtocol } from '@modelcontextprotocol/sdk';
import { createServer } from 'http';
import { config } from './config';

const app = express();
export const server = createServer(app);

// Initialize MCP
const mcp = new ModelContextProtocol({
  apiKey: process.env.NOTION_API_KEY,
  baseUrl: config.baseUrl
});

// Middleware
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    version: '1.6.0',
    mcpConnected: mcp.isConnected()
  });
});

// MCP endpoints
app.post('/mcp/query', async (req, res) => {
  try {
    const response = await mcp.query(req.body);
    res.json(response);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Notion MCP Server running on port ${PORT}`);
}); 