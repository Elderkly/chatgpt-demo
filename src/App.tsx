import React from 'react';
import { Container, Paper} from '@mui/material';
import './App.css';
import { MessageProvider } from './contexts/MessageContext';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';

const App: React.FC = () => {
  return (
    <MessageProvider>
      <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'center', padding: 0 }}>
        <Paper elevation={3} sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: '80vh' }}>
          <MessageList />
          <MessageInput />
        </Paper>
      </Container>
    </MessageProvider>
  );
};

export default App;
