import React, { createContext, useCallback, useState, ReactNode } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { DiaLogContextType } from '../types';

export const DialogContext = createContext<DiaLogContextType | undefined>(undefined);

export const DialogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<{ title: string; content: string } | null>(null);

  const openDialog = useCallback((title: string, content: string) => {
    setDialogContent({ title, content });
    setIsOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setIsOpen(false);
    setDialogContent(null);
  }, []);
  

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog }}>
      {children}
      {dialogContent && (
        <Dialog open={isOpen} onClose={closeDialog}>
          <DialogTitle>{dialogContent.title}</DialogTitle>
          <DialogContent>{dialogContent.content}</DialogContent>
          <DialogActions>
            <Button onClick={closeDialog} sx={{ bgcolor: '#5bc983', color: '#fff', '&:hover': { bgcolor: '#55be7b' } }}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </DialogContext.Provider>
  );
};
