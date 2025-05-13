import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useAnimation } from '../context/AnimationContext';
import WeekCalendar from '../components/WeekCalendar';
import MoodPicker from '../components/MoodPicker';
import StepCounter from '../components/StepCounter';
import MonthCalendar from '../components/MonthCalendar';
import Notes from '../components/Notes';
import './Home.css';
import avatar from '../assets/avatar.png';
import homeIcon from '../assets/Home icon.png';
import page2Icon from '../assets/Page 2 icon.png';
import mainLogo from '../assets/Main logo.png';

const weekDayNames = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

function getStartOfWeek(date) {
  // Получить понедельник текущей недели
  const d = new Date(date);
  const day = d.getDay();
  const diff = (day === 0 ? -6 : 1) - day; // если воскресенье, то -6, иначе 1-day
  d.setDate(d.getDate() + diff);
  d.setHours(0,0,0,0);
  return d;
}

function getWeekDates(startDate) {
  // Получить массив дат недели, начиная с startDate (понедельник)
  const week = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);
    week.push(d);
  }
  return week;
}

function isSameDay(d1, d2) {
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();
}

function Home({ setDirection }) {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const [mood, setMood] = useState(null); // null - не выбрано
  const [steps, setSteps] = useState(0);
  const [showMonthCalendar, setShowMonthCalendar] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [water, setWater] = useState(() => 0);
  const dashboardRef = useRef(null);
  const navigate = useNavigate();
  // const { navigateWithAnimation } = useAnimation();

  // Получаем данные пользовател
  let user = {};
  try {
    user = JSON.parse(sessionStorage.getItem('userProfile')) || {};
  } catch {}

  // Закрытие дропдауна по клику 
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
    function updateWater() {
      const saved = localStorage.getItem('waterAmount');
      setWater(saved !== null ? Number(saved) : 0);
    }
    updateWater();
    window.addEventListener('focus', updateWater);
    document.addEventListener('visibilitychange', updateWater);
    return () => {
      window.removeEventListener('focus', updateWater);
      document.removeEventListener('visibilitychange', updateWater);
    };
  }, []);

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="header-left">
          <button className="header-icon avatar-btn" onClick={() => setShowDashboard(v => !v)} title="Профиль">
            <img src={avatar} alt="avatar" style={{width: 28, height: 28, borderRadius: '50%'}} />
          </button>
          <span className="greeting" style={{marginLeft: 12}}>Привет{user.name ? `, ${user.name}` : ''}!</span>
        </div>
        <div className="header-icons calendar-only">
          <button className="header-icon calendar-btn" onClick={() => setShowMonthCalendar(true)} title="Открыть календарь">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="4"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          </button>
        </div>
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

      {showMonthCalendar && (
        <MonthCalendar onClose={() => setShowMonthCalendar(false)} />
      )}

      <WeekCalendar value={selectedDate} onChange={setSelectedDate} />

      <div className="main-image-block user-data-block">
        <img src={mainLogo} alt="Медведь со звёздами" style={{maxWidth: '100%', maxHeight: 220, display: 'block', margin: '0 auto'}} />
      </div>

      <Notes date={selectedDate} style={{marginTop: 12, marginBottom: 12}} />

      <div className="stats-block" style={{marginTop: '12px'}}>
        <div className="stat-item">
          <StepCounter value={steps} onChange={setSteps} />
          <div className="stat-label">Кол-во<br/>шагов</div>
        </div>
        <div className="stat-item mood-item">
          <MoodPicker value={mood} onChange={setMood} />
          <div className="stat-label">Настроение<br/>(моська)</div>
        </div>
        <div className="stat-item">
          <div className="stat-circle">
            {water}
          </div>
          <div className="stat-label">Кол-во<br/>воды</div>
        </div>
      </div>

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

export default Home;
