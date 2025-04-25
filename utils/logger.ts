enum LogLevel {
    INFO = 'INFO',
    WARN = 'WARN',
    ERROR = 'ERROR',
    DEBUG = 'DEBUG'
}

export class TestLogger {
    private static instance: TestLogger;
    private readonly logs: string[] = [];

    private constructor() { }

    static getInstance(): TestLogger {
        if (!TestLogger.instance) {
            TestLogger.instance = new TestLogger();
        }
        return TestLogger.instance;
    }

    private formatMessage(level: LogLevel, message: string, context?: object): string {
        const timestamp = new Date().toISOString();
        const contextStr = context ? ` | Context: ${JSON.stringify(context)}` : '';
        return `[${timestamp}] ${level}: ${message}${contextStr}`;
    }

    info(message: string, context?: object): void {
        const formattedMessage = this.formatMessage(LogLevel.INFO, message, context);
        this.logs.push(formattedMessage);
        console.log(formattedMessage);
    }

    warn(message: string, context?: object): void {
        const formattedMessage = this.formatMessage(LogLevel.WARN, message, context);
        this.logs.push(formattedMessage);
        console.warn(formattedMessage);
    }

    error(message: string, error?: Error, context?: object): void {
        const errorContext = error ? { ...context, error: error.message, stack: error.stack } : context;
        const formattedMessage = this.formatMessage(LogLevel.ERROR, message, errorContext);
        this.logs.push(formattedMessage);
        console.error(formattedMessage);
    }

    debug(message: string, context?: object): void {
        if (process.env.DEBUG) {
            const formattedMessage = this.formatMessage(LogLevel.DEBUG, message, context);
            this.logs.push(formattedMessage);
            console.debug(formattedMessage);
        }
    }

    getLogs(): string[] {
        return [...this.logs];
    }

    clearLogs(): void {
        this.logs.length = 0;
    }
}