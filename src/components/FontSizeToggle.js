import React, { useState } from 'react';

const MIN_SIZE = 14;
const MAX_SIZE = 24;
const DEFAULT_SIZE = 16;

const FontSizeToggle = () => {
  const [fontSize, setFontSize] = useState(DEFAULT_SIZE);

  const setRootFontSize = (size) => {
    document.documentElement.style.setProperty('--platform-font-size', `${size}px`);
  };

  const increase = () => {
    setFontSize(prev => {
      const next = Math.min(prev + 2, MAX_SIZE);
      setRootFontSize(next);
      return next;
    });
  };
  const decrease = () => {
    setFontSize(prev => {
      const next = Math.max(prev - 2, MIN_SIZE);
      setRootFontSize(next);
      return next;
    });
  };
  const reset = () => {
    setFontSize(DEFAULT_SIZE);
    setRootFontSize(DEFAULT_SIZE);
  };

  React.useEffect(() => {
    setRootFontSize(fontSize);
  }, []);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginLeft: 12 }}>
      <button
        onClick={decrease}
        aria-label="Decrease text size"
        style={{ fontSize: '1.1rem', padding: '0.2rem 0.7rem', borderRadius: 6, border: 'none', background: '#23283a', color: '#61dafb', fontWeight: 600, cursor: 'pointer' }}
        disabled={fontSize <= MIN_SIZE}
      >A-</button>
      <button
        onClick={reset}
        aria-label="Reset text size"
        style={{ fontSize: '1.1rem', padding: '0.2rem 0.7rem', borderRadius: 6, border: 'none', background: '#23283a', color: '#61dafb', fontWeight: 600, cursor: 'pointer' }}
        disabled={fontSize === DEFAULT_SIZE}
      >A</button>
      <button
        onClick={increase}
        aria-label="Increase text size"
        style={{ fontSize: '1.1rem', padding: '0.2rem 0.7rem', borderRadius: 6, border: 'none', background: '#23283a', color: '#61dafb', fontWeight: 600, cursor: 'pointer' }}
        disabled={fontSize >= MAX_SIZE}
      >A+</button>
    </div>
  );
};

export default FontSizeToggle; 