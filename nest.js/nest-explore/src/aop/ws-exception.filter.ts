import { Catch, ArgumentsHost, Inject } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';
import { LOGGER, LoggerInterface } from '../frameworks/logger';
import { Socket } from 'socket.io';

@Catch()
export class WsExceptionsFilter extends BaseWsExceptionFilter {
  constructor(@Inject(LOGGER) private readonly logger: LoggerInterface) {
    super();
  }
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToWs();
    const data = ctx.getData();
    const client: Socket = ctx.getClient();
    this.logger.error(
      `${exception.constructor.name}: ${exception.message}`,
      exception.stack,
      this.constructor.name,
    );
    const resBody = {};
    // if (exception instanceof WaterGunWsException) {
    //   resBody = {
    //     code: exception.code,
    //     msg: exception.message,
    //     data,
    //   };
    // } else if (exception instanceof WsException) {
    //   resBody = {
    //     code: WsStatus.INTERNAL_SERVER_ERROR,
    //     msg: exception.message,
    //     data,
    //   };
    // } else {
    //   resBody = {
    //     code: WsStatus.UNKNOWN,
    //     msg: exception.message,
    //     data,
    //   };
    // }
    client.emit('exception', resBody);
    this.logger.verbose(
      `response(socketid:[${client.id}]): ${JSON.stringify(resBody)}`,
      this.constructor.name,
    );
  }
}
