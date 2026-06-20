import React, { useState, useEffect } from 'react';

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  return (
    <button
      className="contrast-toggle"
      aria-pressed={darkMode}
      onClick={() => setDarkMode((prev) => !prev)}
      aria-label={darkMode ? 'Disable dark mode' : 'Enable dark mode'}
      style={{ marginLeft: 8 }}
    >
      {darkMode ? 'Disable Dark Mode' : 'Enable Dark Mode'}
    </button>
  );
};

export default DarkModeToggle; 