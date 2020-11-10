import { Scope } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import * as Redis from 'ioredis';
import * as redisIoAdapter from 'socket.io-redis';

import { REDIS, REDIS_ADAPTOR } from './constant';
import { ConfigService } from '../config/config.service';

const join = `
local key = KEYS[1]
local player = ARGV[1]
local maxPlayers = ARGV[2]
redis.call('SADD', key, player)
if tonumber(redis.call('SCARD', key)) < tonumber(maxPlayers) then    
    return {0}
else
    local ret = redis.call('SPOP', key, maxPlayers)
    return {table.getn(ret), unpack(ret)}
end`;

const has = `
local key = KEYS[1]
local player = ARGV[1]
local has = redis.call('SISMEMBER', key, player)
if has == 1 then
  redis.call('SREM', key, player)
  return 1
end
return 0
`;

const incrReturnGeZero = `
local key = KEYS[1]
local field = ARGV[1]
local incrNum = ARGV[2]
local num = redis.call('hincrby', key, field, incrNum)
if num < 0 then
  redis.call('hset', key, field, 0)
  return 0
else
  return num
end 
`;

export const RedisTransientProvider = {
  provide: Redis.Cluster,
  useFactory: (ConfigService: ConfigService) => {
    if (ConfigService.get('REDIS_NODE')) {
      return new Redis(ConfigService.get('REDIS_NODE'));
    } else {
      return new Redis.Cluster(
        ConfigService.getRedisClusterNodes(),
        ConfigService.getRedisClusterOptions(),
      );
    }
  },
  inject: [ConfigService],
  scope: Scope.TRANSIENT,
};

export const RedisServiceProvider = {
  provide: REDIS,
  useFactory: async (ref: ModuleRef) => {
    const client: any = await ref.resolve(Redis.Cluster);
    // 设备 黑白名单定向
    client.defineCommand('join', {
      lua: join,
      numberOfKeys: 1,
    });
    client.defineCommand('has', {
      lua: has,
      numberOfKeys: 1,
    });
    client.defineCommand('hincrbyReturnGeZero', {
      lua: incrReturnGeZero,
      numberOfKeys: 1,
    });
    return client;
  },
  inject: [ModuleRef],
};

export const RedisAdaptorProvider = {
  provide: REDIS_ADAPTOR,
  useFactory: async (ref: ModuleRef, config: ConfigService) => {
    return redisIoAdapter({
      key: config.get('APP_NAME'),
      pubClient: await ref.resolve(Redis.Cluster),
      subClient: await ref.resolve(Redis.Cluster),
    });
  },
  inject: [ModuleRef, ConfigService],
};
