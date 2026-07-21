import React from 'react';
import AppLayout from '../../../../shared/ui/templates/AppLayout';
import ChatMessageList from '../organisms/ChatMessageList';
import ChatInputBar from '../organisms/ChatInputBar';
import { ChatConversationSummary, ChatMessage } from '../../../../shared/types/chat';

const mockConversations: ChatConversationSummary[] = [
  { id: '1', title: 'Rebase de feature/login' },
  { id: '2', title: 'Crear PR de release v1.2' },
  { id: '3', title: 'Resolver conflictos en main' },
];

const mockMessages: ChatMessage[] = [
  { id: '1', author: 'user', content: 'Crea un PR de mi rama feature/login hacia main' },
  {
    id: '2',
    author: 'assistant',
    content: 'Listo, voy a preparar el pull request. ¿Quieres que agregue una descripción automática con los commits?',
  },
  { id: '3', author: 'user', content: 'Sí, por favor' },
];

function ChatPage() {
  return (
    <AppLayout conversations={mockConversations} activeConversationId="2">
      <ChatMessageList messages={mockMessages} />
      <ChatInputBar />
    </AppLayout>
  );
}

export default ChatPage;
