import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TelegramWebApp from '@telegram/web-app';

import Home from './pages/Home';
import Page2 from './pages/Page2';

function App() {
  useEffect(() => {
    // Инициализация Telegram Web App
    TelegramWebApp.ready();
  }, []);

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Страница 1</Link></li>
            <li><Link to="/page2">Страница 2</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/page2" element={<Page2 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
