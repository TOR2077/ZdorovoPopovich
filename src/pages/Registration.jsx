import React, { useState } from 'react';
import './Registration.css';

const genders = ['Мужской', 'Женский'];

export default function Registration({ onRegister }) {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !gender || !height || !weight) return;
    const userData = { name, gender, height, weight };
    localStorage.setItem('userProfile', JSON.stringify(userData));
    onRegister && onRegister(userData);
  };

  return (
    <div className="reg-bg">
      <form className="reg-form" onSubmit={handleSubmit}>
        <button type="button" className="reg-btn" disabled>РЕГИСТРАЦИЯ</button>
        <div className="reg-fields">
          <label>ИМЯ
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="..." />
          </label>
          <label>ПОЛ
            <select value={gender} onChange={e => setGender(e.target.value)}>
              <option value="">---</option>
              {genders.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </label>
          <label>РОСТ
            <input type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder="..." min="0" />
          </label>
          <label>ВЕС
            <input type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder="..." min="0" />
          </label>
        </div>
        <button className="reg-continue" type="submit">ПРОДОЛЖИТЬ</button>
      </form>
    </div>
  );
} 