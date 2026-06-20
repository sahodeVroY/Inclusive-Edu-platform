import React, { useState, useEffect } from 'react';

const filters = [
  { key: '', label: 'None' },
  { key: 'cb-protanopia', label: 'Protanopia' },
  { key: 'cb-deuteranopia', label: 'Deuteranopia' },
  { key: 'cb-tritanopia', label: 'Tritanopia' },
  { key: 'cb-grayscale', label: 'Grayscale' },
];

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

const ColorBlindnessToggle = () => {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    filters.forEach(f => {
      if (f.key) document.body.classList.remove(f.key);
    });
    if (filters[idx].key) document.body.classList.add(filters[idx].key);
  }, [idx]);

  const nextFilter = () => {
    setIdx((prev) => (prev + 1) % filters.length);
  };

  return (
    <button
      className="cb-btn"
      aria-label={`Cycle color blindness filter (current: ${filters[idx].label})`}
      onClick={nextFilter}
      style={btnStyle}
      onMouseOver={e => e.currentTarget.style.background = '#23283a'}
      onMouseOut={e => e.currentTarget.style.background = '#61dafb'}
    >
      Color Blindness: {filters[idx].label}
    </button>
  );
};

export default ColorBlindnessToggle; 