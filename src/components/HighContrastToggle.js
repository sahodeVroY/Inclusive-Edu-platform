import React, { useState, useEffect } from 'react';
import './HighContrastToggle.css';

const HighContrastToggle = () => {
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [highContrast]);

  return (
    <button
      className="contrast-toggle"
      aria-pressed={highContrast}
      onClick={() => setHighContrast((prev) => !prev)}
      aria-label={highContrast ? 'Disable high contrast mode' : 'Enable high contrast mode'}
    >
      {highContrast ? 'Disable High Contrast' : 'Enable High Contrast'}
    </button>
  );
};

export default HighContrastToggle; 