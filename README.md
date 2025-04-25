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

### Local Execution

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

### Docker Execution

1. Build the Docker image:
```bash
docker build -t playwright-tests .
```

2. Run tests in container:
```bash
docker run --rm playwright-tests
```

To run specific test suites in Docker:
```bash
# Run UI tests only
docker run --rm playwright-tests npx playwright test tests/ui/

# Run API tests only
docker run --rm playwright-tests npx playwright test tests/api/
```

Note: When running tests in Docker, make sure your environment variables in `.env` file are configured for container access. If testing against localhost services, use `host.docker.internal` instead of `localhost`.

### CI/CD with GitHub Actions

This project includes automated CI/CD pipeline using GitHub Actions. The workflow:
- Triggers on push/pull requests to main/master branches
- Can be manually triggered from GitHub Actions UI
- Runs tests in parallel using test sharding (3 shards)
- Generates and merges test reports
- Deploys test reports to GitHub Pages

#### Setup Required
1. Add these secrets in your GitHub repository settings (Settings > Secrets and variables > Actions):
   - `PLAYWRIGHT_BASE_URL`
   - `API_BASE_URL`

2. Enable GitHub Pages:
   - Go to repository settings
   - Navigate to Pages section
   - Under "Source", select "GitHub Actions"

#### Features
- Parallel test execution for faster results
- Automatic test report generation
- Report deployment to GitHub Pages (on main branch)
- Caching of npm dependencies
- Artifact retention for 30 days

#### Viewing Test Reports
After workflow completion:
1. Go to Actions tab in your repository
2. Click on the workflow run
3. Download artifacts for detailed reports
4. For main branch runs, view the deployed report on GitHub Pages

## Test Reports

After test execution, HTML reports are generated in the `playwright-report` directory. To view the report:
```bash
npx playwright show-report
```

## Project Structure

```
├── pages/               # Page Object Models
│   ├── BasePage.ts     # Base page class with common methods
│   └── HomePage.ts     # Home page specific methods
├── utils/              # Utilities and helpers
│   ├── apiUtils.ts    # API testing utilities
│   ├── logger.ts      # Test logging utility
│   └── testData.ts    # Test data management
├── tests/             # Test files
│   ├── api/          # API test files
│   │   └── example.api.spec.ts
│   ├── fixtures/     # Test fixtures
│   │   └── testFixtures.ts
│   └── ui/          # UI test files
│       └── example.ui.spec.ts
├── config/           # Configuration files
│   ├── env.ts       # Environment configuration
│   ├── global-setup.ts # TypeScript module resolution setup
│   └── types.ts     # TypeScript type definitions
├── playwright-report/ # Test reports
├── test-results/    # Test artifacts
├── Dockerfile       # Docker configuration
├── .dockerignore    # Docker ignore patterns
├── playwright.config.ts      # Main Playwright configuration
├── playwright.a11y.config.ts # Accessibility testing config
├── playwright.visual.config.ts # Visual testing config
└── .env            # Environment variables
```

## Configuration

Tests are configured in `playwright.config.ts`. This includes settings for:
- Browsers to test
- Test timeouts
- Parallel execution
- Screenshots and video capture
- Other Playwright-specific options