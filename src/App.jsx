import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Page2 from './pages/Page2';
import Registration from './pages/Registration';

function RedirectToRegistration() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/registration', { replace: true });
  }, [navigate]);
  return null;
}

function App() {
  return (
    <Router>
      <RedirectToRegistration />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/page2" element={<Page2 />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
    </Router>
  );
}

export default App;
