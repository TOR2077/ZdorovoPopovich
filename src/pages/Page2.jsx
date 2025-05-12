import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import avatar from '../assets/avatar.png';

export default function Page2() {
  const [showDashboard, setShowDashboard] = useState(false);
  const dashboardRef = useRef(null);
  const navigate = useNavigate();

  // Получаем данные пользователя
  let user = {};
  try {
    user = JSON.parse(localStorage.getItem('userProfile')) || {};
  } catch {}

  // Закрытие дропдауна по клику вне
  useEffect(() => {
    if (!showDashboard) return;
    function handleClickOutside(e) {
      if (dashboardRef.current && !dashboardRef.current.contains(e.target)) {
        setShowDashboard(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showDashboard]);

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="header-left">
          <button className="header-icon avatar-btn" onClick={() => setShowDashboard(v => !v)} title="Профиль">
            <img src={avatar} alt="avatar" style={{width: 28, height: 28, borderRadius: '50%'}} />
          </button>
        </div>
        <span className="greeting">Привет{user.name ? `, ${user.name}` : ''}!</span>
        <div className="header-icons calendar-only"></div>
      </header>

      {showDashboard && (
        <div className="profile-dashboard" ref={dashboardRef}>
          <div className="profile-dashboard-avatar">
            <img src={avatar} alt="avatar" style={{width: 54, height: 54, borderRadius: '50%', margin: '0 auto 8px auto', display: 'block'}} />
          </div>
          <div className="profile-dashboard-menu">
            <div className="profile-dashboard-item profile-dashboard-profile">Профиль</div>
            <div className="profile-dashboard-divider"></div>
            <div className="profile-dashboard-item">Настройки</div>
            <div className="profile-dashboard-item">Конфиденциальность</div>
            <div className="profile-dashboard-divider"></div>
            <div className="profile-dashboard-item logout-item" onClick={() => window.Telegram.WebApp.close()}>Выход</div>
          </div>
        </div>
      )}

      {/* Основной блок отчётов */}
      <div className="main-image-block user-data-block" style={{marginTop: 18}}>
        <div style={{width: '100%'}}>
          <div style={{fontWeight: 'bold', fontSize: '1.15rem', color: '#23243a', marginBottom: 12}}>Твои отчёты</div>
          <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', marginBottom: 18, gap: 18}}>
            <div style={{width: 82, height: 82, borderRadius: '50%', background: '#fff', border: '4px solid #8be04e', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
              <div style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#23243a', marginBottom: 2}}>10</div>
              <div style={{fontSize: '1rem', color: '#888'}}>км</div>
            </div>
            <div style={{width: 82, height: 82, borderRadius: '50%', background: '#fff', border: '4px solid #4ee0e0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
              <div style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#23243a', marginBottom: 2}}>5</div>
              <div style={{fontSize: '1rem', color: '#888'}}>литр</div>
            </div>
          </div>
          <div style={{margin: '18px 0 18px 0', padding: '0 6px'}}>
            <div style={{fontSize: '1rem', color: '#a49ad6', marginBottom: 4}}>количество сна</div>
            <div style={{width: '100%', height: 8, background: '#e5dbe7', borderRadius: 6, marginBottom: 6, position: 'relative'}}>
              <div style={{height: 8, background: '#a49ad6', borderRadius: 6, position: 'absolute', left: 0, top: 0, width: '40%'}}></div>
            </div>
            <div style={{fontSize: '1.3rem', color: '#23243a', fontWeight: 'bold', marginTop: 2}}><span style={{color: '#6a5acd', fontSize: '1.4rem'}}>3</span> ч <span style={{color: '#6a5acd', fontSize: '1.4rem'}}>15</span> мин</div>
          </div>
          <div style={{margin: '18px 0 0 0', padding: '0 6px'}}>
            <div style={{fontSize: '1.05rem', color: '#23243a', marginBottom: 8}}>расчёт калорий</div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '1.05rem', color: '#444', marginBottom: 4}}><span>завтрак</span><span style={{color: '#c6e84e', fontSize: '1.2em', margin: '0 8px'}}>★</span><span>(0%)</span></div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '1.05rem', color: '#444', marginBottom: 4}}><span>обед</span><span style={{color: '#c6e84e', fontSize: '1.2em', margin: '0 8px'}}>★</span><span>(0%)</span></div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '1.05rem', color: '#444', marginBottom: 4}}><span>ужин</span><span style={{color: '#c6e84e', fontSize: '1.2em', margin: '0 8px'}}>★</span><span>(0%)</span></div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '1.05rem', color: '#444', marginBottom: 4}}><span>перекус</span><span style={{color: '#c6e84e', fontSize: '1.2em', margin: '0 8px'}}>★</span><span>(0%)</span></div>
          </div>
        </div>
      </div>

      <footer className="home-footer">
        <button className="footer-icon" onClick={() => navigate('/')}>🏠</button>
        <button className="footer-icon" onClick={() => navigate('/page2')}>📄</button>
      </footer>
    </div>
  );
}
