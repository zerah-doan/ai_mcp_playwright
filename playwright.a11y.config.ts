import { defineConfig } from '@playwright/test';
import baseConfig from './playwright.config';

export default defineConfig({
    ...baseConfig,
    projects: [
        {
            name: 'accessibility',
            testDir: './tests/ui',
            use: {
                ...baseConfig.use,
                actionTimeout: 10000,
            },
        },
    ],
});