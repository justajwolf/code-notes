import { LoggerService } from '@nestjs/common';

export interface LoggerInterface extends LoggerService {
  info(message: string, context?: string): void;
  error(message: string, trace?: string, context?: string): void;
  getBuffer(): any[] | undefined;
  turnOnDebugMode();
  setLogLevel(level: string);
}
