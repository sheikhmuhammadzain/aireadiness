type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  data?: any;
  error?: Error;
}

class Logger {
  private static instance: Logger;
  private logs: LogEntry[] = [];
  private readonly maxLogs = 1000;

  private constructor() {}

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private formatError(error: Error): string {
    return `${error.name}: ${error.message}\n${error.stack || ''}`;
  }

  private createLogEntry(level: LogLevel, message: string, data?: any, error?: Error): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      data,
      error
    };
  }

  private addLog(entry: LogEntry) {
    this.logs.push(entry);
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }

    // In development, also log to console
    if (process.env.NODE_ENV === 'development') {
      const consoleArgs = [
        `[${entry.timestamp}] [${entry.level.toUpperCase()}] ${entry.message}`
      ];

      if (entry.data) {
        consoleArgs.push('\nData:', entry.data);
      }

      if (entry.error) {
        consoleArgs.push('\nError:', this.formatError(entry.error));
      }

      switch (entry.level) {
        case 'error':
          console.error(...consoleArgs);
          break;
        case 'warn':
          console.warn(...consoleArgs);
          break;
        case 'debug':
          console.debug(...consoleArgs);
          break;
        default:
          console.log(...consoleArgs);
      }
    }

    // In production, send to your logging service
    if (process.env.NODE_ENV === 'production') {
      // TODO: Implement production logging service integration
      // Example: send to Sentry, LogRocket, etc.
    }
  }

  info(message: string, data?: any) {
    this.addLog(this.createLogEntry('info', message, data));
  }

  warn(message: string, data?: any) {
    this.addLog(this.createLogEntry('warn', message, data));
  }

  error(message: string, error?: Error, data?: any) {
    this.addLog(this.createLogEntry('error', message, data, error));
  }

  debug(message: string, data?: any) {
    if (process.env.NODE_ENV === 'development') {
      this.addLog(this.createLogEntry('debug', message, data));
    }
  }

  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  clearLogs() {
    this.logs = [];
  }
}

const logger = Logger.getInstance();
export default logger;