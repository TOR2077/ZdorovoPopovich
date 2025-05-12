import React, { createContext, useContext, useState } from 'react';

const AnimationContext = createContext();

export function AnimationProvider({ children }) {
  const [direction, setDirection] = useState('slide-left');

  const navigateWithAnimation = (navigate, path, newDirection) => {
    setDirection(newDirection);
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