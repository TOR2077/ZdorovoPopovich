import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Page2 from './pages/Page2';
import Registration from './pages/Registration';

function App() {
  // Страница регистрации всегда показывается
  return <Registration />;
}

export default App;
