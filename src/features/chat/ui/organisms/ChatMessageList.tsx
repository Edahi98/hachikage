import React from 'react';
import ChatMessageBubble from '../molecules/ChatMessageBubble';
import { ChatMessage } from '../../../../shared/types/chat';

interface ChatMessageListProps {
  messages: ChatMessage[];
}

function ChatMessageList({ messages }: ChatMessageListProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-6 py-6">
      {messages.map((message) => (
        <ChatMessageBubble key={message.id} message={message} />
      ))}
    </div>
  );
}

export default ChatMessageList;
