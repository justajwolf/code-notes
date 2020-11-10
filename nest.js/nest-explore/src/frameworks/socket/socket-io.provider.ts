import { IO, IO_REDIS } from './constant';
import { SocketIoAdapter, SocketIoRedisAdapter } from './io-adapter';

export const SocketIOProvider = {
  provide: IO,
  useFactory: () => new Proxy(SocketIoAdapter.io, {})
};

export const SocketIORedisProvider = {
  provide: IO_REDIS,
  useFactory: () => new Proxy(SocketIoRedisAdapter.io, {})
};
