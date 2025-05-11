import React, { useState } from 'react';
import './MonthCalendar.css';

const monthNames = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year, month) {
  return new Date(year, month, 1).getDay() || 7;
}

function getWeekNumber(date) {
  // Возвращает номер недели в году
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  d.setHours(0,0,0,0);
  d.setDate(d.getDate() + 4 - (d.getDay()||7));
  const yearStart = new Date(d.getFullYear(),0,1);
  return Math.floor(((d - yearStart) / 86400000 + 1)/7);
}

export default function MonthCalendar({ onClose }) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfWeek(viewYear, viewMonth);
  const days = [];
  for (let i = 1; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);

  // Определяем номер недели для сегодняшнего дня и для каждой недели месяца
  const todayIsInView = today.getFullYear() === viewYear && today.getMonth() === viewMonth;
  const todayNum = today.getDate();
  const todayWeek = getWeekNumber(today);

  // Для выделения недели: вычисляем номер недели для каждого дня
  const weekNumbers = days.map((d, i) => {
    if (!d) return null;
    const date = new Date(viewYear, viewMonth, d);
    return getWeekNumber(date);
  });

  return (
    <div className="month-modal-bg" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="month-modal">
        <div className="month-header">
          <button className="month-nav" onClick={() => setViewMonth(m => m === 0 ? 11 : m - 1) || (m === 0 && setViewYear(y => y - 1))}>&lt;</button>
          <span>{monthNames[viewMonth]} {viewYear}</span>
          <button className="month-nav" onClick={() => setViewMonth(m => m === 11 ? 0 : m + 1) || (m === 11 && setViewYear(y => y + 1))}>&gt;</button>
          <button className="month-close" onClick={onClose}>×</button>
        </div>
        <div className="month-weekdays">
          {['Пн','Вт','Ср','Чт','Пт','Сб','Вс'].map(d => <span key={d}>{d}</span>)}
        </div>
        <div className="month-days">
          {days.map((d, i) => {
            if (!d) return <span key={i} className="empty"></span>;
            const date = new Date(viewYear, viewMonth, d);
            const weekNum = weekNumbers[i];
            const isToday = todayIsInView && d === todayNum;
            const isThisWeek = todayIsInView && weekNum === todayWeek;
            return (
              <span
                key={i}
                className={
                  (isToday ? 'today ' : '') +
                  (isThisWeek ? 'this-week' : '')
                }
              >
                {d}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
} 