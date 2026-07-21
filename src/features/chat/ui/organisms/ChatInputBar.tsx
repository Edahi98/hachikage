import React from 'react';
import ChatSendButton from '../atoms/ChatSendButton';

function ChatInputBar() {
  return (
    <form className="flex shrink-0 items-center gap-3 border-t border-violet-800/50 bg-violet-950/80 px-6 py-4 backdrop-blur-sm">
      <textarea
        rows={1}
        placeholder="Escribe un mensaje o pide una acción de Git/GitHub..."
        className="min-h-11 flex-1 resize-none rounded-2xl border border-violet-800/50 bg-violet-900/50 px-4 py-2.5 text-sm text-violet-100 placeholder:text-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-600/50"
      />
      <ChatSendButton />
    </form>
  );
}

export default ChatInputBar;
