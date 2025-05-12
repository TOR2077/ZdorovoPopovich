import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import Home from './pages/Home';
import Page2 from './pages/Page2';
import Registration from './pages/Registration';
import { AnimationProvider, useAnimation } from './context/AnimationContext';
import './pageTransition.css';

function AnimatedRoutes() {
  const location = useLocation();
  const { direction } = useAnimation();

  return (
    <SwitchTransition mode="out-in">
      <CSSTransition
        key={location.pathname}
        classNames={direction}
        timeout={400}
      >
        <div style={{ position: 'relative' }}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/page2" element={<Page2 />} />
            <Route path="/registration" element={<Registration />} />
          </Routes>
        </div>
      </CSSTransition>
    </SwitchTransition>
  );
}

function App() {
  return (
    <Router>
      <AnimationProvider>
        <AnimatedRoutes />
      </AnimationProvider>
    </Router>
  );
}

export default App;
