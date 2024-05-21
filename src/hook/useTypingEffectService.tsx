import { useState, useEffect } from 'react';
import TypingEffectService from '../service/TypingEffectService';

const useTypingEffectService = () => {
  const [typing, setTyping] = useState(TypingEffectService.getTyping());

  useEffect(() => {
    const handleTyping = () => {
      setTyping(TypingEffectService.getTyping());
    };

    const unsubscribe = TypingEffectService.onChange(handleTyping);

    return () => {
      unsubscribe();
    };
  }, []);

  return typing;
};

export default useTypingEffectService
