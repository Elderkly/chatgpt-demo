import React, { useState, useEffect } from 'react';
import { Container, Paper } from '@mui/material';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';
import { MessageProvider } from './contexts/MessageContext';
import ApiKeyModal from './components/ApiKeyModal';
import { DialogProvider } from './contexts/DiaLogContext';

const App: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const storedApiKey = localStorage.getItem('API_KEY');
    if (!storedApiKey) {
      setModalOpen(true);
    }
  }, []);

  const handleSaveApiKey = (key: string) => {
    localStorage.setItem('API_KEY', key);
    setModalOpen(false);
  };

  return (
    <MessageProvider>
      <DialogProvider>
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'center', padding: 0 }}>
          <Paper elevation={3} sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: '80vh' }}>
            <MessageList />
            <MessageInput />
          </Paper>
        </Container>
        <ApiKeyModal open={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSaveApiKey} />
      </DialogProvider>
    </MessageProvider>
  );
};

export default App;
