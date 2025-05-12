import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import Home from './pages/Home';
import Page2 from './pages/Page2';
import Registration from './pages/Registration';
import './pageTransition.css';

function AnimatedRoutes({ direction, setDirection }) {
  const location = useLocation();
  const navigate = useNavigate();
  const prevPath = useRef(location.pathname);

  useEffect(() => {
    if (location.pathname === '/page2' && prevPath.current === '/') {
      setDirection('left');
    } else if (location.pathname === '/' && prevPath.current === '/page2') {
      setDirection('right');
    }
    prevPath.current = location.pathname;
  }, [location.pathname, setDirection]);

  return (
    <SwitchTransition mode="out-in">
      <CSSTransition
        key={location.pathname}
        classNames={direction === 'left' ? 'slide-left' : 'slide-right'}
        timeout={400}
      >
        <div style={{ position: 'relative' }}>
          <Routes location={location}>
            <Route path="/" element={<Home navigate={navigate} />} />
            <Route path="/page2" element={<Page2 navigate={navigate} />} />
          </Routes>
        </div>
      </CSSTransition>
    </SwitchTransition>
  );
}

function App() {
  const [showRegistration, setShowRegistration] = useState(false);
  const [direction, setDirection] = useState('left');

  const handleRegister = () => {
    setShowRegistration(false);
  };

  if (showRegistration) {
    return <Registration onRegister={handleRegister} />;
  }

  return (
    <Router>
      <AnimatedRoutes direction={direction} setDirection={setDirection} />
    </Router>
  );
}

export default App;
