/**
 * Log levels
 */
export enum LogLevel {
    Trace = 0,
    Debug = 1,
    Info = 2,
    Warning = 3,
    Error = 4
}

/**
 * Logger interface
 */
export interface Logger {
    /**
     * withContext creates an instance of a logger with a defined context,
     * which allows for better understanding the origin of the message
     * @param name Name of the context
     * @param data Data provided along with the context
     */
    withContext(name: string, data?: any): Logger;
    logf(level: LogLevel, ...args: any[]): void;
}