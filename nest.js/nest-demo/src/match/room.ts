import {v4 as uuid} from 'uuid';
import { RoomInfo } from './dto/room-info';
import { UserInfo } from './dto/user-info';
import { Socket } from 'socket.io';

export class Player {
  constructor(
    public readonly info: UserInfo,
    public readonly client: Socket,
  ) {}
}

export class Room {
  // 房间唯一标识
  public readonly uuid: string = uuid();
  // 房间数据同步次数
  public sync: number = 0;
  // 房间当前所有成员
  public members: {[id: string]: Player};

  constructor(
    public readonly info: RoomInfo
  ) {}

  // 房间座位上限
  get maxSeatNum() {
    return 2 || this.info.room_type.subordinate[0].max_player;
  }
  // 房间剩余座位
  get resetSeatNum() {
    return this.maxSeatNum - Object.keys(this.members).length;
  }

  join(player: Player) {
    if (this.resetSeatNum <= 0) {return false;}
    this.members[player.info.id] = player;
    return true;
  }

  remove() {
    
  }
}
