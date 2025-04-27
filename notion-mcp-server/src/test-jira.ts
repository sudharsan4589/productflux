import { JiraService } from './services/jira';

// Initialize JIRA service
const jira = new JiraService({
  baseUrl: 'https://your-domain.atlassian.net',
  email: 'your-email@example.com',
  apiToken: 'your-api-token'
});

// Test functions
async function testGetIssue() {
  try {
    const issue = await jira.getIssue('PROJ-123');
    console.log('Issue details:', issue);
  } catch (error) {
    console.error('Error in testGetIssue:', error);
  }
}

async function testCreateIssue() {
  try {
    const newIssue = await jira.createIssue({
      fields: {
        project: {
          key: 'PROJ'
        },
        summary: 'Test issue created via API',
        description: {
          type: 'doc',
          version: 1,
          content: [{
            type: 'paragraph',
            content: [{
              type: 'text',
              text: 'This is a test issue created via the JIRA API'
            }]
          }]
        },
        issuetype: {
          name: 'Task'
        }
      }
    });
    console.log('Created issue:', newIssue);
  } catch (error) {
    console.error('Error in testCreateIssue:', error);
  }
}

async function testSearchIssues() {
  try {
    const issues = await jira.searchIssues('project = PROJ AND status = "In Progress"');
    console.log('Search results:', issues);
  } catch (error) {
    console.error('Error in testSearchIssues:', error);
  }
}

async function testLinkToNotion() {
  try {
    const result = await jira.linkToNotion('PROJ-123', 'your-notion-page-id');
    console.log('Link result:', result);
  } catch (error) {
    console.error('Error in testLinkToNotion:', error);
  }
}

async function testSyncStatus() {
  try {
    const result = await jira.syncStatusToNotion('PROJ-123', 'your-notion-page-id');
    console.log('Sync result:', result);
  } catch (error) {
    console.error('Error in testSyncStatus:', error);
  }
}

// Run all tests
async function runTests() {
  console.log('Starting JIRA integration tests...');
  
  await testGetIssue();
  await testCreateIssue();
  await testSearchIssues();
  await testLinkToNotion();
  await testSyncStatus();
  
  console.log('All tests completed');
}

runTests().catch(console.error); 