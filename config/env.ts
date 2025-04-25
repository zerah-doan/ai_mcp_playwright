import dotenv from 'dotenv';
import path from 'path';
import { EnvironmentConfig } from './types';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const config: EnvironmentConfig = {
    playwrightBaseUrl: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000',
    apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:4000',
    retryCount: parseInt(process.env.RETRY_COUNT || '2', 10),  // Parse string to number with fallback
};