import React, { useState, useEffect } from 'react';
import BottomNav from '../components/BottomNav';
import { translations } from '../translations';
import './Settings.css';

const LANGUAGES = [
  { key: 'ru', label: 'Русский' },
  { key: 'en', label: 'English' },
];

export default function Settings() {
  const [language, setLanguage] = useState(() => sessionStorage.getItem('language') || 'ru');

  useEffect(() => {
    sessionStorage.setItem('language', language);
    // Здесь можно добавить логику для смены языка во всем приложении
  }, [language]);

  const t = translations[language];

  return (
    <div className="settings-container">
      <h1>{t.settings}</h1>
      <div style={{margin: '24px 0'}}>
        <div style={{fontWeight: 600, marginBottom: 12}}>{t.language}</div>
        <div style={{display: 'flex', gap: 18}}>
          {LANGUAGES.map(lang => (
            <button
              key={lang.key}
              onClick={() => setLanguage(lang.key)}
              className={`language-btn ${language === lang.key ? 'selected' : ''}`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
} 