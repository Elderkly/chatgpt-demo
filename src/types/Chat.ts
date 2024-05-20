export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface MessageContextType {
  messages: Message[];
  addMessage: (message: Message) => void;
}