export interface Tutor {
  tutor_id: string; 
  username: string;
  created_at: Date;
  name: string;
  valid: boolean;
  yoe: number; 
  subject: string;
  verified: boolean;
  rating: number;
  rating_count: number; 
}