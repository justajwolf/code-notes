import { Logger } from '@nestjs/common';
import { ConfigService } from '../../config/config.service';
import { LoggerInterface } from '../logger-interface';

const level = {
  error: 0,
  warn: 1,
  info: 2,
  log: 2,
  debug: 3,
  verbose: 4,
};

export class PlainLoggerService extends Logger implements LoggerInterface {
  private static level: string;
  private _context: string;
  private buffer: any[];
  private debugMode: boolean;

  constructor(context?: string, config?: ConfigService) {
    super(context);
    this._context = context;
    this.buffer = undefined;
  }

  turnOnDebugMode() {
    this.debugMode = true;
    PlainLoggerService.level = 'debug';
    this.buffer = [];
  }

  private prepare(message, context, outlevel): void {
    if (this.buffer !== undefined) {
      this.buffer.push({ message, context, level: outlevel });
    }
  }

  getBuffer(): any[] | undefined {
    return this.buffer;
  }

  error(message: any, trace?: string, context?: string): void {
    if (level[PlainLoggerService.level] < 0) {
      return;
    }
    this.prepare(message, context, 'error');
    super.error(message, trace, context);
  }

  warn(message: any, context?: string): void {
    if (level[PlainLoggerService.level] < 1) {
      return;
    }
    this.prepare(message, context, 'warn');
    super.log(message, context);
  }

  log(message: any, context?: string): void {
    this.prepare(message, context, 'log');
    super.log(message, context);
  }

  info(message: any, context?: string): void {
    if (level[PlainLoggerService.level] < 2) {
      return;
    }
    this.prepare(message, context, 'info');
    super.log(message, context);
  }

  debug(message: any, context?: string): void {
    if (level[PlainLoggerService.level] < 3) {
      return;
    }
    this.prepare(message, context, 'debug');
    super.debug(message, context);
  }

  verbose(message: any, context?: string): void {
    if (level[PlainLoggerService.level] < 4) {
      return;
    }
    this.prepare(message, context, 'verbose');
    super.verbose(message, context);
  }

  setLogLevel(logLevel: string): void {
    PlainLoggerService.level = logLevel;
  }
}
