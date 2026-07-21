export type ChatAuthor = 'user' | 'assistant';

export interface ChatMessage {
  id: string;
  author: ChatAuthor;
  content: string;
}

export interface ChatConversationSummary {
  id: string;
  title: string;
}
