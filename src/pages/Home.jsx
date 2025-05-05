import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const weekDays = [
  { short: 'пн', num: 19 },
  { short: 'вт', num: 20 },
  { short: 'ср', num: 21 },
  { short: 'чт', num: 22 },
  { short: 'пт', num: 23 },
  { short: 'сб', num: 24 },
  { short: 'вс', num: 25 },
];

function Home() {
  const [selectedDay, setSelectedDay] = useState(2); // по умолчанию среда
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <header className="home-header">
        <span className="greeting">Привет!</span>
        <div className="header-icons">
          <span className="header-icon" />
          <span className="header-icon" />
        </div>
      </header>

      <div className="calendar-block calendar-scroll">
        {weekDays.map((day, idx) => (
          <div
            key={day.short}
            className={`calendar-day-selectable${selectedDay === idx ? ' selected' : ''}`}
            onClick={() => setSelectedDay(idx)}
          >
            <div className="calendar-weekday">{day.short}</div>
            <div className="calendar-date">{day.num}</div>
          </div>
        ))}
        <div className="calendar-title">календарь<br/>(на неделю)</div>
      </div>

      <div className="main-image-block">
        в этом пространстве<br/>какая-то картинка /<br/>стикер/анимация
      </div>

      <div className="notes-block">
        плашка на<br/>заметки на сегодня
      </div>

      <div className="stats-block">
        <div className="stat-item">
          <div className="stat-circle" />
          <div className="stat-label">кол-во<br/>шагов</div>
        </div>
        <div className="stat-item">
          <div className="stat-circle" />
          <div className="stat-label">настроение<br/>(моська)</div>
        </div>
        <div className="stat-item">
          <div className="stat-circle" />
          <div className="stat-label">кол-во<br/>воды</div>
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
