import { Global, Module } from '@nestjs/common';
import { ConfigServiceProvider } from './config/config-service-provider';
import { LoggerServiceProvider } from './logger/logger-service-provider';
import {
  RedisAdaptorProvider,
  RedisServiceProvider,
  RedisTransientProvider,
} from './redis-cluster/redis.provider';
import { RedLockProvider } from './redlock/redlock-provider';

@Global()
@Module({
  providers: [
    ConfigServiceProvider,
    LoggerServiceProvider,
    RedisServiceProvider,
    RedisAdaptorProvider,
    RedisTransientProvider,
    RedLockProvider,
  ],
  exports: [
    ConfigServiceProvider,
    LoggerServiceProvider,
    RedisServiceProvider,
    RedisAdaptorProvider,
    RedLockProvider,
  ],
})
export class FrameworkModule {}
