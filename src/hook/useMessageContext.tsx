import { useContext } from "react";
import { MessageContextType } from "../types";
import { MessageContext } from "../contexts/MessageContext";

const useMessageContext = (): MessageContextType => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessageContext must be used within a MessageProvider');
  }
  return context;
};

export default useMessageContext