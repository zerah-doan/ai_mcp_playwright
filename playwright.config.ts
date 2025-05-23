import { defineConfig, devices } from '@playwright/test';
import * as path from 'path';
import { config } from './config/env';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 3 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }]
  ],

  /* Configure TypeScript module resolution */
  globalSetup: path.join(__dirname, './config/global-setup.ts'),

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: config.playwrightBaseUrl,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for both API and UI testing */
  projects: [
    /* API Testing Configuration */
    {
      name: 'api',
      testDir: './tests/api',
      use: {
        // Increased timeout for API calls
        actionTimeout: 30000,
        // Disable unnecessary browser features for API testing
        screenshot: 'off',
        video: 'off',
        trace: 'off'
      },
    },

    /* Visual Testing Configuration */
    {
      name: 'visual',
      testDir: './tests/ui',
      use: {
        screenshot: 'on',
        video: 'on',
        trace: 'on',
      },
    },

    /* Accessibility Testing Configuration */
    {
      name: 'accessibility',
      testDir: './tests/ui',
      use: {
        actionTimeout: 10000,
      },
    },

    /* UI Testing Configurations */
    {
      name: 'chromium',
      testDir: './tests/ui',
      use: {
        ...devices['Desktop Chrome'],
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
      },
    },
    {
      name: 'firefox',
      testDir: './tests/ui',
      use: {
        ...devices['Desktop Firefox'],
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
      },
    },
    {
      name: 'webkit',
      testDir: './tests/ui',
      use: {
        ...devices['Desktop Safari'],
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
      },
    },
  ],
});
