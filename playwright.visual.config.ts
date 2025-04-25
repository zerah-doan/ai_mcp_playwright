import { defineConfig } from '@playwright/test';
import baseConfig from './playwright.config';

export default defineConfig({
    ...baseConfig,
    projects: [
        {
            name: 'visual',
            testDir: './tests/ui',
            use: {
                ...baseConfig.use,
                screenshot: 'on',
                video: 'on',
                trace: 'on',
            },
        },
    ],
});