export interface RoomInfo {
  id: string;
  name: string;
  user_id: string;
  is_automatic: number;
  room_type: {
    subordinate: Subordinate[]
  };
}

interface Subordinate {
  full_name: string;
  href: string;
  max_player: number;
  min_player: number;
}