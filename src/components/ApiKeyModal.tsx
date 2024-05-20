import React, { useState } from 'react';
import { Modal, TextField, Button, Typography } from '@mui/material';

interface ApiKeyModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (apiKey: string) => void;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ open, onClose, onSave }) => {
  const [apiKey, setApiKey] = useState<string>('');

  const handleSave = () => {
    onSave(apiKey);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: '#fff', padding: '20px', borderRadius: '8px', minWidth: '300px' }}>
        <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', marginBottom: '20px' }}>OpenRouter API Key</Typography>
        <TextField
          label="Key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          variant="outlined"
          fullWidth
        />
        <Button onClick={handleSave} variant="contained" sx={{ display: 'block', margin: '20px auto 0', bgcolor: '#5bc983', color: '#fff', '&:hover': { bgcolor: '#55be7b' } }}>Save</Button>
      </div>
    </Modal>
  );
};

export default ApiKeyModal;
