import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WeekCalendar from '../components/WeekCalendar';
import MoodPicker from '../components/MoodPicker';
import StepCounter from '../components/StepCounter';
import MonthCalendar from '../components/MonthCalendar';
import './Home.css';

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

function Home() {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const [mood, setMood] = useState(null); // null - не выбрано
  const [steps, setSteps] = useState(0);
  const [showMonthCalendar, setShowMonthCalendar] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <header className="home-header">
        <span className="greeting">Привет!</span>
        <div className="header-icons calendar-only">
          <button className="header-icon calendar-btn" onClick={() => setShowMonthCalendar(true)} title="Открыть календарь">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="4"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          </button>
        </div>
      </header>

      {showMonthCalendar && (
        <MonthCalendar onClose={() => setShowMonthCalendar(false)} />
      )}

      <WeekCalendar value={selectedDate} onChange={setSelectedDate} />

      <div className="main-image-block">
        в этом пространстве<br/>какая-то картинка /<br/>стикер/анимация
      </div>

      <div className="notes-block">
        плашка на<br/>заметки на сегодня
      </div>

      <div className="stats-block">
        <div className="stat-item">
          <StepCounter value={steps} onChange={setSteps} />
          <div className="stat-label">Кол-во<br/>шагов</div>
        </div>
        <div className="stat-item mood-item">
          <MoodPicker value={mood} onChange={setMood} />
          <div className="stat-label">Настроение<br/>(моська)</div>
        </div>
        <div className="stat-item">
          <div className="stat-circle" />
          <div className="stat-label">Кол-во<br/>воды</div>
        </div>
      </div>

      <footer className="home-footer">
        <button className="footer-icon" onClick={() => navigate('/')}>🏠</button>
        <button className="footer-icon" onClick={() => navigate('/page2')}>📄</button>
      </footer>
    </div>
  );
}

export default Home;
