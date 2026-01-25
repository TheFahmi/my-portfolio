import { useState, useEffect } from 'react';

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

export const useKonamiCode = () => {
  const [triggered, setTriggered] = useState(false);
  const [sequence, setSequence] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event;
      
      setSequence((prev) => {
        const newSequence = [...prev, key];
        if (newSequence.length > KONAMI_CODE.length) {
          newSequence.shift();
        }
        
        if (JSON.stringify(newSequence) === JSON.stringify(KONAMI_CODE)) {
          setTriggered(true);
          
          setTimeout(() => {
             setTriggered(false); 
             setSequence([]);
          }, 5000); 
        }
        
        return newSequence;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return triggered;
};
