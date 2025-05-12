import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import Home from './pages/Home';
import Page2 from './pages/Page2';
import Registration from './pages/Registration';
import './pageTransition.css';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <SwitchTransition mode="out-in">
      <CSSTransition
        key={location.pathname}
        classNames={location.pathname === '/page2' ? 'slide-left' : 'slide-right'}
        timeout={400}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/page2" element={<Page2 />} />
        </Routes>
      </CSSTransition>
    </SwitchTransition>
  );
}

function App() {
  const [showRegistration, setShowRegistration] = useState(false);

  const handleRegister = () => {
    setShowRegistration(false);
  };

  if (showRegistration) {
    return <Registration onRegister={handleRegister} />;
  }

  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
