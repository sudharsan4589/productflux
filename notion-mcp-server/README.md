# Notion MCP Server

Official MCP server for Notion API integration.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```
NOTION_API_KEY=your_notion_api_key_here
NOTION_API_BASE_URL=https://api.notion.com/v1
PORT=3000
```

3. Start the development server:
```bash
npm run dev
```

## API Endpoints

- `GET /health`: Health check endpoint
- `POST /mcp/query`: MCP query endpoint

## Development

- `npm run dev`: Start development server with hot reload
- `npm run build`: Build the project

## Environment Variables

- `NOTION_API_KEY`: Your Notion API key
- `NOTION_API_BASE_URL`: Notion API base URL (default: https://api.notion.com/v1)
- `PORT`: Server port (default: 3000) 