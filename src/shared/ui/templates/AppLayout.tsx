import React, { ReactNode } from 'react';
import Navbar from '../organisms/Navbar';
import Sidebar from '../organisms/Sidebar';
import { ChatConversationSummary } from '../../types/chat';

interface AppLayoutProps {
  conversations: ChatConversationSummary[];
  activeConversationId?: string;
  children: ReactNode;
}

function AppLayout({ conversations, activeConversationId, children }: AppLayoutProps) {
  return (
    <div className="flex h-screen w-screen flex-col bg-gradient-to-br from-violet-950 via-purple-950 to-indigo-950">
      <Navbar />
      <div className="flex min-h-0 flex-1">
        <Sidebar conversations={conversations} activeConversationId={activeConversationId} />
        <main className="flex min-w-0 flex-1 flex-col">{children}</main>
      </div>
    </div>
  );
}

export default AppLayout;
