import React from 'react';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography } from '@mui/material';
import { useMessageContext } from '../contexts/MessageContext';

const MessageList: React.FC = () => {
  const { messages } = useMessageContext();

  return (
    <List sx={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
      {messages.map((msg, index) => (
        <ListItem key={index} sx={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
          <ListItemAvatar sx={{ marginTop: '6px' }}>
            <Avatar sx={{ bgcolor: msg.role === 'assistant' ? '#5bc983' : '#f6c344' }}>
              {msg.role === 'assistant' ? 'B' : 'U'}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={<Typography variant="subtitle1" fontWeight="bold">{msg.role === 'assistant' ? 'ChatGPT' : 'You'}</Typography>}
            secondary={msg.content}
            sx={{ textAlign: 'left', maxWidth: '75%' }}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default MessageList;
