import { test as base } from '@playwright/test';
import { ApiUtils } from '@utils/apiUtils';
import { TestLogger } from '@utils/logger';

// Extend the base test fixture with our custom fixtures
export const test = base.extend<{
    apiUtils: ApiUtils;
    logger: TestLogger;
}>({
    // Define the apiUtils fixture
    apiUtils: async ({ request }, use) => {
        const apiUtils = new ApiUtils(request);
        await use(apiUtils);
    },

    // Define the logger fixture
    logger: async ({ }, use) => {
        const logger = TestLogger.getInstance();
        logger.clearLogs(); // Clear logs before each test
        await use(logger);
    },
});