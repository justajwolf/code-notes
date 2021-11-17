import { Socket } from 'socket.io';
import { UserInfo } from '../dto/user-info';
import { RoomInfo } from '../dto/room-info';
import { RoomRegistry } from '../room-registry';

export class BaseCommand {
  constructor(
    public readonly client: Socket,
    public readonly userInfo: UserInfo,
    public readonly roomInfo: RoomInfo,
  ) {} 

  getRoomInstance() {
    return RoomRegistry.getInstance().get(this.roomInfo.id);
  }
}