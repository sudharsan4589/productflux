import { config } from '../src/config';
import { server } from '../src/server';

// Start the server
server.listen(config.port, () => {
  console.log(`Notion MCP Server running on port ${config.port}`);
  console.log(`Base URL: ${config.baseUrl}`);
}); 