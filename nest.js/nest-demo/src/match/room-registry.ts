import { Room } from './room';
import { Injectable } from '@nestjs/common';
import { RoomInfo } from './dto/room-info';

@Injectable()
export class RoomRegistry extends Map<string, Room> {
  // 转换非string的key
  get(k: any) {
    return super.get(`${k}`);
  }
  set(k: any, v: Room) {
    return super.set(`${k}`, v);
  }
  delete(k: any) {
    return super.delete(`${k}`);
  }

  // 单例
  private static _instance: RoomRegistry;
  constructor() {
    super();
    RoomRegistry._instance = this;
  }
  public static getInstance() {
    return this._instance || new RoomRegistry();
  }

  /**
   * 创建房间并注册房间
   * @param roomInfo 房间信息
   */
  public createRoom(roomInfo: RoomInfo) {
    const room = new Room(roomInfo);
    this.set(roomInfo.id, room);
    return room;
  }
}