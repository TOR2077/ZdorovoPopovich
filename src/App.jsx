import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Page2 from './pages/Page2';
import Registration from './pages/Registration';

function App() {
  const [registered, setRegistered] = useState(!!localStorage.getItem('userProfile'));

  const handleRegister = () => {
    setRegistered(true);
  };

  useEffect(() => {
    // Инициализация Telegram Web App
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.ready();
    }
  }, []);

  if (!registered) {
    return <Registration onRegister={handleRegister} />;
  }

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/page2" element={<Page2 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
