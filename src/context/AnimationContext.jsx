import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const AnimationContext = createContext();

export function AnimationProvider({ children }) {
  const [direction, setDirection] = useState('slide-left');
  const [prevPath, setPrevPath] = useState('/');
  const location = useLocation();

  useEffect(() => {
    // Определяем направление анимации на основе текущего и предыдущего пути
    if (location.pathname === '/page2' && prevPath === '/') {
      setDirection('slide-left');
    } else if (location.pathname === '/' && prevPath === '/page2') {
      setDirection('slide-right');
    }
    setPrevPath(location.pathname);
  }, [location.pathname, prevPath]);

  const navigateWithAnimation = (navigate, path) => {
    navigate(path);
  };

  return (
    <AnimationContext.Provider value={{ direction, navigateWithAnimation }}>
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimation() {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
} 