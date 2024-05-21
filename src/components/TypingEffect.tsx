import React, { useState, useEffect, useRef } from 'react';
import TypingEffectService from '../service/TypingEffectService';
import useTypingEffectService from '../hook/useTypingEffectService';

interface TypingEffectProps {
    text: string
}

const TypingEffect: React.FC<TypingEffectProps> = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  const intervalId = useRef<any>()
  const typing = useTypingEffectService()

  useEffect(() => {
    !typing && intervalId.current && clearInterval(intervalId.current)
  }, [typing])

  useEffect(() => {
    let currentIndex = 0;
    TypingEffectService.setTyping(true)

    intervalId.current = setInterval(() => {
      if (currentIndex >= text.length) {
        clearInterval(intervalId.current);
        TypingEffectService.setTyping(false)
        return;
      }
      const str = text[currentIndex]
      setDisplayText((prevText) => prevText + str);
      currentIndex++;
    }, 30);

    return () => clearInterval(intervalId.current);
  }, [text]);

  return <span>{displayText}</span>;
};

export default TypingEffect;
