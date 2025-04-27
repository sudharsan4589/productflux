export const config = {
  baseUrl: process.env.NOTION_API_BASE_URL || 'https://api.notion.com/v1',
  port: process.env.PORT || 3000,
  apiKey: process.env.NOTION_API_KEY
}; 