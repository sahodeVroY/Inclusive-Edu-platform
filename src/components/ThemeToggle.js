import React, { useState, useEffect } from 'react';

const THEMES = [
  { key: '', label: 'Default' },
  { key: 'high-contrast', label: 'High Contrast' },
  { key: 'dark-mode', label: 'Dark Mode' },
];

const ThemeToggle = () => {
  const [theme, setTheme] = useState('');

  useEffect(() => {
    // Remove all theme classes
    document.body.classList.remove('high-contrast', 'dark-mode');
    if (theme) document.body.classList.add(theme);
  }, [theme]);

  return (
    <select
      value={theme}
      onChange={e => setTheme(e.target.value)}
      aria-label="Select theme"
      style={{ marginLeft: 8, padding: '0.3rem 0.7rem', borderRadius: 6, border: 'none', background: '#23283a', color: '#61dafb', fontWeight: 600, cursor: 'pointer' }}
    >
      {THEMES.map(t => (
        <option key={t.key} value={t.key}>{t.label}</option>
      ))}
    </select>
  );
};

export default ThemeToggle; 