import React, { useState, useRef, useEffect } from 'react';
import { Container, Paper, TextField, Button, List, ListItem, ListItemAvatar, Avatar, ListItemText, Box, Typography, InputAdornment } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import './App.css';
import { sendMessage } from './utils/api';
import { MessageProvider } from './contexts/MessageContext';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';
import { Message } from './types/Chat';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (input.trim()) {
      const newMessages: Message[] = [...messages, { content: input, role: 'user' }];
      setMessages(newMessages);
      setInput('');

      const res = await sendMessage(newMessages.filter(x => x.role === 'user'))
      setMessages([...newMessages, res as Message])
    }
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);



  return (
    <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'center', padding: 0 }}>
      <Paper elevation={3} sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: '80vh' }}>
        <List sx={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
          {messages.map((msg, index) => (
            <ListItem key={index} sx={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
              <ListItemAvatar
                sx={{
                  marginTop: '6px'
                }}
              >
                  <Avatar sx={{ bgcolor: msg.role === 'assistant' ? '#5bc983' : '#f6c344' }}>
                    {msg.role === 'assistant' ? 'B' : 'U'}
                  </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={<Typography variant="subtitle1" fontWeight="bold">{msg.role === 'assistant' ? 'ChatGPT' : 'You'}</Typography>}
                secondary={msg.content}
                sx={{
                  textAlign:'left',
                  maxWidth: '75%',
                }}
              />
            </ListItem>
          ))}
          <div ref={messagesEndRef} />
        </List>
        <Box sx={{ display: 'flex', p: 2}}>
          <TextField
            variant="outlined"
            placeholder="Message ChatGPT..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' ? handleSend() : null}
            sx={{
              flex: 1,
              marginRight: '8px',
              '& fieldset': {
                borderColor: '#999!important',
                borderRadius: '15px',
              },
              '&:focus': {
                outline: 'none',
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    sx={{
                      bgcolor: input.length ? '#000' : '#eee',
                      borderRadius: '5px',
                      width: '10px',
                      '&:hover': {
                        bgcolor: '#000',
                      },
                    }}
                    onClick={handleSend}
                  >
                    <ArrowUpwardIcon sx={{ color: '#fff' }} />
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Paper>
    </Container>
  );
}
// const App: React.FC = () => {
//   return (
//     <MessageProvider>
//       <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'center', padding: 0 }}>
//         <Paper elevation={3} sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: '80vh' }}>
//           <MessageList />
//           <MessageInput />
//         </Paper>
//       </Container>
//     </MessageProvider>
//   );
// };

export default App;
