import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import ChatPage from './features/chat/ui/pages/ChatPage';

function AppRoutes() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<ChatPage />} />
      </Routes>
    </HashRouter>
  );
}

export default AppRoutes;
