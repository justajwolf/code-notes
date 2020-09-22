import { IBaseEvent } from './base-event.interface';
import { Room, Player } from '../room';

export class JoinSuccEvent implements IBaseEvent {
  constructor(
    public readonly room: Room,
    public readonly player: Player,
  ) {}
}