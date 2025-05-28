import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import homeIcon from '../assets/Home icon.png';
import page2Icon from '../assets/Page 2 icon.png';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <footer className="home-footer">
      <button 
        className={`footer-icon ${currentPath === '/' ? 'active' : ''}`} 
        onClick={() => { 
          if (currentPath !== '/') {
            navigate('/');
          }
        }}
      >
        <img src={homeIcon} alt="Домой" style={{width: 40, height: 40}} />
      </button>
      <button 
        className={`footer-icon ${currentPath === '/page2' ? 'active' : ''}`} 
        onClick={() => { 
          if (currentPath !== '/page2') {
            navigate('/page2');
          }
        }}
      >
        <img src={page2Icon} alt="Заметки" style={{width: 40, height: 40}} />
      </button>
    </footer>
  );
} 