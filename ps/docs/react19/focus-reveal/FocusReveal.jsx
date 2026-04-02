import { useEffect, useState } from 'react';
import './FocusReveal.css';

export default function FocusReveal() {
  const [isKeyboard, setIsKeyboard] = useState(false);

  useEffect(() => {
    function handleKeydown(event) {
      if (event.key === 'Tab') {
        setIsKeyboard(true);
      }
    }

    function handlePointer() {
      setIsKeyboard(false);
    }

    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('pointerdown', handlePointer);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
      window.removeEventListener('pointerdown', handlePointer);
    };
  }, []);

  const skipClassName = 'focus-reveal__skip' + (isKeyboard ? ' is-visible' : '');

  return (
    <header className="focus-reveal">
      <a className="focus-reveal__logo" href="#content">
        Focus Demo
      </a>
      <a className={skipClassName} href="#content">
        Skip to main content
      </a>
    </header>
  );
}
