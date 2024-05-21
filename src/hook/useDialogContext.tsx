import { useContext } from "react";
import { DialogContext } from "../contexts/DiaLogContext";
import { DiaLogContextType } from "../types";

const useDialogContext = (): DiaLogContextType => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialogContext must be used within a DialogProvider');
  }
  return context;
};

export default useDialogContext