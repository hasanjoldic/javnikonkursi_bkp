import { Timestamp } from "./timestamps";

export interface RefreshToken extends Timestamp {
  user_id: string;
  token: string;
}
