import * as winston from 'winston';
import { ConfigService } from '../../config/config.service';
import { LoggerInterface } from '../logger-interface';

const MESSAGE = Symbol.for('message');
const jsonFormatter = logEntry => {
  const base = { timestamp: new Date() };
  const json = Object.assign(base, logEntry);
  logEntry[MESSAGE] = JSON.stringify(json);
  return logEntry;
};

const myCustomLevels: { [key in keyof Partial<LoggerInterface>]: number } = {
  error: 0,
  warn: 1,
  // log: 2,
  info: 2,
  debug: 3,
  verbose: 4,
};
export class JsonLoggerService implements LoggerInterface {
  private buffer: any[];
  private debugMode: boolean;
  private readonly context: string;
  private readonly config: ConfigService;
  private static readonly transport = new winston.transports.Console();
  public static readonly logger = winston.createLogger({
    level: 'debug',
    levels: myCustomLevels,
    format: winston.format(jsonFormatter)(),
    transports: JsonLoggerService.transport,
  });

  constructor(context?: string, config?: ConfigService) {
    this.config = config;
    this.context = context || 'HTTP';
    this.buffer = undefined;
  }

  private isJson(str: string): boolean {
    if (typeof str !== 'string') {
      return false;
    }
    if (str.startsWith('{"')) {
      return true;
    }
    if (str.endsWith(']') && str.startsWith('[')) {
      return true;
    }
    return false;
  }

  private prepare(message: string, context?: string, level?: string): string {
    if (this.buffer !== undefined) {
      this.buffer.push({ message, context, level });
    }
    // 防止message字段答应出json结构，导致es解析失败
    return this.isJson(message) ? '\\' + message : message;
  }

  turnOnDebugMode() {
    this.debugMode = true;
    JsonLoggerService.logger.level = 'debug';
    this.buffer = [];
  }

  getBuffer(): any[] | undefined {
    return this.buffer;
  }

  error(message: string, trace?: string, context?: string): void {
    const formatted = this.prepare(message, context, 'error');
    JsonLoggerService.logger.error(formatted, {
      context: context || this.context,
      trace,
    });
  }

  log(message: string, context?: string): void {
    const formatted = this.prepare(message, context, 'log');
    JsonLoggerService.logger.log('info', formatted, {
      context: context || this.context,
    });
  }

  warn(message: string, context?: string): void {
    const formatted = this.prepare(message, context, 'warn');
    JsonLoggerService.logger.warn(formatted, {
      context: context || this.context,
    });
  }

  info(message: string, context?: string): void {
    const formatted = this.prepare(message, context, 'info');
    JsonLoggerService.logger.info(formatted, {
      context: context || this.context,
    });
  }

  debug(message: string, context?: string): void {
    const formatted = this.prepare(message, context, 'debug');
    JsonLoggerService.logger.debug(formatted, {
      context: context || this.context,
    });
  }

  verbose(message: string, context?: string): void {
    const formatted = this.prepare(message, context, 'verbose');
    JsonLoggerService.logger.verbose(formatted, {
      context: context || this.context,
    });
  }

  setLogLevel(level: string): void {
    JsonLoggerService.logger.level = level;
  }
}
