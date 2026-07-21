import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faRobot } from '@fortawesome/free-solid-svg-icons';
import { ChatMessage } from '../../../../shared/types/chat';

interface ChatMessageBubbleProps {
  message: ChatMessage;
}

function ChatMessageBubble({ message }: ChatMessageBubbleProps) {
  const isUser = message.author === 'user';

  return (
    <div className={`flex items-end gap-2 ${isUser ? 'flex-row-reverse' : ''}`}>
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white shadow-sm ${
          isUser ? 'bg-gradient-to-br from-blue-400 to-violet-400' : 'bg-gradient-to-br from-pink-400 to-orange-300'
        }`}
      >
        <FontAwesomeIcon icon={isUser ? faUser : faRobot} className="h-3.5 w-3.5" />
      </span>

      <div
        className={`max-w-lg rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
          isUser ? 'bg-gradient-to-br from-violet-500 to-pink-500 text-white' : 'bg-violet-900/70 text-violet-100'
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}

export default ChatMessageBubble;
