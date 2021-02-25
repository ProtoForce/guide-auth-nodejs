import { Logger, LogLevel } from './logger';

export class DummyLogger implements Logger {
    withContext(name: string, data?: any): Logger {
        return new DummyLogger();
    }

    logf(level: LogLevel, ...args: any[]): void {
        // Nothing to do in a dummy
    }
}