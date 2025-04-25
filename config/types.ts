export interface EnvironmentConfig {
    playwrightBaseUrl: string;
    apiBaseUrl: string;
    retryCount: number;  // Adding typed retry count
}