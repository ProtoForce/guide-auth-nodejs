
import { Logger, LogLevel } from './logger';

/* eslint-disable */
/* tslint:disable:no-console */
function logf(level: LogLevel, ...args: any[]): void {
    let prefix = (new Date).toISOString() + ' [' + LogLevel[level] + ']: ';

    switch (level) {
        case LogLevel.Trace:
            console.log('%c' + prefix, 'color: grey; font-style: italic;', ...args);
            break;

        case LogLevel.Debug:
            console.log('%c' + prefix, 'color: grey; font-weight: normal;', ...args);
            break;

        case LogLevel.Info:
            console.log('%c' + prefix, 'color: blue; font-weight: normal;', ...args);
            break;

        case LogLevel.Warning:
            console.log('%c' + prefix, 'color: orange; font-weight: bold;', ...args);
            break;

        case LogLevel.Error:
            console.log('%c' + prefix, 'color: red; font-weight: bold;', ...args);
            break;

        default:
            console.log('%cUnknown LogLevel: ' + level, 'color: red; font-weight: bold;', ...args);
            break
    }
}
/* tslint:enable:no-console */
/* eslint-enable */

interface LogContext {
    name: string;
    data?: any;
    parent?: LogContext;
}

export class ConsoleLogger implements Logger {
    private level: LogLevel;
    private context?: LogContext;
    private offset: string;
    private groupStarted?: boolean;

    constructor(level: LogLevel = LogLevel.Trace, context?: LogContext) {
        this.level = level;
        this.context = context;
        this.offset = '';
        let ctx = context;
        while (ctx) {
            this.offset += '  ';
            ctx = ctx.parent;
        }
    }

    logf(level: LogLevel, ...args: any[]): void {
        if (level < this.level) {
            return;
        }
        if (this.context && !this.groupStarted) {
            this.groupStarted = true;
            logf(level, this.offset, `{${this.context.name}${this.context.data ? ': ' + JSON.stringify(this.context.data) : ''}}`);
        }

        logf(level, this.offset, ...args);
    }

    withContext(name: string, data?: any): Logger {
        return new ConsoleLogger(this.level, {name, data, parent: this.context});
    }
}