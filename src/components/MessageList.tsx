import React, { useEffect, useRef } from 'react';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography } from '@mui/material';
import TypingEffect from './TypingEffect';
import useMessageContext from '../hook/useMessageContext';

const MessageList: React.FC = () => {
  const { messages } = useMessageContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <List
      sx={{ flex: 1, overflowY: 'auto', padding: '10px' }}
    >
      {messages.map((msg, index) => (
        <ListItem key={index} sx={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
          <ListItemAvatar sx={{ marginTop: '6px' }}>
            <Avatar sx={{ bgcolor: msg.role === 'assistant' ? '#5bc983' : '#f6c344' }}>
              {msg.role === 'assistant' ? 'B' : 'U'}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={<Typography variant="subtitle1" fontWeight="bold">{msg.role === 'assistant' ? 'ChatGPT' : 'You'}</Typography>}
            secondary={msg.role === 'assistant' ? <TypingEffect text={msg.content}/> : msg.content}
            sx={{ textAlign: 'left', maxWidth: '75%' }}
          />
        </ListItem>
      ))}
      <div ref={messagesEndRef} />
    </List>
  );
};


export default MessageList;
