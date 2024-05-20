import React, { useState } from 'react';
import { TextField, Button, Box, InputAdornment, CircularProgress } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useMessageContext } from '../contexts/MessageContext';
import { sendMessage } from '../utils/api';
import { Message } from '../types/Chat';

const MessageInput: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { addMessage, messages } = useMessageContext();

  const handleSend = async () => {
    if (input.trim()) {
      setLoading(true); 

      const newMessage: Message = { role: 'user', content: input };
      addMessage(newMessage);
      setInput('');

      try {
        const response = await sendMessage([...messages.filter(x => x.role === 'user'), newMessage]);
        addMessage(response as Message);
      } catch (error) {
        console.error('Error sending message:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Box sx={{ display: 'flex', p: 2 }}>
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
              {loading ? ( // 根据加载状态显示 loading 指示器或箭头按钮
                <CircularProgress size={24} color="inherit" />
              ) : (
                <Button
                  disabled={loading} // 在加载时禁用按钮
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
              )}
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default MessageInput;
