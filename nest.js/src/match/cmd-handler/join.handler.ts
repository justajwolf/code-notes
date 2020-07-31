import { BaseHandler } from './base.handler'
import { CommandHandler } from '@nestjs/cqrs';
import { JoinRoomCommand } from '../cmd/join-room.command';
import { Player } from '../room';
import { JoinSuccEvent } from '../event/join-succ.event';
import { JoinFailEvent } from '../event/join-fail.event';

@CommandHandler(JoinRoomCommand)
export class JoinHandler extends BaseHandler {
  protected handle(command: JoinRoomCommand) {
    const {client, userInfo, roomInfo} = command;
    // 获取房间实体(创建房间)
    const room = command.getRoomInstance() || this.registry.createRoom(roomInfo);
    const p = new Player(userInfo, client);
    if (room.join(p)) {
      return this.eventBus.publish(new JoinSuccEvent(room, p));
    }
    return this.eventBus.publish(new JoinFailEvent(room, p));
  }
}