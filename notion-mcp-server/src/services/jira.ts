import axios from 'axios';
import { ModelContextProtocol } from '@modelcontextprotocol/sdk';

export class JiraService {
  private baseUrl: string;
  private auth: string;
  private mcp: ModelContextProtocol;

  constructor(jiraConfig: {
    baseUrl: string;
    email: string;
    apiToken: string;
  }) {
    this.baseUrl = jiraConfig.baseUrl;
    this.auth = Buffer.from(`${jiraConfig.email}:${jiraConfig.apiToken}`).toString('base64');
    this.mcp = new ModelContextProtocol({
      apiKey: process.env.NOTION_API_KEY,
      baseUrl: process.env.NOTION_API_BASE_URL || 'https://api.notion.com/v1'
    });
  }

  // Get JIRA issue details
  async getIssue(issueKey: string) {
    try {
      const response = await axios.get(`${this.baseUrl}/rest/api/3/issue/${issueKey}`, {
        headers: {
          'Authorization': `Basic ${this.auth}`,
          'Accept': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching JIRA issue:', error);
      throw error;
    }
  }

  // Create a new JIRA issue
  async createIssue(issueData: any) {
    try {
      const response = await axios.post(`${this.baseUrl}/rest/api/3/issue`, issueData, {
        headers: {
          'Authorization': `Basic ${this.auth}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error creating JIRA issue:', error);
      throw error;
    }
  }

  // Search JIRA issues
  async searchIssues(jql: string) {
    try {
      const response = await axios.get(`${this.baseUrl}/rest/api/3/search`, {
        headers: {
          'Authorization': `Basic ${this.auth}`,
          'Accept': 'application/json'
        },
        params: {
          jql
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching JIRA issues:', error);
      throw error;
    }
  }

  // Link JIRA issue to Notion page
  async linkToNotion(issueKey: string, notionPageId: string) {
    try {
      const issue = await this.getIssue(issueKey);
      const response = await this.mcp.query({
        model: "claude",
        messages: [{
          role: "user",
          content: `Link JIRA issue ${issueKey} to Notion page`
        }],
        context: {
          type: "page",
          page_id: notionPageId,
          properties: {
            jira_issue: {
              key: issueKey,
              summary: issue.fields.summary,
              status: issue.fields.status.name,
              url: `${this.baseUrl}/browse/${issueKey}`
            }
          }
        }
      });
      return response;
    } catch (error) {
      console.error('Error linking JIRA issue to Notion:', error);
      throw error;
    }
  }

  // Sync JIRA issue status to Notion
  async syncStatusToNotion(issueKey: string, notionPageId: string) {
    try {
      const issue = await this.getIssue(issueKey);
      const response = await this.mcp.query({
        model: "claude",
        messages: [{
          role: "user",
          content: `Update Notion page with JIRA issue status`
        }],
        context: {
          type: "page",
          page_id: notionPageId,
          properties: {
            status: issue.fields.status.name,
            last_updated: new Date().toISOString()
          }
        }
      });
      return response;
    } catch (error) {
      console.error('Error syncing JIRA status to Notion:', error);
      throw error;
    }
  }
} 