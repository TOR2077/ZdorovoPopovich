import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <span className="greeting">Привет!</span>
        <div className="header-icons">
          <span className="header-icon" />
          <span className="header-icon" />
        </div>
      </header>

      <div className="calendar-block">
        <div className="calendar-day">
          <div className="calendar-weekday">вс</div>
          <div className="calendar-date">21</div>
        </div>
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
        <span className="footer-icon" />
        <span className="footer-icon" />
        <span className="footer-icon" />
      </footer>
    </div>
  );
}

export default Home;
