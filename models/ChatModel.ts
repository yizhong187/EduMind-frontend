export interface Chat {
  chat_id: number; // int32 in Go corresponds to number in TypeScript
  student_id: string; // UUID type represented as a string
  tutor_id: string | null; // uuid.NullUUID represented as a nullable string
  created_at: Date; // The date field will be parsed from the JSON string
  subject: string;
  topic: string | null; // sql.NullString represented as a nullable string
  header: string;
  completed: boolean;
}

export function parseChat(json: any): Chat {
  return {
    chat_id: json.chat_id,
    student_id: json.student_id,
    tutor_id: json.tutor_id,
    created_at: new Date(json.created_at), // Convert string to Date
    subject: json.subject,
    topic: json.topic.Valid ? json.topic.String : null, // Handle nullable topic
    header: json.header,
    completed: json.completed
  };
}