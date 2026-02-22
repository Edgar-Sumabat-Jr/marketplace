// src/components/ThemeToggle.jsx
import React, { useEffect, useState } from 'react';

function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    const body = document.body;
    if (darkMode) {
      body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <button className="btn btn-outline-secondary" onClick={() => setDarkMode(!darkMode)}>
      {darkMode ? '☀ Light Mode' : '🌙 Dark Mode'}
    </button>
  );
}

export default ThemeToggle;
