import { INestApplication } from '@nestjs/common';
import * as sharedsession from 'express-socket.io-session';
import * as SocketIO from 'socket.io';
import { SessionMiddleware } from '../../session/session.middleware';
import * as middlewares from '../middlewares';
import { SocketIoAdapter } from './socket-io.adapter';

/**
 * Enable session tokens for web sockets by using express-socket.io-session
 */

export class SocketIoRedisAdapter extends SocketIoAdapter {
  constructor(app: INestApplication) {
    super(app);
    this.app = app;
  }

  /**
   * 创建SocketIO
   * @param port 端口号
   * @param options server可选配置
   */
  createIOServer(
    port: number,
    options?: SocketIO.ServerOptions,
  ): SocketIO.Server {
    const server: SocketIO.Server = (SocketIoAdapter.io = super.createIOServer(
      port,
      options,
    ));
    this.app.use(SessionMiddleware);
    this.mountMiddleware(server, '/', [
      sharedsession(SessionMiddleware, {
        autoSave: true,
      }),
      ...Object.values(middlewares)
    ]);
    return server;
  }

  /**
   * 根据namespace, 挂载中间件
   * @param server socketServer
   * @param nsp namespace
   * @param middlewares Handle
   */
  mountMiddleware(server, nsp, middlewares = []) {
    // 挂载session
    server.of(nsp).use(
      sharedsession(SessionMiddleware, {
        autoSave: true,
      }),
    );
    middlewares.forEach(m => server.of(nsp).use(m));
  }
}
