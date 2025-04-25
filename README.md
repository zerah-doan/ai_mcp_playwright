# Playwright Test Automation Project

This project contains automated end-to-end tests using [Playwright](https://playwright.dev/).

## Test Suites

The project includes both UI and API test suites:

### UI Tests (`tests/ui/`)
- Example UI tests demonstrating web page navigation and assertions
- Located in `tests/ui/*.spec.ts`

### API Tests (`tests/api/`)
- Example API tests demonstrating REST API testing capabilities
- Located in `tests/api/*.spec.ts`

## Environment Configuration

The project uses environment variables for configuration. Create a `.env` file in the root directory with the following variables:

```properties
PLAYWRIGHT_BASE_URL=https://playwright.dev
API_BASE_URL=https://jsonplaceholder.typicode.com
```

You can override these values by:
1. Modifying the `.env` file
2. Setting environment variables directly in your shell
3. Creating environment-specific files (e.g., `.env.test`, `.env.staging`)

## Prerequisites

- Node.js installed on your machine
- Playwright Test dependencies

## Setup

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npx playwright install
```

## Running Tests

Run all tests:
```bash
npx playwright test
```

Run UI tests only:
```bash
npx playwright test tests/ui/
```

Run API tests only:
```bash
npx playwright test tests/api/
```

Run tests in headed mode:
```bash
npx playwright test --headed
```

## Test Reports

After test execution, HTML reports are generated in the `playwright-report` directory. To view the report:
```bash
npx playwright show-report
```

## Project Structure

```
├── config/                 # Configuration files
│   └── env.ts             # Environment configuration
├── tests/                 # Test files root directory
│   ├── ui/               # UI test files
│   │   └── example.ui.spec.ts
│   └── api/             # API test files
│       └── example.api.spec.ts
├── playwright-report/     # Test reports
├── test-results/         # Test artifacts
└── .env                  # Environment variables
```

## Configuration

Tests are configured in `playwright.config.ts`. This includes settings for:
- Browsers to test
- Test timeouts
- Parallel execution
- Screenshots and video capture
- Other Playwright-specific options