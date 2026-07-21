import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMessage } from '@fortawesome/free-solid-svg-icons';
import { ChatConversationSummary } from '../../types/chat';

interface SidebarProps {
  conversations: ChatConversationSummary[];
  activeConversationId?: string;
}

function Sidebar({ conversations, activeConversationId }: SidebarProps) {
  return (
    <aside className="flex w-64 shrink-0 flex-col gap-4 border-r border-violet-800/50 bg-violet-950/40 p-4">
      <button
        type="button"
        className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-400 to-pink-400 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:opacity-90"
      >
        <FontAwesomeIcon icon={faPlus} className="h-3.5 w-3.5" />
        Nuevo chat
      </button>

      <nav className="flex flex-col gap-1 overflow-y-auto">
        {conversations.map((conversation) => (
          <a
            key={conversation.id}
            href="#"
            className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition ${
              conversation.id === activeConversationId
                ? 'bg-violet-800/60 text-violet-50 shadow-sm'
                : 'text-violet-300 hover:bg-violet-800/30'
            }`}
          >
            <FontAwesomeIcon icon={faMessage} className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{conversation.title}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
