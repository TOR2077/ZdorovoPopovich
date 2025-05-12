import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import avatar from '../assets/avatar.png';
import homeIcon from '../assets/Home icon.png';
import page2Icon from '../assets/Page 2 icon.png';
import SleepSlider from '../components/SleepSlider';
import CaloriesCalculator from '../components/CaloriesCalculator';

export default function Page2({ setDirection }) {
  const [showDashboard, setShowDashboard] = useState(false);
  const [water, setWater] = useState(() => {
    const saved = localStorage.getItem('waterAmount');
    return saved !== null ? Number(saved) : 0;
  });
  const [sleepMinutes, setSleepMinutes] = useState(() => {
    const saved = localStorage.getItem('sleepMinutes');
    return saved !== null ? Number(saved) : 195; // 3ч 15м по умолчанию
  });
  const [showSleepModal, setShowSleepModal] = useState(false);
  const dashboardRef = useRef(null);
  const navigate = useNavigate();
  const waterCircleRef = useRef(null);
  let startY = useRef(null);

  // Получаем данные пользователя
  let user = {};
  try {
    user = JSON.parse(localStorage.getItem('userProfile')) || {};
  } catch {}

  // Свайпы для воды
  useEffect(() => {
    const node = waterCircleRef.current;
    if (!node) return;
    const handleTouchStart = (e) => {
      startY.current = e.touches[0].clientY;
    };
    const handleTouchEnd = (e) => {
      if (startY.current === null) return;
      const endY = e.changedTouches[0].clientY;
      const diff = startY.current - endY;
      if (Math.abs(diff) > 30) {
        if (diff > 0) setWater(w => Math.max(0, w - 1)); // свайп вверх - убавить
        else setWater(w => w + 1); // свайп вниз - прибавить
      }
      startY.current = null;
    };
    node.addEventListener('touchstart', handleTouchStart);
    node.addEventListener('touchend', handleTouchEnd);
    return () => {
      node.removeEventListener('touchstart', handleTouchStart);
      node.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

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

  useEffect(() => {
    localStorage.setItem('waterAmount', water);
  }, [water]);

  // Сохраняем sleepMinutes в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('sleepMinutes', sleepMinutes);
  }, [sleepMinutes]);

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="header-left">
          <button className="header-icon avatar-btn" onClick={() => setShowDashboard(v => !v)} title="Профиль">
            <img src={avatar} alt="avatar" style={{width: 28, height: 28, borderRadius: '50%'}} />
          </button>
          <span className="greeting" style={{marginLeft: 12}}>Привет{user.name ? `, ${user.name}` : ''}!</span>
        </div>
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
      <div style={{
        marginTop: 18,
        border: '1.5px solid #e0e0e0',
        borderRadius: 16,
        background: '#fafafa',
        boxShadow: '0 2px 12px rgba(164,154,214,0.08)',
        padding: '18px 12px',
        marginBottom: 18
      }}>
        <div style={{width: '100%'}}>
          <div style={{fontWeight: 'bold', fontSize: '1.15rem', color: '#23243a', marginBottom: 12, textAlign: 'center'}}>Твои отчёты</div>
          <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', marginBottom: 18, gap: 18}}>
            <div style={{width: 82, height: 82, borderRadius: '50%', background: '#fff', border: '4px solid #8be04e', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
              <div style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#23243a', marginBottom: 2}}>10</div>
              <div style={{fontSize: '1rem', color: '#888'}}>км</div>
            </div>
            <div ref={waterCircleRef} style={{width: 82, height: 82, borderRadius: '50%', background: '#fff', border: '4px solid #4ee0e0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', touchAction: 'none', userSelect: 'none', cursor: 'ns-resize'}}>
              <div style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#23243a', marginBottom: 2}}>{water}</div>
              <div style={{fontSize: '1rem', color: '#888'}}>литр</div>
            </div>
          </div>
          <div style={{margin: '18px 0 0 0', padding: '0 6px'}}>
            <div style={{fontSize: '1rem', color: '#a49ad6', marginBottom: 4, textAlign: 'center'}}>Время сна</div>
            <div
              style={{width: '100%', height: 8, background: '#e5dbe7', borderRadius: 6, marginBottom: 6, position: 'relative', cursor: 'pointer'}}
              onClick={() => setShowSleepModal(true)}
            >
              <div style={{height: 8, background: '#a49ad6', borderRadius: 6, position: 'absolute', left: 0, top: 0, width: `${(sleepMinutes/720)*100}%`}}></div>
            </div>
            <div style={{fontSize: '1.3rem', color: '#23243a', fontWeight: 'bold', marginTop: 2, textAlign: 'center'}}>
              <span style={{color: '#6a5acd', fontSize: '1.4rem'}}>{Math.floor(sleepMinutes/60)}</span> ч <span style={{color: '#6a5acd', fontSize: '1.4rem'}}>{(sleepMinutes%60).toString().padStart(2,'0')}</span> мин
            </div>
          </div>
        </div>
      </div>

      <CaloriesCalculator />

      {showSleepModal && (
        <SleepSlider
          initialMinutes={sleepMinutes}
          onSave={val => { setSleepMinutes(val); setShowSleepModal(false); }}
          onClose={() => setShowSleepModal(false)}
        />
      )}

      <footer className="home-footer">
        <button className="footer-icon" onClick={() => { 
          if (window.location.pathname !== '/') {
            navigate('/');
          }
        }}>
          <img src={homeIcon} alt="Домой" style={{width: 40, height: 40}} />
        </button>
        <button className="footer-icon" onClick={() => { 
          if (window.location.pathname !== '/page2') {
            navigate('/page2');
          }
        }}>
          <img src={page2Icon} alt="Заметки" style={{width: 40, height: 40}} />
        </button>
      </footer>
    </div>
  );
}
