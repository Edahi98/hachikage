import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

interface ChatSendButtonProps {
  disabled?: boolean;
}

function ChatSendButton({ disabled }: ChatSendButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-400 to-pink-400 text-white shadow-sm transition hover:opacity-90 disabled:opacity-40"
    >
      <FontAwesomeIcon icon={faPaperPlane} className="h-4 w-4" />
    </button>
  );
}

export default ChatSendButton;
