export interface Message {
  message_id: string; // UUID type represented as a string
  chat_id: number; // int32 in Go corresponds to number in TypeScript
  user_id: string; // UUID type represented as a string
  created_at: Date;
  updated_at: Date;
  deleted: boolean;
  content: string;
}