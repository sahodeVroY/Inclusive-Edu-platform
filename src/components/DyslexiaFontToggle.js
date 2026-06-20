import React, { useState, useEffect } from 'react';

const btnStyle = {
  background: '#61dafb',
  color: '#181c24',
  border: 'none',
  borderRadius: 8,
  padding: '0.7rem 1.3rem',
  fontSize: '1.05rem',
  fontWeight: 600,
  cursor: 'pointer',
  marginLeft: 8,
  transition: 'background 0.2s, color 0.2s',
};

const DyslexiaFontToggle = () => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (enabled) {
      document.body.classList.add('dyslexia-font');
    } else {
      document.body.classList.remove('dyslexia-font');
    }
  }, [enabled]);

  return (
    <button
      className="dyslexia-btn"
      aria-pressed={enabled}
      onClick={() => setEnabled((prev) => !prev)}
      aria-label={enabled ? 'Disable dyslexia-friendly font' : 'Enable dyslexia-friendly font'}
      style={btnStyle}
      onMouseOver={e => e.currentTarget.style.background = '#23283a'}
      onMouseOut={e => e.currentTarget.style.background = '#61dafb'}
    >
      {enabled ? 'Disable Dyslexia Font' : 'Enable Dyslexia Font'}
    </button>
  );
};

export default DyslexiaFontToggle; 