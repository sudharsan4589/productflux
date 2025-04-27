import { ModelContextProtocol } from '@modelcontextprotocol/sdk';

const mcp = new ModelContextProtocol({
  apiKey: process.env.NOTION_API_KEY,
  baseUrl: process.env.NOTION_API_BASE_URL || 'https://api.notion.com/v1'
});

// 1. Basic Text Query
async function testTextQuery() {
  try {
    const response = await mcp.query({
      model: "claude",
      messages: [{
        role: "user",
        content: "What is the capital of France?"
      }],
      context: {
        type: "text",
        content: "This is a simple text query test"
      }
    });
    console.log("Text Query Response:", response);
  } catch (error) {
    console.error("Text Query Error:", error);
  }
}

// 2. Database Query
async function testDatabaseQuery() {
  try {
    const response = await mcp.query({
      model: "claude",
      messages: [{
        role: "user",
        content: "List all tasks in the database"
      }],
      context: {
        type: "database",
        database_id: "your-database-id",
        filter: {
          property: "Status",
          status: {
            equals: "In Progress"
          }
        }
      }
    });
    console.log("Database Query Response:", response);
  } catch (error) {
    console.error("Database Query Error:", error);
  }
}

// 3. Page Content Query
async function testPageQuery() {
  try {
    const response = await mcp.query({
      model: "claude",
      messages: [{
        role: "user",
        content: "Summarize this page"
      }],
      context: {
        type: "page",
        page_id: "your-page-id",
        include_children: true
      }
    });
    console.log("Page Query Response:", response);
  } catch (error) {
    console.error("Page Query Error:", error);
  }
}

// 4. Block Query
async function testBlockQuery() {
  try {
    const response = await mcp.query({
      model: "claude",
      messages: [{
        role: "user",
        content: "What type of block is this?"
      }],
      context: {
        type: "block",
        block_id: "your-block-id",
        include_children: false
      }
    });
    console.log("Block Query Response:", response);
  } catch (error) {
    console.error("Block Query Error:", error);
  }
}

// 5. Search Query
async function testSearchQuery() {
  try {
    const response = await mcp.query({
      model: "claude",
      messages: [{
        role: "user",
        content: "Find all pages about AI"
      }],
      context: {
        type: "search",
        query: "AI",
        filter: {
          property: "object",
          value: ["page", "database"]
        }
      }
    });
    console.log("Search Query Response:", response);
  } catch (error) {
    console.error("Search Query Error:", error);
  }
}

// Run all tests
async function runTests() {
  console.log("Starting MCP Request Tests...");
  
  await testTextQuery();
  await testDatabaseQuery();
  await testPageQuery();
  await testBlockQuery();
  await testSearchQuery();
  
  console.log("All tests completed");
}

runTests().catch(console.error); 