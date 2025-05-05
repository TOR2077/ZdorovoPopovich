import React, { useState } from 'react';
import './WeekCalendar.css';

const weekDayNames = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

function getStartOfWeek(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = (day === 0 ? -6 : 1) - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0,0,0,0);
  return d;
}

function getWeekDates(startDate) {
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

export default function WeekCalendar({ value, onChange }) {
  const today = new Date();
  const [weekOffset, setWeekOffset] = useState(0);
  const selectedDate = value || today;

  const startOfWeek = getStartOfWeek(new Date(today.getFullYear(), today.getMonth(), today.getDate() + weekOffset * 7));
  const weekDates = getWeekDates(startOfWeek);

  return (
    <div className="calendar-block calendar-scroll">
      <button className="calendar-nav-btn" onClick={() => setWeekOffset(weekOffset - 1)}>&lt;</button>
      {weekDates.map((date, idx) => (
        <div
          key={idx}
          className={`calendar-day-selectable${isSameDay(selectedDate, date) ? ' selected' : ''}${isSameDay(today, date) ? ' today' : ''}`}
          onClick={() => onChange && onChange(date)}
        >
          <div className="calendar-weekday">{weekDayNames[idx]}</div>
          <div className="calendar-date">{date.getDate()}</div>
        </div>
      ))}
      <button className="calendar-nav-btn" onClick={() => setWeekOffset(weekOffset + 1)}>&gt;</button>
      <div className="calendar-title">календарь<br/>(на неделю)</div>
    </div>
  );
} 