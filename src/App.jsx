import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import Home from './pages/Home';
import Page2 from './pages/Page2';
import Registration from './pages/Registration';
import './pageTransition.css';

function AnimatedRoutes({ direction }) {
  const location = useLocation();
  return (
    <SwitchTransition mode="out-in">
      <CSSTransition
        key={location.pathname}
        classNames={direction === 'left' ? 'slide-left' : 'slide-right'}
        timeout={400}
      >
        <div style={{ position: 'relative' }}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/page2" element={<Page2 />} />
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
      <Routes>
        <Route path="/" element={<Home setDirection={setDirection} />} />
        <Route path="/page2" element={<Page2 setDirection={setDirection} />} />
      </Routes>
      <AnimatedRoutes direction={direction} />
    </Router>
  );
}

export default App;
