import {Module} from '@nestjs/common';
import { RoomRegistry } from './dto/room-registry';

@Module({
  providers: [RoomRegistry]
})
export class MatchModule {}