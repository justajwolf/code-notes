import * as SocketIO from 'socket.io';
import _ = require('lodash');

export const AssginSessionMiddleware = async (socket: SocketIO.Socket, next) => {
  const session = (socket.handshake as any).session;
  if (_.isNil(session)) {return next();}
  const query = socket.handshake.query;
  if (_.isEmpty(query)) {return next();}
  Object.assign(session, query);
  return next();
}