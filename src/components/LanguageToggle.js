import React, { useState, useEffect } from 'react';

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'zh', label: '中文' },
  { code: 'ar', label: 'العربية' },
];

const LanguageToggle = () => {
  const [lang, setLang] = useState('en');

  useEffect(() => {
    document.body.setAttribute('data-lang', lang);
  }, [lang]);

  return (
    <select
      value={lang}
      onChange={e => setLang(e.target.value)}
      aria-label="Select language"
      style={{ marginLeft: 8, padding: '0.3rem 0.7rem', borderRadius: 6, border: 'none', background: '#23283a', color: '#61dafb', fontWeight: 600, cursor: 'pointer' }}
    >
      {LANGUAGES.map(l => (
        <option key={l.code} value={l.code}>{l.label}</option>
      ))}
    </select>
  );
};

export default LanguageToggle; 