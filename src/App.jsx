import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import Home from './pages/Home';
import Page2 from './pages/Page2';
import Registration from './pages/Registration';
import './pageTransition.css';

function AnimatedRoutes({ direction, setDirection }) {
  const location = useLocation();
  return (
    <SwitchTransition mode="out-in">
      <CSSTransition
        key={location.pathname}
        classNames={direction}
        timeout={400}
      >
        <div style={{ position: 'relative' }}>
          <Routes location={location}>
            <Route path="/" element={<Home setDirection={setDirection} />} />
            <Route path="/page2" element={<Page2 setDirection={setDirection} />} />
            <Route path="/registration" element={<Registration setDirection={setDirection} />} />
          </Routes>
        </div>
      </CSSTransition>
    </SwitchTransition>
  );
}

function App() {
  const [direction, setDirection] = useState('slide-left');

  return (
    <Router>
      <AnimatedRoutes direction={direction} setDirection={setDirection} />
    </Router>
  );
}

export default App;
