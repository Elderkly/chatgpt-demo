import React, { useState } from 'react';
import { TextField, Button, Box, InputAdornment } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useMessageContext } from '../contexts/MessageContext';

const MessageInput: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const { addMessage } = useMessageContext();

  const handleSend = () => {
    if (input.trim()) {
      addMessage({ role: 'user', content: input });
      setInput('');
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
  );
};

export default MessageInput;
