import React, { useState, useEffect } from 'react';
import BottomNav from '../components/BottomNav';
import './Settings.css';

const THEMES = [
  { key: 'light', label: 'Светлая' },
  { key: 'dark', label: 'Тёмная' },
];

export default function Settings() {
  const [theme, setTheme] = useState(() => sessionStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    sessionStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className="settings-container">
      <h1>Настройки</h1>
      <div style={{margin: '24px 0'}}>
        <div style={{fontWeight: 600, marginBottom: 12}}>Тема приложения:</div>
        <div style={{display: 'flex', gap: 18}}>
          {THEMES.map(t => (
            <button
              key={t.key}
              onClick={() => setTheme(t.key)}
              className={`theme-btn ${theme === t.key ? 'selected' : ''}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
} 