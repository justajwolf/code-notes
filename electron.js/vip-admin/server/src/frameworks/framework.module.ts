import { Global, Module } from '@nestjs/common';
import { ConfigServiceProvider } from '../config/config-service-provider';
import { LoggerServiceProvider } from './logger/logger-service-provider';

@Global()
@Module({
  providers: [
    ConfigServiceProvider,
    LoggerServiceProvider,
  ],
  exports: [
    ConfigServiceProvider,
    LoggerServiceProvider,
  ],
})
export class FrameworkModule {}
