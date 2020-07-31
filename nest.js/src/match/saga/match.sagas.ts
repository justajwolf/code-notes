import { Injectable } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { JoinSuccEvent } from '../event/join-succ.event';

@Injectable()
export class MatchRoomSagas {
  @Saga()
  joinSucc = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(JoinSuccEvent),
      // map((event) => new DropAncientItemCommand(event.heroId, fakeItemID)),
    );
  }
}