export interface ToolUse {
  toolName: string;
  toolInput: string;
  toolOutput: string;
}

export interface Message {
  id: string;
  content: string;
  role: "user" | "assistant" | "system";
  toolUse?: ToolUse;
  timestamp?: Date;
}

export interface ChatRequest {
  message: string;
  mood: string;
  conversationId?: string;
  history?: Message[];
}

export interface ChatResponse {
  content: string;
  toolUse?: ToolUse;
  error?: string;
}

export type MoodType =
  | "sad"
  | "relaxed"
  | "business"
  | "tech"
  | "happy"
  | "funny";
