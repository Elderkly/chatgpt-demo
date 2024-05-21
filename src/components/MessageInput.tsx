import React, { useState } from 'react';
import { TextField, Button, Box, InputAdornment, CircularProgress } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import PauseIcon from '@mui/icons-material/Pause'
import { sendMessage } from '../utils/api';
import { Message } from '../types';
import useTypingEffectService from '../hook/useTypingEffectService';
import useMessageContext from '../hook/useMessageContext';
import useDialogContext from '../hook/useDialogContext';
import TypingEffectService from '../service/TypingEffectService';

const MessageInput: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { addMessage, messages } = useMessageContext();
  const { openDialog } = useDialogContext()
  const typing = useTypingEffectService()

  const handleSendClick = async () => {
    if (typing) {
      console.log('stop', typing)
      TypingEffectService.setTyping(false)
      return
    }

    if (input.trim()) {
      setLoading(true); 

      const newMessage: Message = { role: 'user', content: input };
      addMessage(newMessage);
      setInput('');

      try {
        const response = await sendMessage([...messages.filter(x => x.role === 'user'), newMessage]);
        addMessage(response as Message);
      } catch (error: any) {
        openDialog('Error', error.message)
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
        onKeyPress={(e) => e.key === 'Enter' ? handleSendClick() : null}
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
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                <Button
                  disabled={loading}
                  sx={{
                    bgcolor: input.length || typing ? '#000' : '#eee',
                    borderRadius: '5px',
                    width: '10px',
                    '&:hover': {
                      bgcolor: '#000',
                    },
                  }}
                  onClick={handleSendClick}
                >
                  {
                    typing ? <PauseIcon sx={{ color: '#fff' }}/> : <ArrowUpwardIcon sx={{ color: '#fff' }} />
                  }
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
