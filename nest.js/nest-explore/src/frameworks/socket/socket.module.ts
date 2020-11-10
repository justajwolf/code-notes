import { Module } from '@nestjs/common';
import { SocketIOProvider } from './socket-io.provider';

@Module({
  providers: [SocketIOProvider],
  exports: [SocketIOProvider],
})
export class SocketModule {}
