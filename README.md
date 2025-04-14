# Playwright Test Automation Project

This project contains automated end-to-end tests using [Playwright](https://playwright.dev/) and Model Context Protocol (MCP) server for enhanced test automation capabilities.

## Test Suites

The project includes several test suites demonstrating different automation scenarios:

- **Example Tests** (`tests/example.spec.ts`): Basic tests for Playwright's documentation site
- **Google Search** (`tests/google-search.spec.ts`): Automated search functionality testing on Google
- **Visa Login** (`tests/visa-login.spec.ts`): Login automation for Visa Online portal
- **Todo App** (`tests-examples/demo-todo-app.spec.ts`): Comprehensive test suite for a Todo application

## Prerequisites

- Node.js installed on your machine
- Playwright Test dependencies
- MCP Server running locally

## Setup

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npx playwright install
```

3. Start the MCP server:
```bash
npm run mcp-server
```

## Running Tests

Run all tests:
```bash
npx playwright test
```

Run a specific test file:
```bash
npx playwright test example.spec.ts
```

Run tests in headed mode:
```bash
npx playwright test --headed
```

## MCP Server Configuration

The MCP server enhances test automation by providing:
- Improved test stability through AI-powered element selection
- Dynamic wait handling
- Intelligent test retry mechanisms
- Enhanced error reporting

Configure the MCP server settings in your test files:
```typescript
import { test } from '@playwright/test';
import { mcpConnect } from '@mcp/playwright';

test.beforeEach(async ({ page }) => {
  await mcpConnect(page);
});
```

## Test Reports

After test execution, HTML reports are generated in the `playwright-report` directory. To view the report:
```bash
npx playwright show-report
```

## Project Structure

```
├── tests/                  # Test files
│   ├── example.spec.ts     # Example tests
│   ├── google-search.spec.ts
│   └── visa-login.spec.ts
├── tests-examples/         # Example test suites
├── playwright-report/      # Test reports
└── test-results/          # Test artifacts
```

## Configuration

Tests are configured in `playwright.config.ts`. This includes settings for:
- Browsers to test
- Test timeouts
- Parallel execution
- Screenshots and video capture
- MCP server configuration
- Other Playwright-specific options