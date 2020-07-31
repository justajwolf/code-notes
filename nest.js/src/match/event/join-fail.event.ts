import { IBaseEvent } from './base-event.interface';
import { Room, Player } from '../room';

export class JoinFailEvent implements IBaseEvent {
  constructor(
    public readonly room: Room,
    public readonly player: Player,
  ) {}
}