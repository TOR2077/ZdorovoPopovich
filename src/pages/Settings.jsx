import React, { useState, useEffect } from 'react';
import BottomNav from '../components/BottomNav';

const THEMES = [
  { key: 'light', label: 'Светлая' },
  { key: 'dark', label: 'Тёмная' },
];

export default function Settings() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
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
              style={{
                padding: '12px 24px',
                borderRadius: 16,
                border: theme === t.key ? '2px solid #6a5acd' : '1.5px solid #e0e0e0',
                background: theme === t.key ? '#f7f3ff' : '#fafafa',
                color: '#23243a',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '1.1rem',
                boxShadow: theme === t.key ? '0 2px 8px #a49ad622' : 'none',
                outline: 'none',
              }}
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