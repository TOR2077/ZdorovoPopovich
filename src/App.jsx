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
  const [direction, setDirection] = useState('left');

  const handleRegister = () => {
    setShowRegistration(false);
  };

  if (showRegistration) {
    return <Registration onRegister={handleRegister} />;
  }

  // Оборачиваем навигацию, чтобы менять направление анимации
  function withDirection(Component, dir) {
    return (props) => {
      const navigate = useNavigate();
      const customNavigate = (to) => {
        setDirection(dir);
        navigate(to);
      };
      return <Component {...props} navigate={customNavigate} />;
    };
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={withDirection(Home, 'right')({})} />
        <Route path="/page2" element={withDirection(Page2, 'left')({})} />
      </Routes>
      <AnimatedRoutes direction={direction} />
    </Router>
  );
}

export default App;
