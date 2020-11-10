import * as SocketIO from 'socket.io';

// 最后一个执行的中间件
export const EndMiddleware = async (socket: SocketIO.Socket, next) => {
  const {room_id, uid} = socket.handshake.query as any;
  (socket.handshake.query as any).roomId = room_id;
  // 包裹socketId, 方便查问题,
  (socket as any).id = `${uid}|${socket.id}`;
  return next();
};