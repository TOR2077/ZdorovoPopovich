import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Page2.css';
import avatar from '../assets/avatar.png';

export default function Page2() {
  const navigate = useNavigate();
  return (
    <div className="page2-container">
      <div className="page2-header">
        <img src={avatar} alt="avatar" className="page2-avatar" />
        <span className="page2-title">твои отчёты</span>
      </div>
      <div className="page2-stats-row">
        <div className="page2-circle green">
          <div className="page2-circle-value">10</div>
          <div className="page2-circle-label">км</div>
        </div>
        <div className="page2-circle blue">
          <div className="page2-circle-value">5</div>
          <div className="page2-circle-label">литр</div>
        </div>
      </div>
      <div className="page2-sleep-block">
        <div className="page2-sleep-label">количество сна</div>
        <div className="page2-sleep-bar-bg">
          <div className="page2-sleep-bar-fill" style={{width: '40%'}}></div>
        </div>
        <div className="page2-sleep-time"><span>3</span> ч <span>15</span> мин</div>
      </div>
      <div className="page2-table-block">
        <div className="page2-table-title">расчёт калорий</div>
        <div className="page2-table-row"><span>завтрак</span><span className="star">★</span><span>(0%)</span></div>
        <div className="page2-table-row"><span>обед</span><span className="star">★</span><span>(0%)</span></div>
        <div className="page2-table-row"><span>ужин</span><span className="star">★</span><span>(0%)</span></div>
        <div className="page2-table-row"><span>перекус</span><span className="star">★</span><span>(0%)</span></div>
      </div>
      <footer className="page2-footer">
        <button className="footer-icon purple" onClick={() => navigate('/page2')}><span role="img" aria-label="notes">📒</span></button>
        <button className="footer-icon purple"><span role="img" aria-label="pet">👾</span></button>
        <button className="footer-icon purple" onClick={() => navigate('/') }><span role="img" aria-label="home">🏠</span></button>
      </footer>
    </div>
  );
}
