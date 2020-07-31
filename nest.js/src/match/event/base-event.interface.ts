import { Room, Player } from '../room';
import { Socket } from 'socket.io';

export interface IBaseEvent {
  readonly room: Room;
  readonly player: Player
}