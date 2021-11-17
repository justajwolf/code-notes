import { promisify } from 'util';
import * as SocketIO from 'socket.io';

export const CrowdMiddleware = async (socket: SocketIO.Socket, next) => {
  const {uid} = socket.handshake.query;
  if (!uid) {
    return next();
  }
  // 在不同地方同时登陆时，给先登陆的一端提示: 被挤掉线
  // 获取uid房间的人数
  const sids = await promisify(
    (socket.adapter as any).clients,
  ).call(socket.adapter, [uid]);
  if (sids.length > 0) {
    // uid房间有人，广播被挤通知
    const time = Date.now();
    socket.in(uid).emit('offline', time);
  }
  return next();
};
